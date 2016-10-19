define(["jquery", "underscore", "backbone"], function ($, _, backbone) {
    "use strict";
    function init(container, isCreate) {
        var backboneView = backboneInit();
        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return [backboneView, HandlerBars];
    }
    function backboneInit() {
        return Backbone.View.extend({
            events: {
                'click .fa-check-square': "checkbox_tick"
            },
            checkbox_tick: function (e) {
                this.$el.find(".fils-li").css("display", "block");
                $(this).css("display", "none");
            },
        })
    }
    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    }
})