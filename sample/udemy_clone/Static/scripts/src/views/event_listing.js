define(['jquery', 'underscore', 'backbone', 'base/form-validation', 'base/modules/jitRequire'], function ($, _, backbone, formValidation, jitRequire) {

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
                'change #ddlEventType': 'sortByEventType',
                'change #brandFilter': 'setBrandFilter',
                'change #sortDirection': 'sort',
                'click .page-number a': 'changeToPage',
                'click .pagination-arrow a': 'changeByArrow'
            },
            initialize: function () {
            },

            sortByEventType: function () {
                this.$el.find('#SortByEventType').val(this.$el.find('#ddlEventType').val());
                this.submitForm();
            },

            setBrandFilter: function () {
                this.$el.find('#brand').val(this.$el.find('#brandFilter').val());
                this.submitForm();
            },

            sort: function () {
                this.$el.find('#sort').val(this.$el.find('#sortDirection').val());
                this.submitForm();
            },

            setPage: function (page) {
                this.$el.find('#page').val(page);
                this.submitForm();
            },

            changeToPage: function (event) {
                var target = $(event.currentTarget);
                var page = target.attr('data-page');
                this.setPage(page);
            },

            changeByArrow: function (event) {
                var target = $(event.currentTarget);
                var delta = parseInt(target.attr('data-page'));
                var page = parseInt(this.$el.find('#page').val());

                this.setPage(page + delta);
            },

            submitForm: function () {
                var self = this;
                var form = this.$el.find('.hiddenForm form');

                var reloadJs = function () {
                    jitRequire.findDeps(self.$el);
                };

                $.ajax({
                    type: "GET",
                    url: form[0].action,
                    data: form.serialize(),
                    success: function (result) {
                        result = "<div>" + result + "</div>";
                        self.$el.html($(result).find('#event-listing-container').html());

                        setTimeout(function () {
                            reloadJs();
                        }, 10);
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
