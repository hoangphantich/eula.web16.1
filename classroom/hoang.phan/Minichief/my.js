(function($){
    $.fn.greenify = function(options) {
        var settings = $.extend({
                color: "white", //default
            }, options );
        
        
        this.css("color", settings.color);

        return this;
    };    
}(jQuery));


