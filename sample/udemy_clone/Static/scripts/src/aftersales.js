define(['jquery'], function ($) {
    function init(container) {
        var department_list_item = container.find('li.orange-top-border a');
        department_list_item.click(function (e) {
            e.preventDefault();
            var _this = $(this);
            _this.parent().siblings().removeClass('active').find('.services-list').slideUp('fast');
            _this.parent().toggleClass('active').find('.services-list').slideToggle('fast');
        });
    }
    return {
        init: function (container) {
            init(container);
        }
    };
});