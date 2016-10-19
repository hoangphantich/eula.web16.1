define(['jquery', 'underscore', 'vendor/velocity','vendor/velocity.ui'], function ($, _, Velocity,VelocityUi) {

    'use strict';

    return function (el, props, opts, ctx) {

        var deferred = $.Deferred();

        Velocity.call(el, props, _.extend(opts || {}, {
            complete: function () {
                deferred.resolve(ctx || this);
            }
        }));

        return deferred.promise();
    };

});
