define(['jquery'], function ($, jqueryPikaday, moment) {

    'use strict';

    var footerContainer = null;
    
    function init(container) {
        footerContainer = container;
        changeSizeOfFooterLinks();

        var timeout = null;
        $(window).on('resize', function () {
            if (timeout)
                clearTimeout(timeout);

            timeout = setTimeout(function () {
                clearTimeout(timeout);
                changeSizeOfFooterLinks();
            }, 200);
        });
    }

    function changeSizeOfFooterLinks() {
        var footerLinks = footerContainer.find('.footer-link');
        footerLinks.css('width', 'auto');

        var totalWidth = 0;
        for (var i = 0; i < footerLinks.length; i++) {
            totalWidth += footerLinks.eq(i).outerWidth();
        }

        if (totalWidth > footerContainer.width()) {
            footerLinks.css('width', 100 / footerLinks.length + '%');
        }
    }

    return {
        init: init
    };
});
