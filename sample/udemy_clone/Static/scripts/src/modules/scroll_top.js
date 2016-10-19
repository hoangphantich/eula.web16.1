define(['jquery', 'underscore', 'base/modules/animate'], function ($, _, animate) {

    'use strict';

    function init(selector, option) {
        selector.on('click', function () {
            animate($('body'), 'scroll', { offset: 0, duration: 500, easing: "easeInOutQuad" });
        });
    }

    return {
        init: init
    };
});
