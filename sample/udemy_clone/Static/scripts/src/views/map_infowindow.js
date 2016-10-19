define(['jquery', 'base/modules/rtl'], function ($, rtl) {

    'use strict';

    var firstTimeInit = true;

    // options must have lat, lng, content
    function MapInfoWindow(options) {
        this.lat = options.lat;
        this.lng = options.lng;
        this.mapWidth = options.mapWidth;
        this.pos = new google.maps.LatLng(options.lat, options.lng);
        this.content = options.content;
        this.div_ = $('<div></div>');
        this.div_.html(this.content);
        this.offset = options.offset;

        // remove content
        this.clear = function () {
            this.content = "";
            this.div_.html(this.content);
        }

        // update location and content
        this.update = function (lat, lng, content) {
            this.content = content;
            this.div_.html(this.content);
            this.lat = lat;
            this.lng = lng;
            this.pos = new google.maps.LatLng(lat, lng);

            // update position
            this.draw();
        }

        // register event
        this.addListener = function (event, callback) {
            this.div_.on(event, function () {
                if (callback)
                    callback();
            });
        }
    }

    function extendMapInfoWindow() {
        if (firstTimeInit) {
            firstTimeInit = false;

            //make a copy of the OverlayView to extend it
            MapInfoWindow.prototype = new google.maps.OverlayView();
            MapInfoWindow.prototype.onRemove = function () {
            }

            //prepare the overlay with DOM
            MapInfoWindow.prototype.onAdd = function () {
                var panes = this.getPanes();
                $(panes.overlayMouseTarget).append(this.div_);
            }

            //set position
            MapInfoWindow.prototype.draw = function () {
                var overlayProjection = this.getProjection();
                var position = overlayProjection.fromLatLngToDivPixel(this.pos);
                var panes = this.getPanes();
                this.div_.css('position', 'absolute');
                this.div_.css('width', '100%');

                if (rtl.isRtl) {
                    this.div_.css('float', 'right');
                    this.div_.css('right', this.mapWidth - position.x + 'px');
                    this.div_.css('left', 'auto');
                }
                else {
                    this.div_.css('float', 'left');
                    this.div_.css('right', 'auto');
                    this.div_.css('left', position.x + 'px');
                }
                this.div_.css('top', position.y - 50 + 'px');
                if (this.offset && this.offset.y)
                    this.div_.css('top', position.y + this.offset.y + 'px');

                var self = this;
                this.div_.find('.infowindow__close').on('click', function () {
                    self.clear();
                });

                var timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    self.div_.css('width', self.div_.find('.infowindow__container').outerWidth());
                }, 500);
            }
        }
    }

    return {
        create: function (options) {
            extendMapInfoWindow();
            return new MapInfoWindow(options);
        }
    };
});
