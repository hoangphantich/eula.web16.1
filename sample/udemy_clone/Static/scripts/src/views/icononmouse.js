define(['jquery', 'underscore', 'backbone', 'base/modules/animate'], function ($, _, backbone, animate) {

    'use strict';

    function init(container, isCreate) {

        $(".Language").hover(function () {
   
               $(this).append($("<span class=\"glyphicon glyphicon-ok\"></span>"));
           }, function () {
               $(this).find("span:last").remove();
           }
     );
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
