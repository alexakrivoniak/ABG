<?php
/**
 * Template Name: Home
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;

if( have_rows('homepage_sections') ):
    while ( have_rows('homepage_sections') ) : the_row();
        if( get_row_layout() == 'home_events_section' ):
            $data['events'] = get_sub_field('home_event_blocks');
        endif; 
    endwhile;
endif;

if(!isset($data['events'])) {
    $data['events'] = tribe_get_events( array(
        'posts_per_page' => 4,
        'eventDisplay'      =>  'upcoming',
        'tax_query' => array(
             array(
                 'taxonomy' => 'city',
                 'field'    => 'slug',
                 'terms'    => 'atlanta',
             ),
         ),
    ) );
}

// Supply a user id and an access token
$userid = "ba5e64df8cb54c2c9b4ff26c55cd1ca9";
$accessToken = get_field('instagram_access_token', 'option');  

// 253219443.ba5e64d.d12d86ad869c4776a3497f959ede948b

// Gets our data
function fetchData($url){
     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($ch, CURLOPT_TIMEOUT, 20);
     $result = curl_exec($ch);
     curl_close($ch); 
     return $result;
}

// Pulls and parses data.
$result = fetchData("https://api.instagram.com/v1/users/self/media/recent/?access_token={$accessToken}");
//$result = fetchData("https://api.instagram.com/v1/tags/abghome/media/recent?access_token={$accessToken}&response_type=code&scope=public_content");
//$result = fetchData("https://api.instagram.com/v1/tags/abghome/media/recent?client_id={$accessToken}");
$result = json_decode($result);
$instas = array();

if($result){
    if($result->data) {
        foreach ($result->data as $insta) {
        	$instas[] = $insta->images->standard_resolution->url;
        }
    }
}

$data['instas'] = $instas;

Timber::render('home.twig', $data);