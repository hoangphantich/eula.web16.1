define(['jquery', 'underscore', 'backbone', 'base/modules/animate'], function ($, _, backbone, animate) {

    'use strict';

    function init(container, isCreate) {
        var backboneView = backboneInit();
        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return backboneView;

    }

    function backboneInit() {
        return Backbone.View.extend({
            events: {
                'click .cookies-close': 'hideCookies'
            },

            initialize: function () {
                var cookieBar = this.checkCookieExist('AlTayerMotorsCookies');
                if (!cookieBar) {
                    animate(this.$el, 'slideDown', { duration: 250, easing: "easeInOutQuad", display: 'block' });
                }
            },

            hideCookies: function () {
                animate(this.$el, 'slideUp', { duration: 250, easing: "easeInOutQuad", display: 'none' });

                var expriedDate = new Date();
                expriedDate.setDate(expriedDate.getDate() + 365);
                document.cookie = 'AlTayerMotorsCookies=true; expires=' + expriedDate.toUTCString() + '; path=/';
            },

            checkCookieExist: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return true;
                }
                return false;
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
