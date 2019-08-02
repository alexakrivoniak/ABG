<?php
/**
 * List View Single Event
 * This file contains one event in the list view
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/list/single-event.php
 *
 * @version 4.6.19
 *
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

// Setup an array of venue details for use later in the template
$venue_details = tribe_get_venue_details();

// The address string via tribe_get_venue_details will often be populated even when there's
// no address, so let's get the address string on its own for a couple of checks below.
$venue_address = tribe_get_address();

// Venue
$has_venue_address = ( ! empty( $venue_details['address'] ) ) ? ' location' : '';

// Organizer
$organizer = tribe_get_organizer();

if ( is_null( $event->ID) ) {
    $event_id = get_the_ID();
} else {
	$event_id = $event->ID;
}

$location = wp_get_post_terms( $event_id, 'city');

?>

<div class="eventList-card <?php 
						foreach($location as $l) {
							$str = 'city-' . $l->name;
							$str = strtolower($str);
							echo $str;
						} ?>">
	<div class="eventList-card-wrapper">
		<div class="row">
			<div class="col-md-5 col-sm-5">
				<?php if (has_post_thumbnail( $event->ID ) ): ?>
				<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $event->ID ), 'full' ); ?>
					<div class="eventList-card-img u-bgImage" style="height: 200px; background-image: url('<?php echo $image[0]; ?>')">			 
					</div>
				<?php else: ?>
					<div class="eventList-card-img u-bgImage" style="height: 200px; background-image: url('<?php the_field('event_default_image', 53); ?>')"></div>
				<?php endif; ?>
			</div>
			<div class="col-md-7 col-sm-7">
				<div class="eventList-card-content">
					<!-- Event Title -->
					<?php do_action( 'tribe_events_before_the_event_title' ) ?>
					<h2 class="tribe-events-list-event-title u-textGreen">
						<a class="tribe-event-url u-textGreen" href="<?php echo esc_url( tribe_get_event_link() ); ?>" title="<?php the_title_attribute() ?>" rel="bookmark">
							<?php the_title() ?>
						</a>
					</h2>
					<?php do_action( 'tribe_events_after_the_event_title' ) ?>
					<!-- Event Meta -->
					<?php do_action( 'tribe_events_before_the_meta' ) ?>
					<div class="tribe-events-event-meta">
						<div class="author <?php echo esc_attr( $has_venue_address ); ?>">

							<!-- Schedule & Recurrence Details -->
							<div class="tribe-event-schedule-details">
								<?php echo tribe_events_event_schedule_details() ?>
							</div>

							<?php if ( $venue_details ) : ?>
								<!-- Venue Display Info -->
								<div class="tribe-events-venue-details">
								<?php
									$address_delimiter = empty( $venue_address ) ? ' ' : ', ';

									// These details are already escaped in various ways earlier in the process.
									echo implode( $address_delimiter, $venue_details );

									if ( tribe_show_google_map_link() ) {
										echo tribe_get_map_link_html();
									}
								?>
								</div> <!-- .tribe-events-venue-details -->
							<?php endif; ?>

						</div>
					</div><!-- .tribe-events-event-meta -->

					<p class="eventCard-content-location eventList-card-location u-textGreen u-largeP">
					<?php 
						foreach($location as $l) {
							echo $l->name;
						}
					?>
					</p>

					<?php if (get_field('event_description', $event->ID)): ?>
						<p class="u-textGreen u-largeP"><?php the_field('event_description', $event->ID); ?></p>
					<?php endif; ?>

					<a <?php if(get_field('event_link', $event->ID)): ?>href="<?php the_field('event_link', $event->ID); ?>" target="_blank"<?php else: ?>href="<?php echo esc_url( tribe_get_event_link() ); ?>" <?php endif; ?> class="btn">
						Learn More
					</a>
				</div>
			</div>

		</div>
	</div>
</div>
<?php //do_action( 'tribe_events_after_the_meta' ) ?>

<?php
//do_action( 'tribe_events_after_the_content' );