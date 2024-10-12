(function($) {
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        $main_articles = $main.children('article'),
        stickyHeader = false;

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

		// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
	if (browser.name == 'ie') {

		var flexboxFixTimeoutId;

		$window.on('resize.flexbox-fix', function() {

			clearTimeout(flexboxFixTimeoutId);

			flexboxFixTimeoutId = setTimeout(function() {

				if ($wrapper.prop('scrollHeight') > $window.height())
					$wrapper.css('height', 'auto');
				else
					$wrapper.css('height', '100vh');

			}, 250);

		}).triggerHandler('resize.flexbox-fix');

	}
	
	// Nav.
	var $nav = $header.children('nav'),
	$nav_li = $nav.find('li');

// Add "middle" alignment classes if we're dealing with an even number of items.
	if ($nav_li.length % 2 == 0) {

		$nav.addClass('use-middle');
		$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

	}	

    // Custom function to toggle header stickiness
    function toggleHeaderStickiness(makeSticky) {
        if (makeSticky && !stickyHeader) {
            $header.addClass('is-sticky').css('position', 'fixed');
            stickyHeader = true;
        } else if (!makeSticky && stickyHeader) {
            $header.removeClass('is-sticky').css('position', 'static');
            stickyHeader = false;
        }
    }

    // Article showing logic
    $main._show = function(id) {
        var $article = $main_articles.filter('#' + id);

        if ($article.length == 0) return;

        // Hide all articles
        $main_articles.hide();

        // Show the selected article
        $article.show();

        // Scroll to top and make header sticky
        $window.scrollTop(0);
        toggleHeaderStickiness(true);

        // Mark as active
        $article.addClass('active');
    };

    // Article hiding logic
    $main._hide = function() {
        // Hide all articles
        $main_articles.hide().removeClass('active');

        // Unstick header if necessary
        if (location.hash == '' || location.hash == '#intro') {
            toggleHeaderStickiness(false);
        }
    };

    // Event handling
    $window.on('hashchange', function(event) {
        if (location.hash == '' || location.hash == '#') {
            event.preventDefault();
            $main._hide();
        } else if ($main_articles.filter(location.hash).length > 0) {
            event.preventDefault();
            $main._show(location.hash.substr(1));
        }
    });

    // Initial load
    $window.on('load', function() {
        if (location.hash) {
            $main._show(location.hash.substr(1));
        } else {
            $main._hide();
        }
    });

    // Remove modal functionality and old event listeners
    $body.off('click');
    $window.off('keyup');
    $main_articles.find('.close').remove(); // Assuming you had close buttons in modal

    // Scroll restoration for browsers without native support
    if (!('scrollRestoration' in history)) {
        var oldScrollPos = 0,
            scrollPos = 0,
            $htmlbody = $('html,body');

        $window.on('scroll', function() {
            oldScrollPos = scrollPos;
            scrollPos = $htmlbody.scrollTop();
        });
        $window.on('hashchange', function() {
            $window.scrollTop(oldScrollPos);
        });
    }

	$window.on('scroll', function() {
		if ($window.scrollTop() > 0) {
			toggleHeaderStickiness(true);
		} else {
			toggleHeaderStickiness(false);
		}
	});

	$window.scrollTop = function(value) {
		if (value === 0) {
			$('html, body').animate({ scrollTop: 0 }, 300);
		} else {
			return this.scrollTop(value);
		}
	};
})(jQuery);