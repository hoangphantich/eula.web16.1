define(['jquery', 'underscore', 'backbone'], function ($, _, backbone) {
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
                'click .humberger': 'toggleMenu',
                'click .close-menu': 'closeToggleMenu',
                'click .btn-browse-mobile': 'browse_mobile',
                'click .btn-exit': 'toggleMenu',
                'click .search-mobile-button': 'show_search_mobile',
                'click .btn-cancel-search-mobile':'close_search_mobile'
            },
            toggleMenu: function (e) {
                $('.pollSlider').css("margin-left", "0");
                $('.close-menu').css("display", "block");
                $('.browse-mobile').css("display", "none");
                $('.list-menu').css("display", "block");
                $('#nav-course-details').css('display', 'none');
            },
            closeToggleMenu: function (e) {
                $('.pollSlider').css("margin-left", "-80%");
                $('.close-menu').css("display", "none");
                $('.browse-mobile').css("display", "none");
            },
            browse_mobile: function (e) {
                $('.browse-mobile').css("display", "block");
                $('.list-menu').css("display", "none");
            },
            show_search_mobile: function (e) {
                $('.header-container').addClass("search-expend");
            },
            close_search_mobile:function(e) {
                $('.header-container').removeClass("search-expend");
            }
            
        });
    }
    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});