define(['jquery'], function ($, jqueryPikaday, moment) {

    'use strict';

    var brandLineContainer = null;
    
    function init(container) {
        brandLineContainer = container;
        
        var lineItems = brandLineContainer.find('a');
        lineItems.on('mouseover', function () {
            $(this).removeClass('blur-item');
            $(this).siblings().addClass('blur-item');
        });

        brandLineContainer.on('mouseout', function () {
            lineItems.removeClass('blur-item');
        });
    }

    return {
        init: init
    };
});
