define(['jquery', 'underscore', 'backbone', 'base/form-validation'], function ($, _, backbone, formValidation) {

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
                'change #Enquiry_Type': 'checkSelectedEnquiry'
            },
            initialize: function () {
                formValidation.init(this.$el);
                this.checkSelectedEnquiry();
                this.registEvents();
            },

            registEvents: function () {
            },

            checkSelectedEnquiry: function () {
                var selectedEnquiryType = this.$el.find('#Enquiry_Type').val();
                var siblings = this.$el.find('#Enquiry_Type').parent().siblings();
                siblings.addClass('input-hidden');

                if (selectedEnquiryType == 'Vehicle Enquiry') {
                    for (var i = 0; i < siblings.length; i++) {
                        var textarea = siblings.eq(i).find('textarea');
                        if (!textarea || textarea.length == 0) {
                            siblings.eq(i).removeClass('input-hidden');
                        }
                    }
                }
                else {
                    for (var i = 0; i < siblings.length; i++) {
                        var textarea = siblings.eq(i).find('textarea');
                        if (textarea && textarea.length > 0) {
                            siblings.eq(i).removeClass('input-hidden');
                        }
                    }
                }
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
