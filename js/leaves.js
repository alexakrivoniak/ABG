$(document).ready(function($) {
	var mobileBreakpoint = 425;
	var tabletBreakpoint = 768;

	if($('.js-leaves-animation').length > 0) {
		homeLeavesSetup();
		setTimeout(function() {
			homeLeavesAnimation();
		}, 1000);
	}

	function homeLeavesSetup() {
		var homeLeavesSection = $('.js-leaves-section');
		var parentSection = $('.js-leaves-animation');
		var pageHeight = $('.page-container').height();

		// theme var
		if($('.homeLeaves').hasClass('homeLeaves--fall')) {
			var theme = 'fall';
		} else if($('.homeLeaves').hasClass('homeLeaves--winter')) {
			var theme = 'winter';
		} else if($('.homeLeaves').hasClass('homeLeaves--orchid')) {
			var theme = 'orchid';
		} else if($('.homeLeaves').hasClass('homeLeaves--blossoms')) {
			var theme = 'blossoms';
		} else {
			var theme = 'summer';
		}

		// start count at 2, after leaves section
		var count = 2;
		$('.js-home-section').each(function() {
			var sectionId = 'section' + count;
			var sectionHeight = $(this).height();
			// add id
			$(this).attr('id', sectionId);
			// clone homeLeaves section
			homeLeavesSection.clone().appendTo(parentSection).attr('data-section', sectionId);
			
			var leafSection = $('.js-leaves-section[data-section="' + sectionId + '"]');

			count = count + 1;
		});

		// add footer section
		$('.homeLeaves-section:first').clone().appendTo(parentSection).attr('data-section', 'footer');
		$('.homeLeaves-section[data-section="footer"]').addClass('homeLeaves-section--footer');
		//$('.js-leaves-section').clone().appendTo(parentSection).attr('data-section', 'footer').addClass('homeLeaves-section--footer');

		// divide height between sections
		// apply window height to parent element
		parentSection.height(pageHeight);
		var sectionHeight = pageHeight/count;
		$('.js-leaves-section').height(sectionHeight);

		$(window).on('resize', function(){
			var sectionHeight = pageHeight/count;
			$('.js-leaves-section').height(sectionHeight);
		}); 

		// add class to top section
		$('.js-leaves-section').first().addClass('homeLeaves-section--first');

		// create leaves
		// find leaf extension
		if(theme == 'summer') {
			var extension = 'leaf';
		} else if(theme == 'winter') {
			var extension = 'light';
		} else if(theme == 'fall') {
			var extension = 'fallLeaf';
		} else if(theme == 'orchid') {
			var extension = 'orchid';
		} else if(theme == 'blossoms') {
			var extension = 'petal';
		}
		$('.js-leaves-section').each(function() {
			var leavesSection = $(this);
			var leafItem = $(this).find('.homeLeaves-item');

			// apply imgs
			var imgSrc = leafItem.attr('data-img-src');
			
			// leftLeaves
			// add source for first element
			var firstLeafImgSrc = 1 + Math.floor(Math.random() * 3);
			var srcString = imgSrc + extension + firstLeafImgSrc + '-left.png';
			leafItem.css('background-image', 'url("' + srcString + '")');

			// number of left leaves to duplicate
			if(theme == 'fall') {
				leafLeftNum = 2 + Math.floor(Math.random() * 3);
			} else if (theme == 'winter') {
				leafLeftNum = 7 + Math.floor(Math.random() * 18);
			} else if (theme == 'orchid') {
				leafLeftNum = 1 + Math.floor(Math.random() * 3);
			} else if (theme == 'blossoms') {
				leafLeftNum = 7 + Math.floor(Math.random() * 18);
			} else {
				if(!leavesSection.hasClass('homeLeaves-section--first')) {
					var leafLeftNum = 1 + Math.floor(Math.random() * 2);
				} else if(leavesSection.attr('data-section') == 'footer') {
					var leafLeftNum = 2;
				} else {
					var leafLeftNum = 2;
				}
			}
			for (i = 0; i < leafLeftNum; i++) {
				var leafImgSrc = 1 + Math.floor(Math.random() * 3);
				var srcString = imgSrc + extension + leafImgSrc + '-left.png';
				leafItem.clone().appendTo(leavesSection).css('background-image', 'url("' + srcString + '")');
			}

			// right leaves
			// number of right leaves to duplicate
			if(theme == 'fall') {
				var leafRightNum = 3 + Math.floor(Math.random() * 4);
			} else if (theme == 'winter') {
				leafRightNum = 5 + Math.floor(Math.random() * 18);
			} else if (theme == 'orchid') {
				leafRightNum = 1 + Math.floor(Math.random() * 3);
			} else if (theme == 'blossoms') {
				leafRightNum = 5 + Math.floor(Math.random() * 18);
			} else {
				if(!leavesSection.hasClass('homeLeaves-section--first')) {
					var leafRightNum = 2 + Math.floor(Math.random() * 3);
				} else if(leavesSection.attr('data-section') == 'footer') {
					var leafRightNum = 2;
				} else {
					var leafRightNum = 3;
				}
			}
			// duplicate right leaves, assign random leaf
			for (i = 0; i < leafRightNum; i++) {
				var leafImgSrc = 1 + Math.floor(Math.random() * 3);
				var srcString = imgSrc + extension + leafImgSrc + '-right.png';
				leafItem.clone().appendTo(leavesSection).removeClass('homeLeaves-item--left').addClass('homeLeaves-item--right').css('background-image', 'url("' + srcString + '")');
			}

			// leaf styles
			var leafItemsLength = $('.js-leaves-section').children().length;
			leavesSection.children().each(function(index, v) {
				var isLeft = true;
				if($(this).hasClass('homeLeaves-item--right')) {
					var isLeft = false;
				}

				// size
				if(theme == 'fall') {
					if($(window).width() > tabletBreakpoint) {
						var leafSize = 300 + Math.floor(Math.random() * 600);
					} else {
						var leafSize = 200 + Math.floor(Math.random() * 500);
						if($(window).width() <= mobileBreakpoint) {
							var leafSize = 150 + Math.floor(Math.random() * 280);
						}
					}
				} else if(theme == 'winter') {
					if($(window).width() > tabletBreakpoint) {
						var leafSize = 50 + Math.floor(Math.random() * 110);
					} else {
						var leafSize = 30 + Math.floor(Math.random() * 100);
						if($(window).width() <= mobileBreakpoint) {
							var leafSize = 10 + Math.floor(Math.random() * 60);
						}
					}
				} else if (theme == 'orchid') {
					if($(window).width() > tabletBreakpoint) {
						var leafSize = 300 + Math.floor(Math.random() * 500);
					} else {
						var leafSize = 280 + Math.floor(Math.random() * 400);
						if($(window).width() <= mobileBreakpoint) {
							var leafSize = 100 + Math.floor(Math.random() * 300);
						}
					}
				} else if (theme == 'blossoms') {
					if($(window).width() > tabletBreakpoint) {
						var leafSize = 50 + Math.floor(Math.random() * 120);
					} else {
						var leafSize = 50 + Math.floor(Math.random() * 100);
						if($(window).width() <= mobileBreakpoint) {
							var leafSize = 20 + Math.floor(Math.random() * 80);
						}
					}
				} else {
					if($(window).width() > tabletBreakpoint) {
						var leafSize = 700 + Math.floor(Math.random() * 600);
					} else {
						var leafSize = 500 + Math.floor(Math.random() * 700);
						if($(window).width() <= mobileBreakpoint) {
							var leafSize = 300 + Math.floor(Math.random() * 400);
						}
					}
				}

				$(this).css('height', leafSize);
				$(this).css('width', leafSize);

				if(theme == 'blossoms') {
					if($(window).width() > tabletBreakpoint) {
						if(leafSize > 130) {
							$(this).addClass('blossoms-blur');
						}
					} else {
						if($(window).width() > mobileBreakpoint) {
							if(leafSize > 100) {
								$(this).addClass('blossoms-blur');
							}
						} else {
							if(leafSize > 80) {
								$(this).addClass('blossoms-blur');
							}
						}
					}
				}

				if(theme != 'fall' && theme != 'winter' && theme != 'orchid' && theme != 'blossoms') {
					if(leafSize > 1000) {
						if(isLeft) {
							$(this).css('left', '-35%');
						} else {
							$(this).css('right', '-35%');
						}
					}
					if(leafSize < 500) {
						if(isLeft) {
							$(this).css('left', '-40%');
						} else {
							$(this).css('right', '-40%');
						}
					}
				}

				// rotate 
				// var leafRotate = -25 + Math.floor(Math.random() * 30);
				// $(this).css('transform', 'rotate(' + leafRotate + 'deg)');

				// space leaves evenly throughout page
				if(theme == 'winter') { 
					// for winter light, adjust left/right alignment
					var lightAlign = 5 + Math.floor(Math.random() * 100) + '%';
					var lightTopAlign = 5 + Math.floor(Math.random() * 100) + '%';
					$(this).css('left', lightAlign );
					$(this).css('top', lightTopAlign );

					// fade in lights
					setTimeout(function(){
						$('.homeLeaves.homeLeaves--winter').fadeIn(500);
					}, 1200);

				} else if (theme == 'blossoms') {
					var petalAlign = 5 + Math.floor(Math.random() * 100) + '%';
					var petalTopAlign = 5 + Math.floor(Math.random() * 100) + '%';
					$(this).css('left', petalAlign );
					$(this).css('top', petalTopAlign );

					// rotate 
					// var petalRotate = -50 + Math.floor(Math.random() * 50);
					// $(this).css('transform', 'rotate(' + petalRotate + 'deg)');

					// animation delay
					var delay = getRandomInt(1, 10) / 10;
					$(this).css("animation-delay", delay + "s");
					var duration = getRandomInt(15, 25) / 10;
					$(this).css("animation-duration", duration + "s");

					// fade in petals
					setTimeout(function(){
						$('.homeLeaves.homeLeaves--blossoms').fadeIn(500);
					}, 1200);
					
				} else {
					if(!leavesSection.hasClass('homeLeaves-section--first') && !leavesSection.hasClass('homeLeaves-section--footer')) {
						var isLeft = true;
						if(!$(this).hasClass('homeLeaves-item--left')) {
							var isLeft = false;
						}

						if(index == 0) {
							if(leafItemsLength != 5) {
								applyLeafPlacement($(this), '0');
							} else {
								applyLeafPlacement($(this), '8%');
							}
						} else if (index == 2) {
							if(leafItemsLength != 5) {
								applyLeafPlacement($(this), '25%');
							} else {
								applyLeafPlacement($(this), '38%');
							}
						} else if (index == 3) {
							if(isLeft) {
								applyLeafPlacement($(this), '68%');
							} else {
								applyLeafPlacement($(this), '15%');
							}
						} else if (index == 4) {
							if(leafItemsLength != 5) {
								applyLeafPlacement($(this), '35%');
							} else {
								applyLeafPlacement($(this), '55%');
							}
						} else if (index == 5) {
							if(leafItemsLength != 5) {
								applyLeafPlacement($(this), '55%');
							} else {
								applyLeafPlacement($(this), '80%');
							}
						} else if (index == 6) {
							applyLeafPlacement($(this), '70%');
						} 
					}
					function applyLeafPlacement(leaf, topValue) {
						leaf.css('top', topValue);
					}
				}

			});
		});
	} // end of homeLeavesSetup


	function homeLeavesAnimation() {
		var controller = new ScrollMagic.Controller();

		// build scenes for each section
		var homeSectionsLength = $('.home .content-wrapper .wrapper > section').length;

		for (i = 1; i < homeSectionsLength; i++) {
			var homeSectionID = 'section' + i;
			var leafSection = '.homeLeaves-section[data-section="' + homeSectionID + '"]';

			// tweens
			var timeline = new TimelineMax();
			//var leafLength = $(leafSection).children().length;

			// no offset for first section
			if($(leafSection).hasClass('homeLeaves-section--first')) {
				var offsetNum = 0;
			} else {
				var offsetNum = -300;
			}

			if($('.homeLeaves').hasClass('homeLeaves--winter')) {
				// timeline.to($(leafSection).find('.homeLeaves-item'), 0.5, {y: 200});

				var leaveSectionScenes = new ScrollMagic.Scene({
					triggerElement: '#' + homeSectionID,
					offset: offsetNum,
					reverse: false
				})
				.setClassToggle(leafSection, "active")
				.setTween(leafSection, 0.1, {className:"index", delay:3})
				.addTo(controller);
			} else if($('.homeLeaves').hasClass('homeLeaves--blossoms')) {
				var leaveSectionScenes = new ScrollMagic.Scene({
					triggerElement: '#' + homeSectionID,
					offset: offsetNum,
					reverse: false
				})
				.setClassToggle(leafSection, "active")
				.setTween(leafSection, 0.1, {className:"index", delay:4})
				.addTo(controller);
			} else {
				var leaveSectionScenes = new ScrollMagic.Scene({
					triggerElement: '#' + homeSectionID,
					offset: offsetNum,
					reverse: false
				})
				.setClassToggle(leafSection, "active")
				.setTween(leafSection, 0.1, {className:"index", delay:3})
				.addTo(controller);
			}
		}

		var footerLeaves = new ScrollMagic.Scene({
					triggerElement: '#footer',
					offset: -400,
					reverse: false
					//reverse: true
				})
				.setClassToggle('.homeLeaves-section[data-section="footer"]', "active")
				.setTween($('.homeLeaves-section[data-section="footer"]'), 0.1, {className:"index", delay:3})
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);

	} // end of homeLeavesAnimation

	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
});