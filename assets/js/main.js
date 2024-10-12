(function($) {
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        $main_articles = $main.children('article'),
        stickyHeader = false;

    // Breakpoints setup remains as is...

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
        if (location.hash == '' || location.hash == '#') {
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
})(jQuery);