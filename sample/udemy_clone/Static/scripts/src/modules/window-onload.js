define(['jquery'], function ($) {

    'use strict';
    var isRegisterWindowOnload = false;
    var deferred = $.Deferred();

    return function () {

        if (window.isLoaded) {
            deferred.resolve();
        }
        else {
            if (!isRegisterWindowOnload) {
                isRegisterWindowOnload = true;
                window.onload = function () {
                    window.isLoaded = true;
                    deferred.resolve();
                }
            }
        }

        return deferred.promise();
    };

});
