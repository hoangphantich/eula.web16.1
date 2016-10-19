define(['jquery', 'underscore', 'backbone'], function ($, _, backbone) {

    function init(container, isCreate) {

        var smallMaxHeight = 130;
        var bigMaxHeight = 260;
     
        $('.small-detail.fulldetail-container').each(function () {
           
            if ($(this).outerHeight(true) >= smallMaxHeight) {
                $(this).css("max-height", smallMaxHeight + "px");

                $(this).children('.full-detail').show();
            } 
        })
        $('.big-detail.fulldetail-container').each(function () {
           
            if ($(this).outerHeight(true) >= bigMaxHeight) {
                $(this).css("max-height", bigMaxHeight + "px");

                $(this).children('.full-detail').show();
            }
        })

        $(".full-detail").click(function () {
            $(this).parent().css("max-height", "none");
            $(this).remove();

        });
    }
  
    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});