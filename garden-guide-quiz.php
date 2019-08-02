<?php
/**
 * Template Name: Garden Guide Quiz
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;

$args = array(
	'post_type' => 'guide',
	'posts_per_page' => -1,
	'orderby' => array(
    	'date' => 'ASC'
	),
	'tax_query' => array(
        array(
            'taxonomy' => 'city',
            'field'    => 'slug',
            'terms'    => 'atlanta',
        )
    )
);
$data['atl_guides'] = Timber::get_posts( $args );

$g_args = array(
	'post_type' => 'guide',
	'posts_per_page' => -1,
	'orderby' => array(
    	'date' => 'ASC'
	),
	'tax_query' => array(
        array(
            'taxonomy' => 'city',
            'field'    => 'slug',
            'terms'    => 'gainesville',
        )
    )
);
$data['gvl_guides'] = Timber::get_posts( $g_args );

Timber::render('garden-guide-quiz.twig', $data);