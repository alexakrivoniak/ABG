<?php
/**
 * Single Event Template
 * A single event. This displays the event title, description, meta, and
 * optionally, the Google map for the event.
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/single-event.php
 *
 * @package TribeEventsCalendar
 * @version 4.6.19
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

$events_label_singular = tribe_get_event_label_singular();
$events_label_plural   = tribe_get_event_label_plural();

$event_id = get_the_ID();

$featured_img_url = get_the_post_thumbnail_url($event_id, 'full'); 

?>
</div>

<div id="tribe-events-content" class="tribe-events-single">
	<?php if(get_field('event_banner_image', $event_id)) { ?>
		<section class="subpageBanner subpageBanner--singleEvent u-bgImage js-event-header-blur-img" style="background-image:url(<?php the_field('event_banner_image', $event_id); ?>);" data-section-img="<?php the_field('event_banner_image', $event_id); ?>"></section>
	<?php } else { ?>
		<?php if($featured_img_url) { ?>
			<section class="subpageBanner subpageBanner--singleEvent u-bgImage js-event-header-blur-img" style="background-image:url(<?php echo $featured_img_url; ?>);" data-section-img="<?php echo $featured_img_url; ?>"></section>
		<?php } else { ?>
			<section class="subpageBanner subpageBanner--singleEvent u-bgImage js-event-header-blur-img" style="background-image:url(<?php the_field('default_events_banner_image', 'option'); ?>);" data-section-img="<?php the_field('default_events_banner_image', 'option'); ?>"></section>
		<?php } ?>
	<?php } ?>

	<section class="subpageMain u-bgGreen">
		<div class="container">
			<div class="subpageMain-wrapper u-bgWhite">
				<!-- <a class="subpageMain-breadcrumb link link--pink link--arrow" href="<?php //echo esc_url( tribe_get_events_link() ); ?>"> <?php //printf( esc_html_x( 'Back to %s', '%s Events plural label', 'the-events-calendar' ), $events_label_plural ); ?></a> -->

				<?php 
				$termID = [];
				$terms = get_the_terms($post->ID, 'city');
				if(is_array($terms)){
					foreach ($terms as $term) {
					    if($term->slug == 'atlanta') { ?>
					    	<a class="subpageMain-breadcrumb link link--pink link--arrow" href="/calendar/category/atlanta">Back to Events &amp; Classes</a>
					    <?php } else if ($term->slug == 'gainesville') { ?>
					    	<a class="subpageMain-breadcrumb link link--pink link--arrow" href="/calendar/category/gainesville">Back to Events &amp; Classes</a>
					    <? } else { ?>
					    	<a class="subpageMain-breadcrumb link link--pink link--arrow" href="/calendar">Back to Events &amp; Classes</a>
					    <?php } ?>
					<?php } ?>
				<?php } ?>


				<!-- Notices -->
				<?php tribe_the_notices() ?>

				<div class="tribe-events-schedule tribe-clearfix">
					<?php echo tribe_events_event_schedule_details( $event_id, '<h2>', '</h2>' ); ?>
					<?php if ( tribe_get_cost() ) : ?>
						<span class="tribe-events-cost">
							<?php //echo tribe_get_cost( null, true ) ?>
							<?php $price = tribe_get_cost($event_id, true); 
								if($price == 'Free') {
									echo "Free with Garden Admission";
								} else {
									echo $price;
								}
							?>		
						</span>
					<?php endif; ?>
				</div>

				<?php the_title( '<h1 class="u-textGreen">', '</h1>' ); ?>

				<!-- Event header -->
				<div id="tribe-events-header" <?php tribe_events_the_header_attributes() ?>>
					<!-- Navigation -->
					<nav class="tribe-events-nav-pagination" aria-label="<?php printf( esc_html__( '%s Navigation', 'the-events-calendar' ), $events_label_singular ); ?>">
						<ul class="tribe-events-sub-nav">
							<li class="tribe-events-nav-previous"><?php tribe_the_prev_event_link( '<span>&laquo;</span> %title%' ) ?></li>
							<li class="tribe-events-nav-next"><?php tribe_the_next_event_link( '%title% <span>&raquo;</span>' ) ?></li>
						</ul>
						<!-- .tribe-events-sub-nav -->
					</nav>
				</div>
				<!-- #tribe-events-header -->

				<div class="subpageMain-columns">
					<?php do_action( 'tribe_events_single_event_before_the_meta' ) ?>
					<?php tribe_get_template_part( 'modules/meta' ); ?>
				</div>

				<?php while ( have_posts() ) :  the_post(); ?>
					<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
						<div class="event-single-content">
							<!-- Event featured image, but exclude link -->
							<?php //echo tribe_event_featured_image( $event_id, 'full', false ); ?>

							<!-- Event content -->
							<?php do_action( 'tribe_events_single_event_before_the_content' ) ?>
							<div class="tribe-events-single-event-description tribe-events-content generalContent">
								<?php the_content(); ?>
							</div>
							<!-- .tribe-events-single-event-description -->
							<?php do_action( 'tribe_events_single_event_after_the_content' ) ?>

							<!-- Event meta -->
							<?php // do_action( 'tribe_events_single_event_before_the_meta' ) ?>
							<?php // tribe_get_template_part( 'modules/meta' ); ?>
							<?php // do_action( 'tribe_events_single_event_after_the_meta' ) ?>
						</div>
					</div> <!-- #post-x -->
					<?php if ( get_post_type() == Tribe__Events__Main::POSTTYPE && tribe_get_option( 'showComments', false ) ) comments_template() ?>
				<?php endwhile; ?>

			</div>
		</div>
	</section>

	<?php if(get_field('include_green_blocks')): ?>
		<?php 
		$greenBlockCount = 0;
		while ( have_rows('green_blocks') ) : the_row();
			$greenBlockCount++;

		endwhile; ?>
		<section class="greenBlocks  <?php if($greenBlockCount): ?> greenBlocks--<?php echo $greenBlockCount; ?> <?php endif; ?> u-bgGreen">
			<div class="container">
				<div class="row u-bgGreen">
					<?php while ( have_rows('green_blocks') ) : the_row(); ?>
						<div class="col-md-6 col-sm-6 greenBlock">
							<?php if(get_sub_field('enter_custom_content')): ?>
								<h3 class="u-textWhite">
									<?php if(get_sub_field('green_block_title')): ?>
										<?php the_sub_field('green_block_title'); ?>
									<?php endif; ?>
								</h3>
							<?php else: ?>
								<?php $p = get_sub_field('green_block_page'); ?>
								<h3 class="u-textWhite"><?php echo get_the_title( $p->ID ); ?></h3>
							<?php endif; ?>

							<div class="u-largeP">
								<?php if(get_sub_field('enter_custom_content')): ?>
								 <?php the_sub_field('green_block_description'); ?>
								<?php else: ?> 
									<?php the_field('page_description', $p->ID); ?>
								<?php endif; ?>
							</div>
							
							<?php if(get_sub_field('enter_custom_content')): ?>
								<?php if(get_sub_field('green_block_button_text')): ?>
									<a href="<?php the_sub_field('green_block_button_link'); ?>" class="btn btn--white"><?php the_sub_field('green_block_button_text'); ?></a>
								<?php endif; ?>
							<?php else: ?>
									<?php if(get_sub_field('green_block_button_text')): ?>
										<a href="<?php echo get_permalink( $p->ID ); ?>" class="btn btn--white">
											<?php the_sub_field('green_block_button_text'); ?>
										</a>
									<?php else: ?>
										<a href="<?php echo get_permalink( $p->ID ); ?>" class="btn btn--white">
											Explore <?php echo get_the_title( $p->ID ); ?>
										</a>
									<?php endif; ?>
								</a>
							<?php endif; ?>
						</div>
					<?php endwhile; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if(get_field('include_image_slider')): ?>
		<section class="imageSlider">
			<div class="imageSlider-wrapper">
				<div class="imageSlider-swiper">
					<div class="imageSlider-swiper-wrapper swiper-wrapper">
						<?php 
						$imagesliderCount = 0;
						while ( have_rows('image_sliders') ) : the_row();
							$imagesliderCount++;

						endwhile; ?>
						<?php while ( have_rows('image_sliders') ) : the_row(); ?>
							<div class="imadeSlider-slide swiper-slide">
								<?php $image = get_sub_field('image'); ?>
								<div class="imageSlider-img-bg u-bgImage u-absolute100 js-slider-blur" style="background-image:url(<?php echo $image['url']; ?>);" data-img="<?php echo $image['url']; ?>"></div>
								<div class="container imageSlider-container">
									<div class="imageSlider-caption u-blur-parent <?php 
										if(get_sub_field('include_caption_box')):?> <?php else: ?> imageSlider-caption--no-content visible-xs visible-sm <?php endif; ?>">
										<?php if(get_sub_field('include_caption_box')): ?>
											<div class="u-blur-black"></div>
											<div class="u-blur js-slider-slide-blur"></div>
											<div class="imageSlider-caption-content u-blur-content">
												<?php if(get_sub_field('caption_title')): ?>
													<h3 class="u-textWhite"><?php the_sub_field('caption_title'); ?></h3>
												<?php endif; ?>
												<?php if(get_sub_field('caption_description')): ?>
													<p class="u-textWhite u-largeP"><?php the_sub_field('caption_description'); ?></p>
												<?php endif; ?>
												<?php if(get_sub_field('button_text')): ?>
													<a href="<?php the_sub_field('button_link'); ?>" class="btn"><?php the_sub_field('button_text'); ?></a>
												<?php endif; ?>
											</div>
										<?php endif; ?>
									</div>
								</div>
							</div>
						<?php endwhile; ?>

					</div>
					<?php if($imagesliderCount > 1): ?>
						<div class="imageSlider-pagination swiper-pagination swiper-pagination-white <?php 
										if(get_sub_field('should_captions_be_aligned_left')):?>imageSlider-pagination--leftCaption <?php endif; ?>"></div>
						<div class="swiper-button-next swiper-button-white imageSlider-next"></div>
						<div class="swiper-button-prev swiper-button-white imageSlider-prev"></div>
					<?php endif; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if(get_field('include_white_image_blocks')): ?>
		<section class="u-bgWhite whiteBlocks">
			<div class="container">
				<div class="whiteBlocks-wrapper">
						<?php while ( have_rows('white_image_blocks') ) : the_row(); ?>
							<div class="whiteBlock-col whiteBlock-col--2">
								<?php if(get_sub_field('white_block_image')): ?>
									<?php $white_image = get_sub_field('white_block_image'); ?>
									<div class="whiteBlock-image u-bgImage" style="background-image:url(<?php echo $white_image['url']; ?>);"></div>
								<?php endif; ?>
								<div class="whiteBlock-content">
									<?php if(get_sub_field('white_block_title')): ?>
										<h3 class="u-textGreen"><?php the_sub_field('white_block_title'); ?></h3>
									<?php endif; ?>
									<?php if(get_sub_field('white_block_description')): ?>
										<div class="whiteBlock-content-wrapper u-textGreen u-largeP generalContent"><?php the_sub_field('white_block_description'); ?></div>
									<?php endif; ?>
									<?php if(get_sub_field('white_block_button_text')): ?>
										<a href="<?php the_sub_field('white_block_button_text'); ?>" class="btn"><?php the_sub_field('white_block_button_text'); ?></a>
									<?php endif; ?>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				</div>
		</section>

	<?php endif; ?>

	<?php if(get_field('include_accordion')): ?>
		<section class="accordion u-bgWhite">
			<div class="container">
				<div class="accordion-wrapper">
					<?php if(get_field('accordion_section_title')): ?>
						<div class="row">
							<h2 class="u-textGreen"><?php the_field('accordion_section_title'); ?></h2>
						</div>
					<?php endif; ?>
					<div class="row">
						<?php while ( have_rows('accordion') ) : the_row(); ?>
							<div class="accordion-item">
								<div class="accordion-header js-accordion-header">
									<h3 class="u-textGreen"><?php the_sub_field('title'); ?></h3>
								</div>
								<div class="accordion-content js-accordion-content generalContent">
									<?php the_sub_field('content'); ?>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				</div>
			</div>
		</section>
	<?php endif; ?>


	<section class="single-event-featured u-bgWhite whiteBlocks">
		<div class="container">
			<div class="row u-bgWhite">
				<div class="col">
					<?php do_action( 'tribe_events_single_event_after_the_meta' ) ?>
				</div>
			</div>
		</div>
	</section>

		<!-- Event footer -->
		<div id="tribe-events-footer">
			<!-- Navigation -->
			<div class="container">
				<nav class="tribe-events-nav-pagination" aria-label="<?php printf( esc_html__( '%s Navigation', 'the-events-calendar' ), $events_label_singular ); ?>">
					<ul class="tribe-events-sub-nav">
						<li class="tribe-events-nav-previous"><?php tribe_the_prev_event_link( 'Previous Event' ) ?></li>
						<li class="tribe-events-nav-next"><?php tribe_the_next_event_link( 'Next Event' ) ?></li>
						<?php //tribe_the_prev_event_link( '<span>&laquo;</span> %title%' ) ?>
					</ul>
					<!-- .tribe-events-sub-nav -->
				</nav>
			</div>
		</div>
		<!-- #tribe-events-footer -->

</div><!-- #tribe-events-content -->
