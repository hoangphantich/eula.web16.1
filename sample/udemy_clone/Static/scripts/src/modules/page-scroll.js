define(['jquery', 'underscore'], function ($, _) {

    'use strict';

    var isInitial = false;
    var callbackArrs = new Array();
    var enableScroll = true;
    
    function init() {
        $(window).on('scroll', function (e) {
            if (!enableScroll) {
                return;
            }
            enableScroll = false;
            scrollTopChange();
        });
    }
    
    function scrollTopChange() {
        var scrollTop = $(window).scrollTop();

        for (var i = 0; i < callbackArrs.length; i++) {
            callbackArrs[i](scrollTop);
        }
        enableScroll = true;
    }

    return {        
        init: function () {
            if (isInitial)
                return;
            isInitial = true;

            init();
        },
        
        addCallback: function (callback) {
            if(callback)
                callbackArrs.push(callback);
        },
        
        removeCallback: function(callback) {
            if (callback) {
                for (var i = 0; i < callbackArrs.length; i++) {
                    if (callbackArrs[i] == callback) {
                        callbackArrs.splice(i, 1);
                        return;
                    }
                }
            }
        }
    };
});
