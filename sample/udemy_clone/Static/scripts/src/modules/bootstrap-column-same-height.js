define(['jquery', 'underscore', 'base/modules/animate', 'lib/owl.carousel', 'base/modules/window-onload'], function ($, _, animate, owl, windowOnload) {

    'use strict';

    var columnClass = ".column-same-height";
    var notCheckClass = 'same-height-desktop';
    var desktopSize = 992;

    function init(container) {
        new BoostrapColumnSameHeight(container);
    }

    function BoostrapColumnSameHeight(container) {
        var _self = this;

        this.columns = container.find(columnClass);

        this.changeHeightForColumns = function () {

            var windowW = $(window).width();
            var height = 0;
            for (var i = 0; i < this.columns.length; i++) {
                this.columns.eq(i).css('height', 'auto');
            }
            for (var i = 0; i < this.columns.length; i++) {
                var columnHeight = this.columns.eq(i).outerHeight();
                if (columnHeight > height && (windowW >= desktopSize || !this.columns.eq(i).hasClass(notCheckClass))) {
                    height = columnHeight;
                }
            }

            for (var i = 0; i < this.columns.length; i++) {
                if (windowW >= desktopSize || !this.columns.eq(i).hasClass(notCheckClass)) {
                    this.columns.eq(i).css('height', height + 'px');
                }
            }

            //Check for tablet and mobile
            var heightDevice = 0;
            for (var i = 0; i < this.columns.length; i++) {
                var columnHeight = this.columns.eq(i).outerHeight();
                if (columnHeight > heightDevice && (windowW < desktopSize && this.columns.eq(i).hasClass(notCheckClass))) {
                    heightDevice = columnHeight;
                }
            }

            for (var i = 0; i < this.columns.length; i++) {
                if (windowW < desktopSize && this.columns.eq(i).hasClass(notCheckClass)) {
                    this.columns.eq(i).css('height', heightDevice + 'px');
                }
            }
        }

        this.changeHeightForColumns();

        var timeout = null;
        $(window).on('resize', function () {
            if (timeout)
                clearTimeout(timeout);

            timeout = setTimeout(function () {
                clearTimeout(timeout);
                _self.changeHeightForColumns();
            }, 200);
        });

        windowOnload().then(function () {
            _self.changeHeightForColumns();
        });

        var upcomming = container.find('.upcomming-event-block');
        if (upcomming && upcomming.length > 0) {
            $(document).on('upcomming-event-resized', function () {
                _self.changeHeightForColumns();
            });
        }
    }

    return {
        init: init
    };
});
