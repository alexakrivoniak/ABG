<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;

// quiz results
$location = $_GET['location'];
$day = $_GET['day'];
$time = $_GET['time'];

$tax_query = array('relation' => 'AND');
if($location) {
	$tax_query[] =  array(
        'taxonomy' => 'city',
        'field' => 'slug',
        'terms' => $location,
    );
}
if($day) {
	$tax_query[] =  array(
        'taxonomy' => 'event-day',
        'field' => 'slug',
        'terms' => $day,
    );
}
if($time) {
	$tax_query[] =  array(
        'taxonomy' => 'event-time',
        'field' => 'slug',
        'terms' => $time,
    );
}

if( have_rows('subpage_modules') ):
	while ( have_rows('subpage_modules') ) : the_row();
		// index column events
		if( get_row_layout() == 'two_column_index_content' ):
			if(get_sub_field('column_two_events')) {
				if(get_sub_field('which_event_categories')):
					$event_cat_tax_array = array();
					$event_cat_tax = get_sub_field('which_event_categories'); 
					foreach($event_cat_tax as $term) {
						array_push($event_cat_tax_array, $term);
					}
					$tax_query[] =  array(
				        'taxonomy' => 'tribe_events_cat',
				        'field' => 'id',
				        'terms' => $event_cat_tax_array,
				    );
				endif; 
				$data['events'] = tribe_get_events( array( 
					    'posts_per_page' => 4,
					    'eventDisplay' =>  'upcoming',
					    'tax_query' => $tax_query
					) );
			}
		endif; 

		// dynamic posts
		if( get_row_layout() == 'dynamic_posts' ):
			$dynamic_posts = get_sub_field('posts_selection');

			if(get_sub_field('events_taxonomy')) {
				$dynamic_tax = get_sub_field('events_taxonomy');
				$tax_name = 'tribe_events_cat';
				$num = 8;
			}
			if(get_sub_field('posts_taxonomy')) {
				$dynamic_tax = get_sub_field('posts_taxonomy');
				$tax_name = 'category';
			}
			if(get_sub_field('locations_taxonomy')) {
				$dynamic_tax = get_sub_field('locations_taxonomy');
				$tax_name = 'type-of-location';
			}
			if(get_sub_field('art_collections_taxonomy')) {
				$dynamic_tax = get_sub_field('art_collections_taxonomy');
				$tax_name = 'art-category';
			}
			if(get_sub_field('articles_taxonomy')) {
				$dynamic_tax = get_sub_field('articles_taxonomy');
				$tax_name = 'article-category';
			}
			if(get_sub_field('plant_profiles_taxonomy')) {
				$dynamic_tax = get_sub_field('plant_profiles_taxonomy');
				$tax_name = 'plant-category';
			}
			if(get_sub_field('private_eventsrentals_taxonomy')) {
				$dynamic_tax = get_sub_field('private_eventsrentals_taxonomy');
				$tax_name = 'events-rentals-category';
			}
		endif;
	endwhile;
endif;

if($dynamic_posts) {
	$tax_array = array();
	if($dynamic_tax) {
		foreach($dynamic_tax as $term) {
			array_push($tax_array, $term);
		}
	}
	if(!isset($num)) {
		$num = -1;
	}
	$args = array(
	    'numberposts' => $num,
	    'post_type'   => $dynamic_posts,
	    'eventDisplay' =>  'upcoming',
	    'tax_query' => array(
	        'relation' => 'AND',
	        array(
	            'taxonomy' => $tax_name,
	            'field'    => 'id',
	            'terms'    => $dynamic_tax,
	        )
	    )
	);
	$data['dynamic_posts'] = Timber::get_posts( $args );
}

$data['garden_guide'] = true;

Timber::render('overview.twig', $data);