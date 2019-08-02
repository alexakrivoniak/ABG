<?php
/**
 * Default Events Template
 * This file is the basic wrapper template for all the views if 'Default Events Template'
 * is selected in Events -> Settings -> Template -> Events Template.
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/default-template.php
 *
 * @package TribeEventsCalendar
 * @version 4.6.19
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

get_header();
?>
<main id="tribe-events-pg-template" class="tribe-events-pg-template">

	<section class="subpageBanner subpageBanner--events u-bgImage js-header-blur-img" style="background-image:url(<?php $image = get_field('event_calendar_banner_image', 45); echo $image['url']; ?>);" data-section-img="<?php echo $image['url']; ?>"></section>

	<section class="subpageMain subpageMain--events u-bgGreen">
		<div class="container">
			<div class="subpageMain-wrapper u-bgWhite">
				<!-- <a href="{{ post.parent.link }}" class="subpageMain-breadcrumb link link--pink link--arrow">???</a> -->
				<h1 class="u-textGreen"><?php the_field('event_calendar_title', 45); ?></h1>
			</div>
		</div>
	</section>

	<section class="events-titleBar u-bgGreen">
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-sm-3 events-titleBar-link-wrapper events-titleBar-link-wrapper--prev">
					<div class="events-titleBar-link tribe-events-nav-previous">
						<?php tribe_events_the_previous_month_link(); ?>
					</div>
				</div>
				<div class="col-md-4 col-sm-6 u-center">
					<h2 class="u-textWhite"><?php echo tribe_get_events_title() ?></h2>
				</div>
				<div class="col-md-4 col-sm-3 events-titleBar-link-wrapper events-titleBar-link-wrapper--next">
					<div class="events-titleBar-link tribe-events-nav-next">
						<?php tribe_events_the_next_month_link(); ?>
					</div>
				</div>
			</div>
		</div>
	</section>

	<?php tribe_events_before_html(); ?>

	<section class="events-calender u-bgWhite">
		<div class="container">
			<?php tribe_get_view(); ?>
			<?php tribe_events_after_html(); ?>
		</div>
	</section>

</main> <!-- #tribe-events-pg-template -->
<?php
get_footer();
