define(['jquery' ,'base/modules/custom_select_wrapper'], function ($, customSelectWrapper) {

    'use strict';

    
    function init(container) {
        customSelectWrapper.init(container);

        container.find('select').on('change', function () {
            container[0].submit();
        });

        container.find('ul').width(container.parent().outerWidth());
    }   

    return {
        init: init
    };
});
