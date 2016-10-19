define(['jquery', 'underscore', 'backbone', 'base/views/custom_select', 'base/modules/eventDispatcher', 'base/modules/animate'], function ($, _, backbone, customSelect, eventDispatcher, animate) {

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

            container: null,

            events: {
                'click button[type="submit"]': 'submitOnClick'
            },

            initialize: function () {
                this.container = this.$el;

                this.localDispatcher = eventDispatcher();
                var selects = this.$el.find('.brand-model-filter__dropdown');
                for (var i = 0; i < selects.length; i++) {
                    customSelect.init(selects.eq(i), this.localDispatcher);
                }
            },

            submitOnClick: function (e) {
                var category = $('select[name="category"]', this.container).val();
                var sort = $('select[name="sort"]', this.container).val();
                var action = $('form', this.container).attr("action");
                var updatePanel = $(".row.brand-model", this.container);
                var contentContainer = this.$el.find('.tab-contents');

                $.ajax({
                    url: action,
                    data: {
                        "category": category,
                        "sort": sort,
                        "loaded": true
                    },
                    method: 'GET',
                    async: true,
                    success: function (html) {
                        contentContainer.css('opacity', '0');
                        updatePanel.html(html);
                        var timeout = setTimeout(function () {
                            clearTimeout(timeout);
                            animate(contentContainer, 'transition.slideUpIn', { duration: 250, easing: 'easeInOutQuad' });
                        }, 500);
                    },
                    error: function (error) {

                    }
                });
                e.preventDefault();
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
