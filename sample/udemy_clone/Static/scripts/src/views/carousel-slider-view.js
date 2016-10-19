define(['jquery', 'underscore', 'backbone', 'base/modules/carousel-slider'], function ($, _, backbone, carouselSlider) {

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
            initialize: function () {
                this.initSlider();
            },

            /**-- Initialize for slider ---**/
            initSlider: function () {
                var option = {
                    items: 1,
                    smartSpeed: 500,
                    loop: true,
                    nav: true,
                    dots: false
                };
                carouselSlider.init(this.$el, option);
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
