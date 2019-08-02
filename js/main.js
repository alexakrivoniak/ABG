$( document ).ready(function() {
	var mobileBreakpoint = 425;
	var tabletBreakpoint = 768;
	// do not run header on Map
	if(!$('body').hasClass('page-template-map-template')) {
		blur();
	}

	header();
	alertModule();
	footer();

	parallaxElements();

	if($('body').hasClass('page-template-home-template')) {
		home();
		$(window).resize(function(){
			location.reload();
		});
	} else if($('body').hasClass('page-template-map-template')) {
		gardenMap();
	} else if($('body').hasClass('post-type-archive-tribe_events')) { 
		events();
	} else if ($('body').hasClass('page-template-garden-guide-quiz')) {
		gardenGuideQuiz();
	} else if($('body').hasClass('page-template-overview-details') || $('body').hasClass('single')) { 
		overviewDetailsTemplate();
		subpage();
	} else {
		subpage();
	}

	if($('.instaSection').length > 0) {
		instaSection();
	}

	// strip br on tablet 
		stripBR();

	// remove blur on boxes on IE
	if($('.u-blur').length > 0) {
		var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE ");

	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	    {
	        $('.u-blur').each(function() {
	        	$(this).addClass('u-blur--ie');
	        });
	    }
	} 

    return false;

	function header() {
		// fade in on load 
		TweenMax.to("header", 1, {top: 0, opacity: 1, delay: 0.8});

		$('.mainNav-btn').on('click',function(){
			if(!$('.menu').hasClass('menu--open')) {
				$('.mainNav-btn').addClass('mainNav-btn--open');
				$('.menu').addClass('menu--open');
				$('.mainNav').addClass('mainNav--open');
				$('.menu').fadeIn(600);
			} else {
				closeMenu();
			}
		});

		// $(document).mouseup(function (e) {
		// 	if(!$('.menu').is(e.target) && $('.menu').has(e.target).length === 0 && $('.menu').hasClass('menu--open')) {
		//     	closeMenu();
		//     }
		// });

		function closeMenu() {
			$('.menu').removeClass('menu--open');
			$('.menu').fadeOut(600);
			$('.mainNav').removeClass('mainNav--open');
			$('.mainNav-btn').removeClass('mainNav-btn--open');
		}

		$('.nav-main > ul > li > ul').each(function() {
			$(this).addClass('nav-main-child');
		});

		// top level links
		$('.nav-main > ul li.menu-item-has-children > button').on('click', function(event) {
			event.preventDefault();
			if(!$(this).parent().hasClass('active')) {
				$(this).parent().children('ul').slideDown(300);
				$(this).parent().children('ul').addClass('open');
				$(this).parent().siblings().children('ul').removeClass('open');
				$(this).parent().siblings().children('ul').slideUp(300);
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');

			} else {
				$(this).parent().children('ul').slideUp(300);
				$(this).parent().children('ul').removeClass('open');
				$(this).parent().removeClass('active');
			}
		});

		// header search
		$('.mainNav-search').on('click', function() {
			if(!$(this).hasClass('mainNav-search--open')) {
				$(this).addClass('mainNav-search--open');
				$('.mainNav-searchBox').fadeIn(300);
			} else {
				$(this).removeClass('mainNav-search--open');
				$('.mainNav-searchBox').fadeOut(300);
			}
		});

		// on mobile, make menu size of screen width 
		findMobileMenuSize();
		$(window).on('resize', function(){
			findMobileMenuSize();
		}); 
		function findMobileMenuSize() {
			if($(window).width() <= 425) {
				$('.menu').css('width', $(window).width());
			}
		}

		$.simpleWeather({
	    location: 'Atlanta, GA',
	    woeid: '',
	    unit: 'f',
	    success: function(weather) {
	    html = '<span class="utility-weather-icon"><i class="icon-'+weather.code+'"></i></span>';
	    html += '<span class="utility-weather-temp u-textWhite">'+weather.temp+'&deg;'+weather.units.temp+'</span>';
	  
	      $("#weather").html(html);
	    },
	    error: function(error) {
	      $("#weather").html('<p>'+error+'</p>');
	    }
	  });

		var form = $('header .newsletter-form');
		newsletterForm(form.find('.submit'), form.find('input[type=email]'), form);
	}

	function footer() {
		var form = $('footer .newsletter-form');
		newsletterForm(form.find('.submit'), form.find('input[type=email]'), form);
	}

	function newsletterForm(submitBtn, emailInput, form) {
		submitBtn.on('click', function(event) {
			event.preventDefault();
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var email = emailInput.val();
			console.log(email);
			if(!email.match(re)) {
				// show error
				form.find('.error').fadeIn(600);
			} else {
				// go to page
				form.find('.error').fadeOut(600);
				var base = window.location.host;
				window.location.href = "http://" + base + '/email-sign-up/?email=' + email; 
			}
		});
	}

	if($('body').hasClass('page-id-6621')) {
		var siteUrl = window.location.href;
		console.log(siteUrl);
		var arr = siteUrl.split('?');
		if (siteUrl.length > 1 && arr[1] !== '') {
		 	var email = siteUrl.split("?email=")[1];
		 	$("#frame").attr("src", "https://atlantabg.wufoo.com/embed/w15ms76x1fgp75o/def/field1=" + email);
		} else {
			$("#frame").attr("src", "https://atlantabg.wufoo.com/embed/w15ms76x1fgp75o/");
		}
	}

	function blur() {
		// header blurs 
		if($('.js-event-header-blur-img').length > 0) {
			var src = $('.js-event-header-blur-img').attr('data-section-img');
		} else {
			var src = $('.js-header-blur-img').attr('data-section-img');
		}
		$('.js-header-blur').each(function(){
			$('.js-header-blur').css('background-image', 'url(' + src + ')');
		});
		// section blurs
		$('.js-section-blur').each(function(){
			var src = $(this).attr('data-section-img');
			var section = $(this);
			section.find('.js-section-blur-item').each(function() {
				if($(this).hasClass('js-section-blur-item--half')) {
					var src2 = section.prev().attr('data-section-img');
					$(this).children().first().css('background-image', 'url(' + src2 + ')');
					$(this).children().last().css('background-image', 'url(' + src + ')');
					//$(this).css('background', 'url(' + src + ') top no-repeat, url(' + src2 + ') bottom no-repeat');
					// background: url(img1.jpg) top no-repeat, url(img3.jpg) bottom no-repeat;
				} else if (section.next().hasClass('whiteTouts')) {
					$(this).css('background-image', 'url(' + src + ')');
					$(this).addClass('js-blur-item--whiteBottom');
				} else {
					$(this).css('background-image', 'url(' + src + ')');
					if(section.next().hasClass('instaSection')) {
						section.addClass('blurBox--noBottom');
						$(this).parent().addClass('noBottom');
					}
				}
			});
		});

		// slider blurs
		$('.js-slider-blur').each(function(){
			var src = $(this).attr('data-img');
			var slider = $(this).parent();
			slider.find('.js-slider-slide-blur').each(function() {
				$(this).css('background-image', 'url(' + src + ')');
			});
		});
	}

	// Pages
	function home() {
		// remove br on h1s on mobile
		if($(window).width() <= 425) {
			//$('.home .content-wrapper h1').find('br').remove();
			$('.home .content-wrapper h2').find('br').remove();
		}

		// homeEvents
		$('.homeEvent').matchHeight();

		if($(window).width() <= 768) {
			var homeEventSwiper = new Swiper ('.homeEvents-boxes-swiper', {
				slidesPerView: 'auto',
				loop: true,
				//spaceBetween: 10,
				//centeredSlides: true,
			    pagination: {
			      el: '.homeEvents-boxes-pagination',
			      clickable: true
			    },
		  });
		} else {
			$('.homeEvent h4').matchHeight();
		}

		homeParallax();
	}

	function homeParallax() {
		TweenMax.to(".homeBanner-content", 0.5, {className:"+=animate", delay: 1});
		TweenMax.to(".homeBanner-content .btn", 0.5, {className:"+=animate", delay: 2.5});

		if($(window).width() <= tabletBreakpoint) {
			mobileHomeParallax();
		} else {
			desktopHomeParallax(); 
		}

		function desktopHomeParallax() {
			// init controller
			var controller = new ScrollMagic.Controller();

			// home boxes
			$('.home-blurBox').each(function(){
			    var currentBox = this;

			    // build tween
				var tween = TweenMax.to(currentBox, 0.5, {y: -50, className: '+=parallax'});

				// build scene and set duration to window height
				var boxesScene = new ScrollMagic.Scene({triggerElement: currentBox, duration: "100%", offset: -200})
					.setTween(tween)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
			});

			// home events
			var eventTween = TweenMax.to(".homeEvents-boxes", 0.5, {opacity: 1, bottom: 100});
			var eventScene = new ScrollMagic.Scene({triggerElement: ".homeEvents", duration: "50%"})
				.setTween(eventTween)
				//.addIndicators() // add indicators (requires plugin)
				.addTo(controller);

			// home images
			$('.homeImage-content').each(function(){
			    var currentHomeImg = this;

			    // build tween
				var homeImagetween = TweenMax.to(currentHomeImg, 0.3, {opacity: 1});

				// build scene and set duration to window height
				var homeImageScene = new ScrollMagic.Scene({triggerElement: currentHomeImg, duration: "20%", offset: -280})
					.setTween(homeImagetween)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
			});

			// insta
			var instaTween = TweenMax.to(".instaSection-blurBox", 0.5, {top: '20%', opacity: 1});
			var instaScene = new ScrollMagic.Scene({triggerElement: ".instaSection", duration: "50%"})
				.setTween(instaTween)
				//.addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		}

		function mobileHomeParallax() {
			// init controller
			var controller = new ScrollMagic.Controller(); 

			if($(window).width() <= mobileBreakpoint) {
				TweenMax.to(".homeEvents-boxes", 0.5, {opacity: 1, bottom: 0});
			} else {
				TweenMax.to(".homeEvents-boxes", 0.5, {opacity: 1, bottom: 80});
			}
			
			// home boxes
			$('.home-blurBox').each(function(){
			    var currentBox = this;

			    // build tween
				var tween = TweenMax.to(currentBox, 0.5, {y: -30, className: '+=parallax'});

				// build scene and set duration to window height
				var boxesScene = new ScrollMagic.Scene({triggerElement: currentBox, duration: "100%", offset: -200})
					.setTween(tween)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
			});

			// home images
			$('.homeImage-content').each(function(){
			    var currentHomeImg = this;

			    // build tween
				var homeImagetween = TweenMax.to(currentHomeImg, 0.3, {opacity: 1});

				// build scene and set duration to window height
				var homeImageScene = new ScrollMagic.Scene({triggerElement: currentHomeImg, duration: "20%", offset: -280})
					.setTween(homeImagetween)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
			});

			// insta
			var instaTween = TweenMax.to(".instaSection-blurBox", 0.5, {top: '20%', opacity: 1});
			var instaScene = new ScrollMagic.Scene({triggerElement: ".instaSection", duration: "50%"})
				.setTween(instaTween)
				//.addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		}
	}

	function subpage() {

		if($('.eventCard').length > 0) {
			// event cards height
			$('.eventCard').matchHeight();

			// event card swiper for moblet/tablet
			if($(window).width() <= 768) {
				var homeEventSwiper = new Swiper ('.indexContent-events-swiper', {
					slidesPerView: 'auto',
				    pagination: {
				      el: '.indexContent-events-pagination',
				      clickable: true
				    },
			  });
			}
		}

		// init imagesliders
		if($('.imageSlider-swiper').length > 0) {
			$('.imageSlider-swiper').each(function (index, element) {
			    var imageSlider = new Swiper($(this)[0],{
			        pagination: {
				      el: $(this).find(".imageSlider-pagination")[0],
				      clickable: true
				    },
				    loop: true,
				    navigation: {
				      nextEl: $(this).find(".imageSlider-next")[0],
				      prevEl: $(this).find(".imageSlider-prev")[0],
				    },
				    effect: 'fade'
			    });
			});
			if($(window).width() <= 768) {
				$('.imageSlider-caption').matchHeight();
			}
		}

		// if greenblocks and imageslider follow each other, float boxes
		if($('.greenBlocks').length > 0) {
			$('.greenBlocks').each(function() {
				if($(this).next().hasClass('imageSlider')) {
					$(this).addClass('greenBlocks--float');
					$(this).next().addClass('imageSlider--withGreenBlocks');
				}
			});

			$('.greenBlocks').each(function() {
				if($(this).next().length == 0) {
					$(this).addClass('greenBlocks--end');
				}
			});

			$('.greenBlock').matchHeight();
		}

		// accordion
		if($('.accordion').length > 0) {
			$('.js-accordion-header').on('click',function() {
				if(!$(this).parent().hasClass('open')) {
					$(this).parent().addClass('open');
					$(this).parent().siblings().removeClass('open');
					$(this).parent().siblings().children('.js-accordion-content').slideUp(600);
					$(this).parent().children('.js-accordion-content').slideDown(600);
				} else {
					$(this).parent().removeClass('open');
					$(this).parent().children('.js-accordion-content').slideUp(600);
				}
			});
		}

		// whiteblocks 
		if($('.whiteBlock-content').length > 0){
			$('.whiteBlock-content-wrapper').matchHeight();
		}
	}

	// map
	function gardenMap() {
		var long = parseFloat($('.js-garden-map').attr('data-long'));
		var lat = parseFloat($('.js-garden-map').attr('data-lat'));

		var mobilelong = parseFloat($('.js-garden-map').attr('data-mobile-long'));
		var mobilelat = parseFloat($('.js-garden-map').attr('data-mobile-lat'));
		if($(window).width() <= 768) {
			var mainLatLng = {lat: mobilelat, lng: mobilelong};
		} else {
			var mainLatLng = {lat: lat, lng: long};
		}

		var mapStyles = [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5"
 } ] }, { "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke",
 "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType":
 "administrative.neighborhood", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.man_made", "stylers": [ { "color": "#e4f2e6" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType":
 "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.business",
 "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType":
 "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility":
 "off" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway",
 "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "stylers": [ { "color": "#a0c1b3" }, { "visibility": "simplified" }, { "weight": 1 } ] }, { "featureType": "road.local", "elementType": "labels.text.fill",
 "stylers": [ { "color": "#9e9e9e" }, { "visibility": "off" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station",
 "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "stylers": [ { "color": "#9edffa" }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType":
 "water", "elementType": "geometry.fill", "stylers": [ { "color": "#9edffa" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ];

		// markers
		 var markerLocations = [];
		 var gmarkers = [];

    	$('.gardenMap-marker').each(function() {
    		// marker
    		var markerName = $(this).attr('data-marker-name');
    		markerName = markerName.replace(/(<([^>]+)>)/ig,"");
    		var markerLat = $(this).attr('data-marker-lat');
    		var markerLong = $(this).attr('data-marker-long');
    		var markerType = $(this).attr('data-type-garden');

    		var markerInfo = [markerName, markerLat, markerLong, markerType];
    		markerLocations.push(markerInfo);
    	});
    	
    	// set zoom for mobile
    	if($(window).width() <= 425) {
    		var mapZoom = 17;
    	} else {
    		var mapZoom = 18.2;
    	}

        var map = new google.maps.Map(document.getElementById('js-garden-map'), {
           mapTypeControlOptions: {
				mapTypeIds: ['mapStyles']
		  },
          zoom: mapZoom,
          center: mainLatLng,
          disableDefaultUI: true,
          mapTypeId: 'mapStyles',
          gestureHandling: 'greedy',
          scrollwheel: false,
          zoomControl: true,
          draggable: true,
        });

        map.mapTypes.set('mapStyles', new google.maps.StyledMapType(mapStyles, { name: 'Map Styles' }));

       	var markerIcon = $('.gardenMap-markers').attr('data-icon');

       	var markerSize = new google.maps.Size(35, 35);

       	//var infowindow = new google.maps.InfoWindow();

        for (i = 0; i < markerLocations.length; i++) {
       		var markerData = markerLocations[i][0];
       		markerData = markerData.replace(/\s+/g, '-').toLowerCase();

       		var icon = {
			    url: markerIcon, // url
			    scaledSize: markerSize,
			    //labelOrigin: new google.maps.Point(28, 55),
			    //labelClass: 'gardenMap-marker-label'
			};

    		marker = new google.maps.Marker({
                position: new google.maps.LatLng(markerLocations[i][1], markerLocations[i][2]),
                map: map,
                customInfo: markerData,
                category: markerLocations[i][3],
                animation: google.maps.Animation.DROP,
                icon: icon,
       //          label: {
			    //   text: markerLocations[i][0],
			    //   color: "#347C67",
			    //   fontWeight: "bold",
			    // }
            });

    	 	google.maps.event.addListener(marker, 'click', function() {
    	 		var markerIconHover = $('.gardenMap-markers').attr('data-icon-hover');
    	 		var customInfo = this.customInfo;

    	 		for (i = 0; i < markerLocations.length; i++) {
    	 			if(gmarkers[i].customInfo == customInfo) {
						gmarkers[i].setIcon({
							url: markerIconHover,
							labelOrigin: new google.maps.Point(28, 55),
			   				 labelClass: 'gardenMap-marker-label',
			   				 scaledSize: markerSize
						});
    	 			} else {
    	 				gmarkers[i].setIcon({
    	 					url:markerIcon,
    	 					labelOrigin: new google.maps.Point(28, 55),
			    			labelClass: 'gardenMap-marker-label',
    	 					scaledSize: markerSize
    	 				});
    	 			}
    	 		}
    	 		openMarkerPanel($(this), this.customInfo);
    	 	});

    	 	gmarkers.push(marker);
    	}

    	function openMarkerPanel(element, markerData) {
    		var markerData = markerData;
    		$('.gardenMap-infoWindow').each(function() {
    			if($(this).attr('data-infowindow') == markerData) {
    				if(!$(this).hasClass('open')) {
    					$('.gardenMap-infoWindow').removeClass('open');
						$(this).addClass('open');
						if($(window).width() <= 768) {
							$('.gardenMap-overlay').fadeIn(600);
							$('.gardenMap').addClass('gardenMap--blur');
						}
    				} else {
    					$(this).removeClass('open');
    					defaultMarkerIcons();
    					$('.gardenMap-overlay').fadeOut(600);
    					if($('.gardenMap').hasClass('gardenMap--blur')) {
    						$('.gardenMap').removeClass('gardenMap--blur');
    					}
    				}
    			}
    		});
    	}

    	$('.gardenMap-infoWindow-btn').on('click', function() {
    		$('.gardenMap-overlay').fadeOut(600);
    		$(this).parent().removeClass('open');
    		// reset all icon URLs
    		defaultMarkerIcons();
    		if($('.gardenMap').hasClass('gardenMap--blur')) {
				$('.gardenMap').removeClass('gardenMap--blur');
			}
    	});
    	$('.gardenMap-overlay').on('click',function() {
    		$('.gardenMap-overlay').fadeOut(600);
    		$('.gardenMap-infoWindow').each(function() {
    			if($(this).hasClass('open')){
    				$(this).removeClass('open');
    				defaultMarkerIcons();
    			}
    		});
    		if($('.gardenMap').hasClass('gardenMap--blur')) {
				$('.gardenMap').removeClass('gardenMap--blur');
			}
    	});

    	// return all markers to default icon
    	function defaultMarkerIcons() {
    		for (i = 0; i < markerLocations.length; i++) {
    			gmarkers[i].setIcon({
 					url:markerIcon,
 					labelOrigin: new google.maps.Point(28, 55),
			   		labelClass: 'gardenMap-marker-label',
			   		scaledSize: markerSize
 				});
    		}
    	}

    	$('.gardenMap-filter input:checkbox').unbind().change(function() {
    		var selectedFilters = [];

    		// hide infowindow
    		$('.gardenMap-infoWindow').each(function() {
    			if($(this).hasClass('open')) {
    				$(this).removeClass('open');
    			}
    		});

    		// check if all is selected
    		if($(this).attr('data-value') == 'all') {
    			// show all markers
    			for (i = 0; i < markerLocations.length; i++) {
    				var marker = gmarkers[i];
    				marker.setVisible(true);
    			}
    			// remove all checked
    			$('.gardenMap-filter input').each(function(){
    				if($(this).attr('data-value') != 'all') {
    					$(this).prop('checked', false);
    				}
    			});
    		} else {
    			// search which ones are selected
    			$('.gardenMap-filter input').each(function(){
					if($(this).is(":checked")) {
						var category = $(this).attr('data-value');
						// if all is selected, remove
						if(category == 'all') {
							$(this).prop('checked', false);
						} else {
							// otherwise, push to array
							selectedFilters.push(category);
						}
					}
				});

				for (i = 0; i < markerLocations.length; i++) {
					var marker = gmarkers[i];
					if($.inArray(marker.category, selectedFilters) > -1){
						marker.setVisible(true);
					} else {
						marker.setVisible(false);
					}
				}
    		}

		}); 
	}

	function events() {
		// if (location.hash === "#gainesville") {
		// 	$('.event-filter-switch #switch').prop('checked', true);
		// 	filterEvents('gainesville');
		// } else {
		// 	filterEvents('atlanta');
		// }
		// $('.event-filter-switch').change(function() {
		// 	if($(this).find('input[type=checkbox]:checked').length > 0) {
		// 		filterEvents('gainesville');
		// 	} else {
		// 		filterEvents('atlanta');
		// 	}
		// });

		function filterEvents(type) {
			if(type == 'gainesville') {
				var filterClass = 'city-gainesville';
				window.location.hash = 'gainesville';
			} else if (type == 'atlanta') {
				var filterClass = 'city-atlanta';
				history.pushState('', document.title, window.location.pathname);
			} else {
				return;
			}
			if($('body').hasClass('events-list')) {
				$('.eventList-card').each(function() {
					if(!$(this).hasClass(filterClass)) {
						$(this).fadeOut(500);
						$(this).addClass('filter-hide');
					} else {
						$(this).fadeIn(500);
						$(this).removeClass('filter-hide');
					}
				});
			} else {
				$('.events-archive .type-tribe_events').each(function() {
					if(!$(this).hasClass(filterClass)) {
						$(this).fadeOut(500);
						$(this).addClass('filter-hide');
					} else {
						$(this).fadeIn(500);
						$(this).removeClass('filter-hide');
					}
				});
			}
		}

		if($('body').hasClass('events-list')) {
			var eventsList = true;
		} else {
			var eventsList = false;
		}
		$('.event-filter--cat input[type=checkbox]').change(function() {
			var selectedCheckboxes = [];

			if($('body').hasClass('events-list')) {
				$('.eventList-card').fadeOut(500);
				$('.eventList-card').removeClass('show-filter');
			} else {
				$('.type-tribe_events').fadeOut(500);
				$('.type-tribe_events').removeClass('show-filter');
			} 

			$('.checkbox-button').each(function() {
				var input = $(this).children('input');
				if(input.is(':checked')) {
					var value = input.attr('id');
					if(value == 'exhibitions') {
						if($('body').hasClass('events-list') || $('body').hasClass('tribe-events-day')) {
							selectedCheckboxes.push('tribe-events-category-outdoor-exhibition');
							selectedCheckboxes.push('tribe-events-category-atlanta-exhibition');
							selectedCheckboxes.push('tribe-events-category-gainesville-exhibition');
						} else {
							selectedCheckboxes.push('tribe_events_cat-atlanta-exhibition');
							selectedCheckboxes.push('tribe_events_cat-gainesville-exhibition');
							selectedCheckboxes.push('tribe_events_cat-outdoor-exhibition');
						}
					} else if(value == 'events') {
						if($('body').hasClass('events-list') || $('body').hasClass('tribe-events-day')) {
							selectedCheckboxes.push('tribe-events-category-atlanta-event');
							selectedCheckboxes.push('tribe-events-category-gainesville-event');
							selectedCheckboxes.push('tribe-events-category-concert');
						} else {
							selectedCheckboxes.push('tribe_events_cat-atlanta-event');
							selectedCheckboxes.push('tribe_events_cat-gainesville-event');
							selectedCheckboxes.push('tribe_events_cat-concert');
						}
					} else if(value == 'adult-classes') {
						if($('body').hasClass('events-list') || $('body').hasClass('tribe-events-day')) {
							selectedCheckboxes.push('tribe-events-category-atlanta-classes-education');
							selectedCheckboxes.push('tribe-events-category-gainesville-classes-education');
						} else {
							selectedCheckboxes.push('tribe_events_cat-atlanta-classes-education');
							selectedCheckboxes.push('tribe_events_cat-gainesville-classes-education');
						}
					} else if (value == 'kids-program') {
						if($('body').hasClass('events-list') || $('body').hasClass('tribe-events-day')) {
							selectedCheckboxes.push('tribe-events-category-for-kids');
							selectedCheckboxes.push('tribe-events-category-atlanta-for-kids');
							selectedCheckboxes.push('tribe-events-category-gainesville-for-kids');
						} else {
							selectedCheckboxes.push('tribe_events_atlanta-for-kids');
							selectedCheckboxes.push('tribe_events_gainesville-for-kids');
							selectedCheckboxes.push('tribe-events-category-kids-programming');
							selectedCheckboxes.push('tribe_events_cat-atlanta-for-kids');
							selectedCheckboxes.push('tribe_events_cat-gainesville-for-kids');
						}
					} else {
						return;
					}
				}
			});

			$('.type-tribe_events').each(function() {
				// element
				if($('body').hasClass('events-list') && $('.tribe-events-loop').not('#tribe-events-day')) {
					var parent = $(this);
					var element = $(this).find('.eventList-card');
				} else {
					var parent = $(this);
					var element = $(this);
				}

				if(selectedCheckboxes.length > 0) {
					var showItem = false;
					for ( var i = 0; i < selectedCheckboxes.length; i++ ) {
						console.log(selectedCheckboxes[i]);
						if ( parent.hasClass( selectedCheckboxes[i] ) ) {
							if(!element.hasClass('show-filter') && !element.hasClass('filter-hide')) {
								element.addClass('show-filter');
								element.fadeIn(500);
								var showItem = true;
							}
						}
					}
				} else {
					if(!element.hasClass('show-filter') && !element.hasClass('filter-hide')) {
						element.addClass('show-filter');
						element.fadeIn(500);
						var showItem = true;
					}
				}
			});
		});
		// 	$('.checkbox-button').each(function() {
		// 		var input = $(this).children('input');
		// 		if(input.is(':checked')) {
		// 			var value = input.attr('id');
		// 			if(value == 'exhibitions') {
		// 				if($('body').hasClass('events-list')) {
		// 					selectedCheckboxes.push('tribe-events-category-outdoor-exhibition');
		// 					selectedCheckboxes.push('tribe-events-category-atlanta-exhibition');
		// 					selectedCheckboxes.push('tribe-events-category-gainesville-exhibition');
		// 				} else {
		// 					selectedCheckboxes.push('tribe_events_cat-atlanta-exhibition');
		// 					selectedCheckboxes.push('tribe_events_cat-gainesville-exhibition');
		// 					selectedCheckboxes.push('tribe_events_cat-outdoor-exhibition');
		// 				}
		// 			} else if(value == 'events') {
		// 				if($('body').hasClass('events-list')) {
		// 					selectedCheckboxes.push('tribe-events-category-atlanta-event');
		// 					selectedCheckboxes.push('tribe-events-category-concert');
		// 				} else {
		// 					selectedCheckboxes.push('tribe_events_cat-atlanta-event');
		// 					selectedCheckboxes.push('tribe_events_cat-concert');
		// 				}
		// 			} else if(value == 'adult-classes') {
		// 				if($('body').hasClass('events-list')) {
		// 					selectedCheckboxes.push('tribe-events-category-classes-education');
		// 				} else {
		// 					selectedCheckboxes.push('tribe_events_cat-classes-education');
		// 				}
		// 			} else if (value == 'kids-programs') {
		// 				if($('body').hasClass('events-list')) {
		// 					selectedCheckboxes.push('tribe-events-category-for-kids');
		// 				} else {
		// 					selectedCheckboxes.push('tribe_events_for-kids');
		// 				}
		// 			} else {
		// 				return;
		// 			}
		// 			//selectedCheckboxes.push(value);
		// 		}

		// 		if($('body').hasClass('events-list')) {
		// 			$('.eventList-card').fadeOut(500);
		// 		} else {
		// 			$('.type-tribe_events').fadeOut(500);
		// 		} 

		// 		$('.type-tribe_events').each(function() {
		// 			var showItem = false;
		// 			for ( var i = 0; i < selectedCheckboxes.length; i++ ) {
		// 				// element
		// 				if($('body').hasClass('events-list')) {
		// 					var parent = $(this);
		// 					var element = $(this).find('.eventList-card');
		// 				} else {
		// 					var parent = $(this);
		// 					var element = $(this);
		// 				}

		// 				if ( parent.hasClass( selectedCheckboxes[i] ) ) {
		// 					if(!element.hasClass('show-filter') && !element.hasClass('filter-hide')) {
		// 						element.addClass('show-filter');
		// 						element.fadeIn(500);
		// 						var showItem = true;
		// 					}
		// 				}
		// 				// } else {
		// 				// 	if(!element.hasClass('filter-hide')) {
		// 				// 		if(showItem == false) {
		// 				// 			element.fadeOut(500);
		// 				// 		}
		// 				// 		//element.fadeOut(500);
		// 				// 	}
		// 				// }
		// 			}
		// 		});

		// 	});
			
		 //});
	}

	function gardenGuideQuiz () {
		var endURLatl;
		var endURLgvl;

		// add class to path 
		$('.gardenQuiz-path-btn').on('click', function () {
			$(this).parent().siblings().children('.gardenQuiz-path-btn').removeClass('selected');
			$(this).addClass('selected');
		});

		// next button click, check for selected path
		$('.gardenQuiz-next').on('click', function() {
			if($('.gardenQuiz-path-btn.selected').length > 0) {
				$('#gardenQuiz-stepOne').fadeOut(500);
				setTimeout(function() {
					$('#gardenQuiz-stepTwo').fadeIn(500);
					if($(window).width() <= tabletBreakpoint) {
						$('html,body').animate({scrollTop:0},500);
					}
				}, 500);
				stepTwo();
			} else {
				$('#gardenQuiz-stepOne .gardenQuiz-error').addClass('open');
			}
		});

		// take chosen path, set as button link
		function stepTwo() {
			var endURLatl = $('.gardenQuiz-path-btn.selected').attr('data-path-link-atl');
			var endURLgvl = $('.gardenQuiz-path-btn.selected').attr('data-path-link-gvl');
			var gardenLocation;

			$('.gardenQuiz-submit').on('click',function() {
				if($('.gardenQuiz-choices--one .radio input[type=radio]').is(':checked')) {
					$(".gardenQuiz-choices--one .radio input[type=radio]").each(function(){
						if($(this).is(':checked')) {
							var gardenLocation = $(this).attr('id');
							$('.gardenQuiz-submit').fadeOut(500);
							setTimeout(function() {
								$('.gardenQuiz-loading').fadeIn(500);
							}, 500);
							submitGardenGuide(gardenLocation);
						}
					});
					function submitGardenGuide(gardenLocation) {
						if (gardenLocation == 'gainesville') {
							submitForm(endURLgvl);
						} else {
							submitForm(endURLatl);
						}
					}
					//submitForm(endURL);
				} else {
					$('#gardenQuiz-stepTwo .gardenQuiz-error').addClass('open');
				}
			});
		}

		// send to endURL
		function submitForm(endURL) {
			var urlString = '?';
			$('.radio input[type=radio]:checked').each(function() {
				var name = $(this).attr('name');
				var value = $(this).attr('id');
				urlString = urlString + '&' + name + '=' + value;
			});

			window.location.href = endURL + urlString;
			// show load animation
		}
	}

	function overviewDetailsTemplate() {
		if($('.indexContent').length > 0) {
			$('.subpageMain').each(function() {
				if($(this).next('.indexContent').length > 0) {
					$(this).addClass('subpageMain--end');
				}
			});
		}
		$('.subpageMain').each(function() {
			if ($(this).next('.whiteBlocks').length > 0) {
				$(this).next('.whiteBlocks').addClass('whiteBlocks--details');
			} else if ($(this).next('.accordion').length > 0) {
				$(this).next('.accordion').addClass('accordion--details')
			} else if ($(this).next('.greenBlocks').length > 0) {
				$(this).addClass('subpageMain--noPadding');
				$('.greenBlocks').addClass('greenBlocks--extraPadding');
			} else if ($(this).next('.imageSlider').length > 0) {
				$(this).addClass('subpageMain--end');
			}
		});

		if($('.subpageMain-columns').length > 0) {
			$('.subpageMain-columns .subpageMain-col').matchHeight();
		}
	}

	// Modules 
	function instaSection () {
		if($(window).width() > 425) {
			$('#sbi_images').removeClass('sbi_carousel sbi_owl-carousel sbi_owl-theme');
		}
	}

	function stripBR() {
		if($('.js-strip-br').length > 0 && $(window).width() <= 768) {
			$('.js-strip-br').find('br').remove();
		}
	}

	function alertModule() {
		if($('.alert').length > 0 && !$('.alert').hasClass('alert--close')) {
			alertHeight();
			$(window).on('resize', function(){
				if(!$('.alert').hasClass('alert--close')) {
					alertHeight();
				}
			}); 

			function alertHeight() {
				if($(window).width() > mobileBreakpoint) {
					var height = $('.alert').outerHeight();
					$('header').css('margin-top', height);
				}
			}

			$('.alert-close').on('click', function() {
				$('.alert').addClass('alert--close');
				$('.alert').slideUp(500);
				$('header').css('margin-top', '0');
				if($('.homeLeaves').length > 0) {
					setTimeout(function() {
						var pageHeight = $('.home .content-wrapper').height();
						$('.homeLeaves').height(pageHeight);
					}, 600);
				}
			});
		}
	}

	function parallaxElements () {
		var controller = new ScrollMagic.Controller();

		// banner img
		if($('.js-parallax-window').length > 0) {
			var bgImage = $('.js-parallax-window').attr('data-section-img');
			$('.js-parallax-window').parallax({imageSrc: bgImage});
		}

		// banner box float 
		if($('.overviewBanner-box').length > 0) {
			var currentBox = $('.overviewBanner-box');
			// build tween
			var tween = TweenMax.to(currentBox, 0.5, {y: -50, className: '+=parallax'});

			// build scene and set duration to window height
			var boxesScene = new ScrollMagic.Scene({triggerElement: currentBox, duration: "100%", offset: -200})
				.setTween(tween)
				//.addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		}

	}
});