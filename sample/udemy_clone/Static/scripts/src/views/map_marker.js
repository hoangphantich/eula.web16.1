define(['jquery'], function ($, animate) {

    'use strict';

    var firstTimeInit = true;

    // options must have: lat, lng, content, title
    function MapMarker(options) {
        this.lat = options.lat;
        this.lng = options.lng;
        this.content = options.content;
        this.position = new google.maps.LatLng(options.lat, options.lng);
        this.div_ = $("<div title='" + options.title + "'></div>");
        this.div_.css('display', 'none');
        this.div_.html(this.content);
        this.offset = options.offset;

        this.getPosition = function () {
            return this.position;
        }

        // update marker
        this.setIcon = function (icon) {
            this.content = "<div class='marker__container'><img src='" + icon + "' alt=''/></div>";
            this.div_.html(this.content);
        }

        // hide
        this.setVisible = function (isVisible) {
            if (isVisible) {
                this.div_.css('display', 'block');
            }
            else
                this.div_.css('display', 'none');
        }

        // register event
        this.addListener = function (event, callback) {
            this.div_.on(event, function () {
                if (callback)
                    callback();
            });
        }
    }

    function extendMapMarker() {
        if (firstTimeInit) {
            firstTimeInit = false;

            //make a copy of the OverlayView to extend it
            MapMarker.prototype = new google.maps.OverlayView();
            MapMarker.prototype.onRemove = function () {
            }

            //prepare the overlay with DOM
            MapMarker.prototype.onAdd = function () {
                var panes = this.getPanes();
                $(panes.overlayMouseTarget).append(this.div_);
            }

            //set position
            MapMarker.prototype.draw = function () {
                var overlayProjection = this.getProjection();
                var position = overlayProjection.fromLatLngToDivPixel(this.position);
                var panes = this.getPanes();
                this.div_.css('position', 'absolute');
                this.div_.css('left', position.x + 'px');
                this.div_.css('top', position.y - 50 + 'px');
                if(this.offset && this.offset.y)
                    this.div_.css('top', position.y + this.offset.y + 'px');
            }
        }
    }


    return {
        create: function (options) {
            extendMapMarker();
            return new MapMarker(options);
        }
    };
});
