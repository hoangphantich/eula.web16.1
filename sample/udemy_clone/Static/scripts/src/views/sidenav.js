
define(['jquery', 'underscore', 'backbone', 'base/modules/animate'], function ($, _, backbone, animate) {

    'use strict';

    function init(container, isCreate) {
        $(".navbar-toggle").click(function () {
            $("#sideNav").css("width", "55%");
            $(".closenav").css("display", "block");
        });

        $(".closenav").click(function () {
            $("#sideNav").css("width", "0");
            $(".closenav").css("display", "none");
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
