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

    function removeHTMLTags(ctr) {
        var strInputCode = $(ctr).val();

        strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
            return (p1 == "lt") ? "<" : ">";
        });
        var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
        while (strTagStrippedText.indexOf('"') != -1)
            strTagStrippedText = strTagStrippedText.replace('"', '');
        $(ctr).val(strTagStrippedText);
        return strTagStrippedText;



    }

    function doSearch(el) {
        var searchInput = $(el).find('.search-input');
        var searchHref = $(searchInput).attr("data-href");
        var query = removeHTMLTags($(searchInput));
        if (searchHref != null && searchHref != "" && query != "") {
            window.location.href = searchHref + "?query=" + encodeURIComponent(query) + "&pageSize=10&page=0";
            return;
        }
    }

    function backboneInit() {
        return Backbone.View.extend({
            events: {
                'click .search-icon': 'showSearch',
                'click .search-close': 'hideSearch',
                'click .menu-tablet-selector': 'toggleTabletMenu',
                'keypress .search-input': 'pressEnterInSearchText'
            },

            initialize: function (opts) {

            },

            pressEnterInSearchText: function (e) {
                var characterCode;
                if (e && e.which) {
                    e = e;
                    characterCode = e.which;
                } else {
                    e = window.event; characterCode = e.keyCode;
                }
                if (characterCode == 13) {
                    doSearch(this.$el);
                    return false;
                }
                return true;
            },

            showSearch: function () {
                if (this.$el.hasClass('search-active')) {
                    doSearch(this.$el);
                    return;
                }

                var width = this.$el.width() - this.$el.find('.search-icon').outerWidth() - this.$el.find('.search-close').outerWidth() - 35;// 35 is margin left of input search
                if (width <= 100) {
                    var windowW = this.$el.parent().width();
                    width = windowW - this.$el.find('.search-icon').outerWidth() - this.$el.find('.search-close').outerWidth() - 40;// 40 is margin left of input search
                }

                animate(this.$el.find('.search-input'), {
                    'width': width + 'px'
                }, {
                    duration: 200,
                    easing: "linear"
                });
                this.$el.parent().addClass('search-active');
                this.$el.addClass('search-active');
                this.$el.find(".search-input").focus();
            },
            hideSearch: function () {
                this.$el.parent().removeClass('search-active');

                var _self = this;

                animate(this.$el.find('.search-input'), {
                    'width': '0px'
                }, {
                    duration: 200,
                    easing: "linear"
                }).then(function () {
                    _self.$el.removeClass('search-active');
                });
            },

            toggleTabletMenu: function () {
                this.$el.find('.menu-tablet-selector').toggleClass('active');
            }
        });
    }



    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
