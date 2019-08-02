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

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;

if( have_rows('subpage_modules') ):
	while ( have_rows('subpage_modules') ) : the_row();
		// index column events
		if( get_row_layout() == 'two_column_index_content' ):
			if(get_sub_field('column_two_events')) {
				$whichLocation = get_sub_field('which_events');
				$column_args = array(
					'posts_per_page' => 4,
					'eventDisplay'      =>  'upcoming'
				);

				if($whichLocation == 'atlanta') {
					$column_args = array_merge($column_args, array(
					    'tax_query' => array(
					        'relation' => 'AND',
					        array(
					            'taxonomy' => 'city',
					            'field'    => 'slug',
					            'terms'    => 'atlanta',
					        )
					    )
					));
				} else if($whichLocation == 'gainesville') {
					$column_args = array_merge($column_args, array(
					    'tax_query' => array(
					        'relation' => 'AND',
					        array(
					            'taxonomy' => 'city',
					            'field'    => 'slug',
					            'terms'    => 'gainesville',
					        )
					    )
					));
				}

				$whichCategories = get_sub_field('which_event_categories');

				if($whichCategories) {
					$columnTax = array();
					foreach($whichCategories as $term) {
						array_push($columnTax, $term);
					}
					$column_args = array_merge($column_args, array(
					    'tax_query' => array(
					        array(
					            'taxonomy' => 'tribe_events_cat',
					            'field'    => 'id',
					            'terms'    => $columnTax,
					        )
					    )
					));
				}

				$data['events'] = tribe_get_events( $column_args );
			}
		endif; 

		// dynamic posts
		if( get_row_layout() == 'dynamic_posts' ):
			$dynamic_posts = get_sub_field('posts_selection');

			if(get_sub_field('events_taxonomy')) {
				$dynamic_tax = get_sub_field('events_taxonomy');
				$tax_name = 'tribe_events_cat';
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
	$args = array(
	    'numberposts' => -1,
	    'post_type'   => $dynamic_posts,
	    'tax_query' => array(
	        'relation' => 'AND',
	        array(
	            'taxonomy' => $tax_name,
	            'field'    => 'id',
	            'terms'    => $dynamic_tax,
	        )
	    )
	);
	$context['dynamic_posts'] = Timber::get_posts( $args );
}

$context['postType'] = get_post_type( $post->ID );

$context['city'] = $post->terms( 'city' );
// if($context['postType'] == 'plant-profile') {
	
// } else if ($context['postType'] == 'art-collection') {

// }

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
