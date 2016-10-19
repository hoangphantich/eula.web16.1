define(['jquery'], function ($) {
    function init(container) {
        var listTarget = container.find('div[data-content]');
        container.find('a[data-target]').click(function (e) {
            e.preventDefault();

            var _this = $(this);
            var _target_tab = _this.attr('data-target');
            _this.parent().siblings().find('a[data-target]').removeClass('active');
            _this.parent().find('a[data-target]').removeClass('active');
            _this.addClass('active');

            listTarget.removeClass('active');
            for (var i = 0; i < listTarget.length; i++) {
                if (listTarget.eq(i).attr('data-content') == _target_tab) {
                    listTarget.eq(i).addClass('active');
                    break;
                }
            }
        });
    }
    return {
        init: function (container) {
            init(container);
        }
    };
});