define(['jquery', 'underscore', 'backbone', 'base/views/custom_select', 'base/modules/eventDispatcher'], function ($, _, backbone, customSelect, eventDispatcher) {

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
                'change select': 'selectOnChange'
            },

            initialize: function () {
                this.container = this.$el;

                this.localDispatcher = eventDispatcher();
                var selects = this.$el.find('.brand-model-filter__dropdown');
                for (var i = 0; i < selects.length; i++) {
                    customSelect.init(selects.eq(i), this.localDispatcher);
                }
            },

            selectOnChange: function (e) {
                var model = $('select[name="model"]', this.container).val();
                var sort = $('select[name="sort"]', this.container).val();
                var action = $('form', this.container).attr("action");
                var updatePanel = $(".row.double-row-gutter", this.container);
                $.ajax({
                    url: action,
                    data: {
                        "model": model,
                        "sort": sort,
                        "loaded": true
                    },
                    method: 'GET',
                    async: true,
                    success: function (html) {
                        updatePanel.html(html);
                    },
                    error: function (error) {

                    }
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
