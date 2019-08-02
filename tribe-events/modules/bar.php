<?php
/**
 * Events Navigation Bar Module Template
 * Renders our events navigation bar used across our views
 *
 * $filters and $views variables are loaded in and coming from
 * the show funcion in: lib/Bar.php
 *
 * Override this template in your own theme by creating a file at:
 *
 *     [your-theme]/tribe-events/modules/bar.php
 *
 * @package  TribeEventsCalendar
 * @version 4.6.19
 */
?>

<?php

$filters = tribe_events_get_filters();
$views   = tribe_events_get_views();

$current_url = tribe_events_get_current_filter_url();
?>

<?php do_action( 'tribe_events_bar_before_template' ) ?>
	
		<section class="events-filters u-bgWhite">
		<div class="container events-filters-container">
			<div class="event-filter-col">
				<div class="event-filter">
					<form id="tribe-bar-form" class="tribe-clearfix" name="tribe-bar-form" method="post" action="<?php echo esc_attr( $current_url ); ?>">
						<div id="tribe-bar-views">
							<div class="tribe-bar-views-inner tribe-clearfix">
								<h3 class="tribe-events-visuallyhidden"><?php printf( esc_html__( '%s Views Navigation', 'the-events-calendar' ), tribe_get_event_label_singular() ); ?></h3>
								<label><?php esc_html_e( 'View as:', 'the-events-calendar' ); ?></label>
								<select
									class="tribe-bar-views-select tribe-no-param"
									name="tribe-bar-view"
									aria-label="<?php printf( esc_attr__( 'View %s As', 'the-events-calendar' ), tribe_get_event_label_plural() ); ?>"
								>
									<?php foreach ( $views as $view ) : ?>
										<option
											<?php echo tribe_is_view( $view['displaying'] ) ? 'selected' : 'tribe-inactive' ?>
											value="<?php echo esc_attr( $view['url'] ); ?>"
											data-view="<?php echo esc_attr( $view['displaying'] ); ?>"
										>
											<?php echo $view['anchor']; ?>
										</option>
									<?php endforeach; ?>
								</select>
							</div>
							<!-- .tribe-bar-views-inner -->
						</div><!-- .tribe-bar-views -->
					</form>
				</div>
			</div>
			<div class="event-filter-col">
				<div class="event-filter event-filter--cat">
					<!-- <div class="row"> -->
						<div class="event-filter-cat-col">
							<p class="u-textGreen">Sort by:</p>
						</div>
						<div class="event-filter-cat-col">
							<!-- <div class="event-filter-switch-wrapper">
								<p class="event-filter-switch-label event-filter-switch-label--left" data-switch="atlanta">Atlanta</p>
								<div class="event-filter-switch">
									<input type="checkbox" id="switch" /><label for="switch">Toggle</label>
								</div>
								<p class="event-filter-switch-label event-filter-switch-label--right" data-switch="gainesville">Gainesville</p>
							</div> -->
							<div class="checkbox-button">
								<input type="checkbox" id="exhibitions" name="exhibitions">
							    <label for="exhibitions">Exhibitions</label>	    
							    <div class="check"></div>
							</div>
							<div class="checkbox-button">
								<input type="checkbox" id="events" name="events">
							    <label for="events">Events</label>	    
							    <div class="check"></div>
							</div>
							<div class="checkbox-button">
								<input type="checkbox" id="adult-classes" name="adult-classes">
							    <label for="adult-classes">Adult Classes</label>	    
							    <div class="check"></div>
							</div>
							<div class="checkbox-button">
								<input type="checkbox" id="kids-program" name="kids-program">
							    <label for="kids-program">Kids Programs</label>	    
							    <div class="check"></div>
							</div>
						</div>
					<!-- </div> -->
				</div>
			</div>
			<div class="event-filter-col">
				<div class="event-filter">
					<form id="tribe-bar-form" class="tribe-clearfix" name="tribe-bar-form" method="post" action="<?php echo esc_attr( $current_url ); ?>">
					<?php if ( ! empty( $filters ) ) { ?>
						<div class="tribe-bar-filters">
							<div class="tribe-bar-filters-inner tribe-clearfix">
								<label class="visible-xs visible-sm">Search Events:</label>
								<h3 class="tribe-events-visuallyhidden"><?php printf( esc_html__( '%s Search', 'the-events-calendar' ), tribe_get_event_label_plural() ); ?></h3>
								<?php foreach ( $filters as $filter ) : ?>
									<div class="<?php echo esc_attr( $filter['name'] ) ?>-filter">
										<label class="label-<?php echo esc_attr( $filter['name'] ) ?>" for="<?php echo esc_attr( $filter['name'] ) ?>"><?php echo $filter['caption'] ?></label>
										<?php echo $filter['html'] ?>
									</div>
								<?php endforeach; ?>
								<div class="tribe-bar-submit">

									<input
										class="tribe-events-button tribe-no-param"
										type="submit"
										name="submit-bar"
										aria-label="<?php printf( esc_attr__( 'Submit %s search', 'the-events-calendar' ), tribe_get_event_label_plural() ); ?>"
										value="<?php printf( esc_attr__( 'Search', 'the-events-calendar' ), tribe_get_event_label_plural() ); ?>"
									/>
								</div>
								<!-- .tribe-bar-submit -->
							</div>
							<!-- .tribe-bar-filters-inner -->
						</div><!-- .tribe-bar-filters -->
					<?php } // if ( !empty( $filters ) ) ?>
					</form>
				</div>
			</div>
		</div>
	</section>

<?php
do_action( 'tribe_events_bar_after_template' );
