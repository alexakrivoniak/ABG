<?php

// hiding posts 
function post_remove ()      //creating functions post_remove for removing menu item
{ 
   remove_menu_page('edit.php');
}

add_action('admin_menu', 'post_remove');   //adding action for triggering function call

// Prevent Yoast from changing Event Title Tags for Event Views (Month, List, Etc,)
// add_action( 'pre_get_posts', 'tribe_remove_wpseo_title_rewrite', 20 );
function tribe_remove_wpseo_title_rewrite() {
    if ( class_exists( 'Tribe__Events__Main' ) && class_exists( 'Tribe__Events__Pro__Main' ) ) {
        if( tribe_is_month() || tribe_is_upcoming() || tribe_is_past() || tribe_is_day() || tribe_is_map() || tribe_is_photo() || tribe_is_week() ) {
            $wpseo_front = WPSEO_Frontend::get_instance();
            remove_filter( 'wp_title', array( $wpseo_front, 'title' ), 15 );
            remove_filter( 'pre_get_document_title', array( $wpseo_front, 'title' ), 15 );
        }
    } elseif ( class_exists( 'Tribe__Events__Main' ) && !class_exists( 'Tribe__Events__Pro__Main' ) ) {
        if( tribe_is_month() || tribe_is_upcoming() || tribe_is_past() || tribe_is_day() ) {
            $wpseo_front = WPSEO_Frontend::get_instance();
            remove_filter( 'wp_title', array( $wpseo_front, 'title' ), 15 );
            remove_filter( 'pre_get_document_title', array( $wpseo_front, 'title' ), 15 );
        }
    }
};

function tribe_expired_events( $ids ) {
	$args = array(
		'post_type'     => 'tribe_events',
		'nopaging'      => true,
		'fields'        => 'ids',
		'meta_query'    => array(
			array(
				'key'       => '_EventEndDate',
				'value'     => date( 'Y-m-d H:i:s' ),
				'compare'   => '<',
				'type'      => 'DATETIME',
			),
		),
	);
	$expired_events = get_posts( $args );
	$ids = array_merge( $ids, $expired_events );
	$ids = array_map( 'absint', $ids );
	$ids = array_unique( $ids );
	return $ids;
}
add_filter( 'searchwp_exclude', 'tribe_expired_events' );

add_filter( 'searchwp_big_selects', '__return_true' );

add_filter( 'mce_buttons_3', 'remove_bootstrap_buttons', 999 );
function remove_bootstrap_buttons($buttons) {
    return array();
}
add_filter( 'mce_buttons', 'remove_toggle_button', 999 );
function remove_toggle_button($buttons) {
    $remove = array( 'css_components_toolbar_toggle' );
    return array_diff( $buttons, $remove ); 
} 
// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
// Register our callback to the appropriate filter
add_filter('mce_buttons_2', 'my_mce_buttons_2');
// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {  
    // Define the style_formats array
    $style_formats = array(  
        // Each array child is a format with it's own settings
        array(  
            'title' => 'Custom Button',  
            'selector' => 'a',  
            'classes' => 'btn btn--green'            
        )
    );  
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );  
    return $init_array;  
} 
// Attach callback to 'tiny_mce_before_init' 
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');
if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

// function for Tribe Events Pro
// remove Events for in TitleBar
function strip_events_for_from_titles( $title ) {
	return str_replace( 'Events for', '', $title );
}

add_filter( 'tribe_get_events_title', 'strip_events_for_from_titles' );

// hide instances of recurring events
class Events_Admin_List__Remove_Child_Events {
    public function __construct() {
        // Don't kick in unless we're on the edit.php screen
        add_action( 'load-edit.php', array( $this, 'setup' ) );
    }
    public function setup() {
        // Listen out for the main events query
        if ( 'tribe_events' === $GLOBALS[ 'typenow' ] )
            add_action( 'parse_query', array( $this, 'modify' ) );
    }
    function modify( WP_Query $query ) {
        // Run once, only for the main query
        if ( ! $query->is_main_query() ) return;
        remove_action( 'parse_query', array( $this, 'modify') );
        // Only return top level posts as a means of ignoring child posts
        $query->set( 'post_parent', 0 );
    }
}
new Events_Admin_List__Remove_Child_Events;


Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'options_page' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadScripts' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function options_page () {
		if( function_exists('acf_add_options_page') ) {
			acf_add_options_page();	
		}
	}

	function add_to_context( $context ) {
		$context['logo'] = get_field('logo', 'option');

		// Company Info
		$context['company_youtube'] = get_field('company_youtube', 'option');
		$context['company_facebook'] = get_field('company_facebook', 'option');
		$context['company_pinterest'] = get_field('company_pinterest', 'option');
		$context['company_instagram'] = get_field('company_instagram', 'option');
		$context['company_twitter'] = get_field('company_twitter', 'option');
		$context['head_code'] = get_field('head_code', 'option');
		$context['footer_code'] = get_field('footer_code', 'option');
		$context['business_times'] = get_field('business_times', 'option');

		// header
		$context['include_closedopen_in_header'] = get_field('include_closedopen_in_header', 'option');
		$context['header_logo_mobile'] = get_field('header_logo_mobile', 'option');
		$context['include_weather_in_header'] = get_field('include_weather_in_header', 'option');
		$context['gainesville_link'] = get_field('gainesville_link', 'option');
		$context['header_menu_button'] = get_field('header_menu_button', 'option');
		$context['header_menu_button_link'] = get_field('header_menu_button_link', 'option');
		
		// Footer
		$context['footer_logo'] = get_field('footer_logo', 'option');
		$context['footer_logo_mobile'] = get_field('footer_logo_mobile', 'option');
		$context['apga_footer_logo'] = get_field('apga_footer_logo', 'option');
		$context['mailing_list_title'] = get_field('mailing_list_title', 'option');
		$context['atlanta_address'] = get_field('atlanta_address', 'option');
		$context['atlanta_phone'] = get_field('atlanta_phone', 'option');
		$context['gainesville_address'] = get_field('gainesville_address', 'option');
		$context['gainesville_phone'] = get_field('gainesville_phone', 'option');
		$context['footer_copyright'] = get_field('footer_copyright', 'option');

		$context['search_banner_image'] = get_field('search_banner_image', 'option');
		$context['lost_page_banner_image'] = get_field('404_page_banner_image', 'option');
		$context['default_overview_details_banner_image'] = get_field('default_overview_details_banner_image', 'option');
		$context['default_private_eventsrentals_banner_image'] = get_field('default_private_eventsrentals_banner_image', 'option');
		$context['default_events_banner_image'] = get_field('default_events_banner_image', 'option');

		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['main_header'] = new TimberMenu('main-header');
		$context['sub_header'] = new TimberMenu('sub-header');
		$context['inside_nav'] = new TimberMenu('inside-nav');
		$context['main_footer'] = new TimberMenu('main-footer');
		$context['sub_footer'] = new TimberMenu('sub-footer');
		$context['site'] = $this;
		return $context;
	}

	// function myfoo( $text ) {
	// 	$text .= ' bar!';
	// 	return $text;
	// }

	function loadScripts() {

		$vernum = '1.0.3';

		wp_enqueue_script( 'ajax', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', array(), '1.0.0', true );

		//wp_enqueue_script( 'pace', get_template_directory_uri() . '/js/vendor/pace.js', array(), '1.0.0', true );
		 wp_enqueue_script( 'matchHeight', get_template_directory_uri() . '/js/vendor/matchHeight.js', array(), $vernum, true );
		 wp_enqueue_script( 'swiper', get_template_directory_uri() . '/js/vendor/swiper.js', array(), $vernum, true );
		 wp_enqueue_script( 'wufoo', get_template_directory_uri() . '/js/vendor/wufoo.js', array(), $vernum, true );
		 wp_enqueue_script( 'vide', get_template_directory_uri() . '/js/vendor/vide.min.js', array(), $vernum, true );
		 wp_enqueue_script( 'simpleWeather', get_template_directory_uri() . '/js/vendor/simpleWeather.min.js', array(), $vernum, true );

		 wp_enqueue_script( 'vender-tween', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js', array(), $vernum, true );
		wp_enqueue_script( 'vender-scroll-magic', get_template_directory_uri() . '/js/vendor/scrollmagic/ScrollMagic.min.js', array(), $vernum, true );
		wp_enqueue_script( 'vender-gasp', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js', array(), $vernum, true );

		wp_enqueue_script( 'vender-indicators', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js', array(), $vernum, true );

		wp_enqueue_script( 'vender-parallax', get_template_directory_uri() . '/js/vendor/parallax.min.js', array(), $vernum, true );

		wp_enqueue_script( 'maps', '//maps.googleapis.com/maps/api/js?key=', array(), $vernum, true );

		wp_enqueue_script( 'leaves', get_template_directory_uri() . '/js/leaves.js', array(), $vernum, true );
        wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js', array(), $vernum, true );
    } 


	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		//$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

new StarterSite();
