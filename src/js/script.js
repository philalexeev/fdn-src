$( document ).ready(function() {

  $('.navigation__item-shop-list').click(function() {
    $('.drop-down-shop').toggleClass('drop-down-shop--open');
  });

  $('.navigation__item-menu').click(function() {
    $('.aside__nav').toggleClass('aside__nav--open');
  });

  $('.aside__item-wrapper').click(function() {
    $('.aside__item-wrapper').removeClass('aside__item-wrapper--active');

    if ( $(this).find('.aside__submenu').length ) {
			$(this).addClass('aside__item-wrapper--active');
    }

    if ( $('.aside__submenu').is(':visible') && !$(this).find('.aside__submenu').is(':visible') ) {
      $('.aside__submenu').slideUp();
    }
		$(this).find('.aside__submenu').slideDown();
	});

	$('.video-box__reference').click(function() {
		$('.company-video__pop-up').addClass('company-video__pop-up--active');
		$('body').css('overflow', 'hidden');
	});

	$('.close-button').click(function() {
		$('.company-video__pop-up').removeClass('company-video__pop-up--active');
		$('body').css('overflow', 'visible');
	});

  $('.close-btn__wrapper').click(function() {
    $('.aside__nav').removeClass('aside__nav--open');
  });

	$( window ).resize(function() {
		var reviewText = $('.review__content').text();
		if ( window.matchMedia("(max-width: 1240px)").matches && $('.review__content').text().length > 80 ) {
			var truncate = reviewText.slice(0, 81);
			$('.review__content').text( truncate + '...' );
		}
	});

	if ( window.matchMedia("(max-width: 1240px)").matches && $('.review__content').text().length > 80 ) {
		var truncate = $('.review__content').text().slice(0, 81);
		$('.review__content').text( truncate + '...' );
	}

// CONTROLS COUNTER HEADER

	var sloganAllNum = $('.slogan__item').length - $('.slogan__wrapper .slick-cloned').length

	if (sloganAllNum < 10) {
		sloganAllNum = '0' + sloganAllNum;
	}

	$('.controls__page-numbers').text('/ ' + sloganAllNum);

	var sloganCount = 1;

	$('.page-header__controls .controls__next-btn').click(function() {
		if ( sloganCount < sloganAllNum ) {
			sloganCount++;
			if (sloganCount < 10) {
				sloganCount = '0' + sloganCount;
			}
			$('.page-header__controls .controls__current').text(sloganCount + ' ');
		} else {
			sloganCount = 1;
			if (sloganCount < 10) {
				sloganCount = '0' + sloganCount;
			}
			$('.page-header__controls .controls__current').text(sloganCount + ' ');
		}
	});

	$('.page-header__controls .controls__prev-btn').click(function() {
		if ( sloganCount > 1 ) {
			sloganCount--;
			if (sloganCount < 10) {
				sloganCount = '0' + sloganCount;
			}
			$('.page-header__controls .controls__current').text(sloganCount + ' ');
		} else {
			sloganCount = sloganAllNum;
			$('.page-header__controls .controls__current').text(sloganCount + ' ');
		}
	});

// CONTROLS COUNTER FEATURES

	var featuresAllNum = $('.features__slider-item').length / 6;

	if (featuresAllNum < 10) {
		featuresAllNum = '0' + featuresAllNum;
	}

	$('.features__controls .controls__page-numbers').text('/ ' + featuresAllNum);

	var featuresCount = 1;

	$('.features__controls .controls__next-btn').click(function() {
		if ( featuresCount < featuresAllNum ) {
			featuresCount++;
			if (featuresCount < 10) {
				featuresCount = '0' + featuresCount;
			}
			$('.features__controls .controls__current').text(featuresCount + ' ');
		} else {
			featuresCount = 1;
			if (featuresCount < 10) {
				featuresCount = '0' + featuresCount;
			}
			$('.features__controls .controls__current').text(featuresCount + ' ');
		}
	});

	$('.features__controls .controls__prev-btn').click(function() {
		if ( featuresCount > 1 ) {
			featuresCount--;
			if (featuresCount < 10) {
				featuresCount = '0' + featuresCount;
			}
			$('.features__controls .controls__current').text(featuresCount + ' ');
		} else {
			featuresCount = featuresAllNum;
			$('.features__controls .controls__current').text(featuresCount + ' ');
		}
	});


// CONTROLS COUNTER EXAMPLES

	var examplesAllNum = $('.examples__prj-item').length;

	if (examplesAllNum < 10) {
		examplesAllNum = '0' + examplesAllNum;
	}

	$('.examples__controls .controls__page-numbers').text('/ ' + examplesAllNum);

	var examplesCount = 1;

	$('.examples__controls .controls__next-btn').click(function() {
		if ( examplesCount < examplesAllNum ) {
			examplesCount++;
			if (examplesCount < 10) {
				examplesCount = '0' + examplesCount;
			}
			$('.examples__controls .controls__current').text(examplesCount + ' ');
		} else {
			examplesCount = 1;
			if (examplesCount < 10) {
				examplesCount = '0' + examplesCount;
			}
			$('.examples__controls .controls__current').text(examplesCount + ' ');
		}
	});

	$('.examples__controls .controls__prev-btn').click(function() {
		if ( examplesCount > 1 ) {
			examplesCount--;
			if (examplesCount < 10) {
				examplesCount = '0' + examplesCount;
			}
			$('.examples__controls .controls__current').text(examplesCount + ' ');
		} else {
			examplesCount = examplesAllNum;
			$('.examples__controls .controls__current').text(examplesCount + ' ');
		}
	});


// SLICK SLIDER

  $('.examples__prj-photo-wrapper').slick({
    nextArrow: $('.examples__controls .controls__next-btn'),
    prevArrow: $('.examples__controls .controls__prev-btn'),
    asNavFor: '.examples__prj-description'
  });

  $('.examples__prj-description').slick({
    asNavFor: '.examples__prj-photo-wrapper'
  });

  $('.slogan__wrapper').slick({
    nextArrow: $('.page-header__controls .controls__next-btn'),
		prevArrow: $('.page-header__controls .controls__prev-btn')
	});

	$('.features__slider').slick({
    nextArrow: $('.features__controls .controls__next-btn'),
    prevArrow: $('.features__controls .controls__prev-btn'),
    asNavFor: '.features__slider'
  });

});
