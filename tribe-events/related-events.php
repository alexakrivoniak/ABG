<?php
/**
 * Related Events Template
 * The template for displaying related events on the single event page.
 *
 * You can recreate an ENTIRELY new related events view by doing a template override, and placing
 * a related-events.php file in a tribe-events/pro/ directory within your theme directory, which
 * will override the /views/pro/related-events.php.
 *
 * You can use any or all filters included in this file or create your own filters in
 * your functions.php. In order to modify or extend a single filter, please see our
 * readme on templates hooks and filters
 *
 * @package TribeEventsCalendarPro
 * @version 4.4.28
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}


$termID = [];
$terms = get_the_terms($post->ID, 'city');
if(is_array($terms)){
	foreach ($terms as $term) {
		if($term->slug == 'atlanta') {
			$city = 'atlanta';
		} else {
			$city = 'gainesville';
		}
	}
}

// Check for current post category and add tax_query to the query arguments
$cats = wp_get_post_terms( $post->ID, 'tribe_events_cat' ); 
$cats_ids = array();  
foreach( $cats as $wpex_related_cat ) {
	$cats_ids[] = $wpex_related_cat->term_id; 
}
if ( ! empty( $cats_ids ) ) {
	//$args['category__in'] = $cats_ids;
	$posts = tribe_get_events( array(
	    'posts_per_page' => 3,
	    'eventDisplay'      =>  'upcoming',
	    'post__not_in'   => array( $post->ID ),
	    'no_found_rows'  => true,
	    'category__in' => $cats_ids,
	    'tax_query' => array(
	        'relation' => 'AND',
	        array(
	            'taxonomy' => 'city',
	            'field'    => 'slug',
	            'terms'    => $city,
	        )
	    )
	) );
} else {
	$posts = tribe_get_events( array(
	    'posts_per_page' => 3,
	    'eventDisplay'      =>  'upcoming',
	    'post__not_in'   => array( $post->ID ),
	    'no_found_rows'  => true,
	    'tax_query' => array(
	        'relation' => 'AND',
	        array(
	            'taxonomy' => 'city',
	            'field'    => 'slug',
	            'terms'    => $city,
	        )
	    )
	) );
}
//$posts = tribe_get_related_posts($args);

if ( is_array( $posts ) && ! empty( $posts ) ) : ?>

<h2 class="tribe-events-related-events-title"><?php printf( __( 'Related %s', 'tribe-events-calendar-pro' ), tribe_get_event_label_plural() ); ?></h2>

<ul class="tribe-related-events tribe-clearfix">
	<?php foreach ( $posts as $post ) : ?>
	<li>
		<?php $thumb = ( has_post_thumbnail( $post->ID ) ) ? get_the_post_thumbnail_url( $post->ID, 'large' ) : esc_url( trailingslashit( Tribe__Events__Pro__Main::instance()->pluginUrl ) . 'src/resources/images/tribe-related-events-placeholder.png' ); ?>

		<a href="<?php echo esc_url( tribe_get_event_link( $post ) ); ?>" class="url" rel="bookmark" tabindex="-1">
			<div class="whiteBlock-image u-bgImage" style="background-image:url(<?php echo $thumb; ?>"></div>
		</a>

		<div class="tribe-related-event-info">
			<h3 class="tribe-related-events-title"><a href="<?php echo tribe_get_event_link( $post ); ?>" class="tribe-event-url" rel="bookmark"><?php echo get_the_title( $post->ID ); ?></a></h3>
			<?php
				if ( $post->post_type == Tribe__Events__Main::POSTTYPE ) {
					echo tribe_events_event_schedule_details( $post );
				}
			?>
			<br>
			<a href="<?php echo tribe_get_event_link( $post ); ?>" class="btn">
			Learn More
		</a>
		</div>
		
	</li>
	<?php endforeach; ?>
</ul>
<?php
endif;
