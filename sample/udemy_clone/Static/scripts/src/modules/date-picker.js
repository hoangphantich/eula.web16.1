define(['jquery', 'lib/pikaday.jquery','moment'], function ($, jqueryPikaday, moment) {

    'use strict';
    
    function init(container) {
        container.find('.date-picker-input').pikaday({
            firstDay: 1,
            format: 'MMM DD, YYYY',
            position: 'bottom right',
            onSelect: function (date) {
            }
        });
    }   

    return {
        init: init
    };
});
