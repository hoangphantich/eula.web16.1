define(['jquery', 'underscore', 'lib/owl.carousel', 'base/modules/rtl'], function ($, _, owl, rtl) {

    'use strict';

    function CarouselSlider(selector, option) {
        if (selector.children().eq(0).children().length >= 1) {
            if (!option) {
                option = {
                    items: 1,
                    smartSpeed: 500,
                    loop: true
                };
            }

            option.rtl = rtl.isRtl;
            this.carousel = selector.children().eq(0).addClass('owl-carousel').owlCarousel(option);
        }
    }

    return {
        init: function (container, option) {
            return new CarouselSlider(container, option);
        }
    };
});
