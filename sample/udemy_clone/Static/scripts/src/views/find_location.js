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
            locations: '',
            isShowroom: true,
            isServiceCentre: true,
            isBodyshop: true,
            location: '0', // selected location, 0: all locations
            currentLocation: null,
            radius: 20000,

            isMapLoaded: false,
            isDataLoaded: false,

            map: null,
            markers: null,
            infoWindows: null,
            srcService: '',

            imageShowroom: "/img/marker_showroom.png",
            imageServiceCenter: "/img/marker_service.png",
            imageBodyshop: "/img/marker_bodyshop.png",

            infoWindow: null,

            events: {
                'change .input-selection-container select': 'changeLocation',
                'click .find-location-select-option img': 'fromCurrentLocation',
                'change #checkbox_showroom': 'changeShowroom',
                'change #service_centre': 'changeServiceCentre',
                'change #bodyshop': 'changeBodyshop'
            },

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
                this.map = new google.maps.Map(this.$el.find('#find_location_map').get(0), {
                    center: center,
                    zoom: 8,
                    zoomControl: false,
                    mapTypeControl: false
                });

                this.isMapLoaded = true;
                this.loadData();
            },

            loadData: function () {
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

                if (this.locations && this.locations.length > 0) {
                    for (var i = 0; i < this.locations.length; i++) {
                        var marker = mapMarker.create({
                            lat: this.locations[i].lat,
                            lng: this.locations[i].lng,
                            content: '',
                            title: this.locations[i].title
                        });
                        marker.setMap(this.map);
                        marker.setVisible(false);

                        this.markers.push(marker);
                    }

                    this.toggleMarkers();

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
                var image = "";

                var isShowroom = this.isShowroom && this.locations[i].isShowroom;
                var isServiceCenter = this.isServiceCentre && this.locations[i].isServiceCenter;
                var isBodyshop = this.isBodyshop && this.locations[i].isBodyshop;

                if (isShowroom) {
                    image = this.imageShowroom;
                }
                else if (isServiceCenter) {
                    image = this.imageServiceCenter;
                }
                else {
                    image = this.imageBodyshop;
                }
                var contentHtml = "<div class='infowindow__container'>" +
                                            "<img class='infowindow__marker' src='" + image + "'/> " +
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
                        mapWidth: this.$el.find('#find_location_map').width()
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
            },


            // change list locations
            changeLocation: function () {
                this.location = this.$el.find('.find-location-select-option select').val();
                this.toggleMarkers();
            },

            // choose current location
            fromCurrentLocation: function () {
                if (this.currentLocation != null)
                    this.showMarkersByCurrentLocation();

                if (navigator.geolocation) {
                    var _self = this;
                    navigator.geolocation.getCurrentPosition(
                        function (position) {
                            _self.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                            _self.showMarkersByCurrentLocation();
                        },
                        function () {
                            var alertText = "Please accept geolocation to be able to find you.";
                        }
                    );
                }
            },

            showMarkersByCurrentLocation: function () {
                if (this.markerCurrent) {
                    this.markerCurrent.setMap(null);
                }
                this.markerCurrent = new google.maps.Marker({
                    position: this.currentLocation,
                    icon: '/img/marker_current_location2.png',
                    animation: google.maps.Animation.DROP
                });
                this.markerCurrent.setMap(this.map);

                var circle = new google.maps.Circle({
                    map: this.map,
                    radius: 100,
                    fillColor: '#c6d6f1',
                    strokeColor: '#77a4f3',
                    strokeWeight: 1
                });
                circle.bindTo('center', this.markerCurrent, 'position');

                this.toggleMarkers();
            },

            _isHaveMarker: function () {
                return this.locations && this.locations.length > 0;
            },

            // show room is changed
            changeShowroom: function () {
                if (this.$el.find('#checkbox_showroom').is(':checked')) {
                    this.isShowroom = true;
                }
                else {
                    this.isShowroom = false;
                }

                this.toggleMarkers();
            },

            // service center is changed
            changeServiceCentre: function () {
                if (this.$el.find('#service_centre').is(':checked')) {
                    this.isServiceCentre = true;
                }
                else {
                    this.isServiceCentre = false;
                }

                this.toggleMarkers();
            },

            // bodyshop is changed
            changeBodyshop: function () {
                if (this.$el.find('#bodyshop').is(':checked')) {
                    this.isBodyshop = true;
                }
                else {
                    this.isBodyshop = false;
                }

                this.toggleMarkers();
            },

            // check all markers to show/hide
            toggleMarkers: function () {
                if (!this._isHaveMarker())
                    return;

                var bounds = new google.maps.LatLngBounds();
                var boundsNotFound = new google.maps.LatLngBounds();
                var foundLocation = false;
                var isBoundCurrentLocation = false;
                var hasLocation = false;

                var numberLocation = 0;
                for (var i = 0; i < this.locations.length; i++) {
                    var isSameLocation = this.location === '0' || this.location == this.locations[i].city;
                    var isShowroom = this.isShowroom && this.locations[i].isShowroom;
                    var isServiceCenter = this.isServiceCentre && this.locations[i].isServiceCenter;
                    var isBodyshop = this.isBodyshop && this.locations[i].isBodyshop;

                    if (isSameLocation && (isShowroom || isServiceCenter || isBodyshop)) {
                        if (isShowroom) {
                            this.markers[i].setIcon(this.imageShowroom);
                        }
                        else if (isServiceCenter) {
                            this.markers[i].setIcon(this.imageServiceCenter);
                        }
                        else {
                            this.markers[i].setIcon(this.imageBodyshop);
                        }
                        this.markers[i].setVisible(true);
                        numberLocation++;

                        if (this.currentLocation) {
                            var distance = google.maps.geometry.spherical.computeDistanceBetween(this.currentLocation, this.markers[i].position);
                            if (distance <= this.radius) {
                                bounds.extend(this.markers[i].position);

                                foundLocation = true;
                            }
                            else {
                                boundsNotFound.extend(this.markers[i].position);
                                hasLocation = true;
                            }

                            if (!isBoundCurrentLocation) {
                                isBoundCurrentLocation = true;
                                bounds.extend(this.currentLocation);
                                boundsNotFound.extend(this.currentLocation);
                            }
                        }
                        else {
                            bounds.extend(this.markers[i].position);
                            foundLocation = true;
                        }
                    }
                    else {
                        this.markers[i].setVisible(false);
                    }
                }

                if (foundLocation)
                    this.map.fitBounds(bounds);
                else if (hasLocation) {
                    this.map.fitBounds(boundsNotFound);
                }
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});

