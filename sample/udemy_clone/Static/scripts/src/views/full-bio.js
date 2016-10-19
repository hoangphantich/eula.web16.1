

define(['jquery', 'underscore', 'backbone'], function ($, _, backbone) {

    function init(container, isCreate) {
        $(".full-bio").click(function () {
            $(".biography").css("max-height", "none");
            $(this).remove();
        });
        
    }



    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});