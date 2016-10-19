define(['jquery', 'underscore', 'backbone', 'base/views/map_infowindow', 'base/views/map_marker', 'lib/modernizr'], function ($, _, backbone, mapInfoWindow, mapMarker) {

    'use strict';

    function init(container, isCreate) {
        var backboneView = backboneInit();
        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return backboneView;

    }

    function backboneInit() {
        return Backbone.View.extend({
            map: null,
            srcService: '',
            markerImage: "/img/map_marker.png",

            initialize: function () {
                this.srcService = this.$el.attr('data-service');

                this.initMap();

                if (!Modernizr.touch) {
                    $('head').append('<style type="text/css">.infowindow__close { display: none;}</style>');
                }
            },

            initMap: function () {

                if (!window.mapIsReady) {
                    var self = this;
                    var timeout = setTimeout(function () {
                        clearTimeout(timeout);
                        self.initMap();
                    }, 1000);
                    return;
                }

                var center = {
                    lat: 24.958609,
                    lng: 55.594570
                }

                this.map = new google.maps.Map(this.$el.find('#contact_map').get(0), {
                    center: center,
                    zoom: 8,
                    zoomControl: false,
                    mapTypeControl: false
                });

                this.loadLocation();
            },

            loadLocation: function () {
                var self = this;
                $.ajax({
                    url: this.srcService,
                    type: 'GET',
                    async: true,
                    success: function (data) {
                        if (data && data.success) {
                            self.locations = data.data;
                            self.isDataLoaded = true;
                            self.generateLocations();
                        }
                    },
                    error: function () {
                    }
                });
            },

            generateLocations: function () {
                this.markers = new Array();
                this.infoWindows = new Array();
                var bounds = new google.maps.LatLngBounds();

                if (this.locations && this.locations.length > 0) {
                    var self = this;

                    for (var i = 0; i < this.locations.length; i++) {
                        var location = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
                        var marker = mapMarker.create({
                            lat: this.locations[i].lat,
                            lng: this.locations[i].lng,
                            content: "<div class='marker__container'><img src='" + this.markerImage + "' alt=''/></div>",
                            title: this.locations[i].title,
                            offset: {
                                y: -30
                            }
                        });
                        marker.setMap(this.map);
                        marker.setVisible(true);

                        bounds.extend(location);
                        this.markers.push(marker);
                    }

                    this.map.fitBounds(bounds);
                    this.registerEventMarker();
                }
            },

            registerEventMarker: function () {
                var self = this;
                if (this.markers && this.markers.length > 0) {
                    if (!Modernizr.touch) {
                        for (var i = 0; i < this.markers.length; i++) {
                            (function (marker, index) {
                                marker.addListener('mouseenter', function () {
                                    self.showInfoWindow(index);
                                });
                            })(this.markers[i], i);
                        }
                    }
                    else {
                        for (var i = 0; i < this.markers.length; i++) {
                            (function (marker, index) {
                                marker.addListener('click', function () {
                                    self.showInfoWindow(index);
                                });
                            })(this.markers[i], i);
                        }
                    }
                }
            },

            showInfoWindow: function (i) {
                var contentHtml = "<div class='infowindow__container'>" +
                                            "<img class='infowindow__marker' src='" + this.markerImage + "'/> " +
                                            "<h3 class='infowindow__header'>" + this.locations[i].title + "</h3>" +
                                            "<div class='infowindow__content'>" +
                                                "<div class='infowindow__content__watch'>" +
                                                    this.locations[i].workTime +
                                                "</div>" +
                                                "<a class='infowindow__content__phone' href='tel:" + this.locations[i].phone + "'>" +
                                                    this.locations[i].phone +
                                                "</a>" +
                                            "</div>" +
                                            "<span class='infowindow__close'>&nbsp;</span>" +
                                          "</div>";

                if (this.infoWindow == null) {
                    this.infoWindow = mapInfoWindow.create({
                        lat: this.markers[i].getPosition().lat(),
                        lng: this.markers[i].getPosition().lng(),
                        content: contentHtml,
                        mapWidth: this.$el.find('#contact_map').width(),
                        offset: {
                            y: -30
                        }
                    });

                    var self = this;
                    this.infoWindow.addListener('mouseleave', function () {
                        self.infoWindow.clear();
                    });
                }
                else {
                    this.infoWindow.update(this.markers[i].getPosition().lat(), this.markers[i].getPosition().lng(), contentHtml);
                }

                this.infoWindow.setMap(this.map);
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
