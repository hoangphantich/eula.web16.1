define(['jquery', 'underscore', 'backbone', 'lib/jquery.fancybox'], function ($, _, backbone, fancyBox) {

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
                this.$el.fancybox({
                    width: '100%',
                    height: '100%'
                });
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
