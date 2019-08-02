<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

header("HTTP/1.1 301 Moved Permanently");
header("Location: ".get_bloginfo('url').'/404-page');
exit();

$context = Timber::get_context();
Timber::render( '404.twig', $context );
