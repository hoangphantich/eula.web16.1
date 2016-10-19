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
                'click .vehicle-detail__show-more': 'showMore'
            },

            showMore: function () {
                this.$el.find('.short-description').css('display', 'none');
                this.$el.find('.long-description').css('display', 'block');
                this.$el.find('.vehicle-detail__show-more').css('display', 'none');
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
