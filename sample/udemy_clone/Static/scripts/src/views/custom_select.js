define(['jquery', 'underscore', 'backbone', 'base/modules/animate'], function ($, _, backbone, animate) {

    'use strict';

    function init(container, eventDispatcher) {
        var backboneView = backboneInit(eventDispatcher);
        return new backboneView({
            el: container
        });

    }

    function backboneInit(eventDispatcher) {
        return Backbone.View.extend({
            selectedTextClass: "selected-label",
            selectedOptionClass: "selected-option",
            customizedClass: 'customized-selected',
            disabledClass: 'disabled-label',
            invalidClass: 'invalid',

            events: {
                "click li": "changeOption",
                //"click .selected-label": "toggleOptions",
                //"click select": "toggleOptions",
                "click": "toggleOptions"
            },

            initialize: function () {
                this.initializeTemplate();
                this.eventListeners();

                $('body').on('click', _.bind(this.hideOption, this));
            },

            eventListeners: function () {
                this.listenTo(eventDispatcher, 'toggleSelect', this.stateChange);
            },

            _isDisabled: function () {
                var disabled = this.$el.find('select').attr('data-disabled');
                if (typeof disabled !== typeof undefined && disabled !== false && disabled.toLowerCase() !== 'false') {
                    return true;
                }

                return false;
            },


            _idInvalid: function () {
                return this.$el.find('select').hasClass(this.invalidClass);
            },

            initializeTemplate: function () {
                this.$el.find('select').siblings().remove();
                var options = this.$el.find("option");
                var selectedOption = this.$el.find("option:selected");

                if (options && options.length > 0) {
                    if (!selectedOption && selectedOption.length == 0) {
                        selectedOption = options.eq(0);
                    }

                    // Label of selected option
                    var selectedText = $("<span class='" + this.selectedTextClass + "'>" + selectedOption.text() + "</span>");
                    if (this._isDisabled()) {
                        selectedText.addClass(this.disabledClass);
                    }
                    if (this._idInvalid()) {
                        selectedText.addClass(this.invalidClass);
                    }

                    // List of options
                    var optionsText = "<ul>";
                    for (var i = 0; i < options.length; i++) {
                        if (i == selectedOption.index()) {
                            optionsText += "<li class='" + this.selectedOptionClass + "' data-val='" + options.eq(i).attr("value") + "'>" + options.eq(i).text() + "</li>";
                        }
                        else {
                            optionsText += "<li data-val='" + options.eq(i).attr("value") + "'>" + options.eq(i).text() + "</li>";
                        }
                    }
                    optionsText += "</ul>";

                    optionsText = $(optionsText);

                    // Display label and options
                    this.$el.append(selectedText).append(optionsText);

                    // hide select
                    this.$el.find('select').addClass(this.customizedClass);
                }
            },

            changeOption: function (event) {
                event.stopPropagation();
                // Get text and value
                var text = $(event.target).html();
                var value = $(event.target).attr('data-val');

                // hide selected option
                this.$el.find('li').removeClass(this.selectedOptionClass);
                $(event.target).addClass(this.selectedOptionClass);

                // update text to label and value to select
                this.$el.find('.' + this.selectedTextClass).html(text);
                this.$el.find('select').val(value);
                this.$el.find('select').trigger('change');

                // Hide list options and trigger events
                this.hideOption();
            },

            toggleOptions: function (event) {
                event.stopPropagation()
                if (!this._isDisabled()) {
                    this.$el.find('ul').toggleClass('show-select');
                }

                eventDispatcher.trigger('toggleSelect', this.$el);
            },

            stateChange: function (el) {
                if (this.$el !== el) {
                    this.hideOption();
                }
            },

            showOptions: function () {
                this.$el.find('ul').addClass('show-select');
            },

            hideOption: function () {
                if (this.$el.find('ul').hasClass('show-select')) {
                    this.$el.find('ul').removeClass('show-select');
                    this.$el.find('select').trigger('focusout');
                }
            }
        });
    }


    return {
        init: function (container, eventDispatcher) {
            return init(container, eventDispatcher);
        }
    };
});
