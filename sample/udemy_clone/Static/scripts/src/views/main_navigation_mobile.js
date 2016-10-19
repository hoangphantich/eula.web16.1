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
    function backboneInit() {
        return Backbone.View.extend({
            events: {
                'click .main-navigation-mobile__brand-select': 'toggleBrands',
                'click .main-navigation-mobile__toggle-menu': 'toggleMenu',
                'click #search-submit-mobile': 'doSearchMobile'
            },
            initialize: function () {
                this.scrollMainNav();
                this.windowResize();
                this.outSideMenuClick();
            },
            scrollMainNav: function () {
                var window_h = $(window).height();
                this.$el.find('.main-navigation-mobile__list-brand').css('max-height', window_h - 50);
            },
            windowResize: function() {
                $(window).resize(_.bind(this.scrollMainNav, this));
            },
            toggleBrands: function () {
                this.$('.main-navigation-mobile__brand-select').toggleClass('active');
            },
            outSideMenuClick: function () {
                var _self = this;
                $(document).click(function (event) {
                    var _opened = $(".main-navigation-mobile__container").hasClass("show-menu");
                    if (_opened === true && $(event.target).closest('.main-navigation-mobile__container').length == 0) {
                        _self.toggleMenu();
                    }
                });
            },
            toggleMenu: function () {
                this.$el.toggleClass('show-menu');
                this.$el.parents('.page-wrapper-content').toggleClass('show-menu');
            },
            doSearchMobile: function() {
                var searchInput = $('.main-navigation-mobile__menu__ul .search-input');
                if ($(searchInput).val() != "") {
                    var searchHref = $(searchInput).attr("data-href");
                    if (searchHref != null && searchHref != "") {
                        window.location.href = searchHref + "?query=" + encodeURIComponent(removeHTMLTags($(searchInput))) + "&pageSize=10&page=0";
                    }
                }
                return false;
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
