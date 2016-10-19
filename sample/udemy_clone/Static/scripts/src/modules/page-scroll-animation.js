define(['jquery', 'underscore', 'base/modules/page-scroll', 'lib/modernizr'], function ($, _, pageScroll) {

    'use strict';

    pageScroll.init();

    var checkingItems = ".checking-animate";
    var removeClass = "inactive";
    var heightW = $(window).height();
    var deltaH = 0;

    function PageScrollAnimator(container) {
        if (container) {
            var scrollTop = $(window).scrollTop();
            var items = container.find(checkingItems);
            for (var i = 0; i < items.length; i++) {
                if (items.eq(i).hasClass(removeClass) && items.eq(i).offset().top < scrollTop + heightW - deltaH) {
                    items.eq(i).removeClass(removeClass);
                }
            }

            pageScroll.addCallback(function (scrollTop) {
                for (var i = 0; i < items.length; i++) {
                    if (items.eq(i).hasClass(removeClass) && items.eq(i).offset().top < scrollTop + heightW - deltaH) {
                        items.eq(i).removeClass(removeClass);
                    }
                }
            });
        }
    }

    return {
        init: function (container) {
            if (!Modernizr.touch)
                return new PageScrollAnimator(container);
            else {
                var items = container.find(checkingItems);
                for (var i = 0; i < items.length; i++) {
                    if (items.eq(i).hasClass(removeClass)) {
                        items.eq(i).removeClass(removeClass);
                    }
                }
            }
        }
    };
});
