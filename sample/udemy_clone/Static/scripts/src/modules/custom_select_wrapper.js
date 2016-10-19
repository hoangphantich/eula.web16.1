define(['jquery', 'base/views/custom_select', 'base/modules/eventDispatcher'], function ($, customSelect, eventDispatcher) {

    'use strict';

    var localDispatcher = eventDispatcher();
    var listSelects = new Array();

    function init(container) {
        var selects = container.find('select');
        for (var i = 0; i < selects.length; i++) {
            listSelects.push(customSelect.init(selects.eq(i).parent(), localDispatcher));
        }
    }

    function updateSelect(select) {
        for (var i = 0; i < listSelects.length; i++) {
            if (listSelects[i].$el.find('select').attr('name') === select.attr('name')) {
                listSelects[i].initializeTemplate();
                break;
            }
        }
    }

    return {
        init: init,
        updateSelect: updateSelect
    };
});
