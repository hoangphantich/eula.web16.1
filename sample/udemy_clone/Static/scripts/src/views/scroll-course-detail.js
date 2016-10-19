define(['jquery', 'underscore', 'backbone'], function ($, _, backbone) {
    function init(container, isCreate) {
        var nav = $('.navbar.navbar-inverse.navbar-fixed-top');
        var height_top = $('.header-container:first').outerHeight(true) + $('.main-details:first').outerHeight(true) + 4;
        $(window)
            .scroll(function () {
                if ($(this).scrollTop() > height_top) {
                    nav.addClass("f-nav");
                } else {
                    nav.removeClass("f-nav");
                }
            });
    }

    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});