
define(['jquery', 'underscore', 'backbone', 'base/modules/carousel-slider', 'base/modules/window-onload'], function ($, _, Backbone, carouselSlider, windowOnload) {

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
            desktopSize: 992,
            tabletSize: 768,
            numberItems: 0,

            initialize: function () {
                var option = {
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        550: {
                            items: 2,
                            margin: 20
                        },
                        992: {
                            items: 1,
                            margin: 20
                        },
                        1200: {
                            items: 1
                        }
                    },
                    smartSpeed: 500,
                    loop: false,
                    nav: false,
                    onChanged: _.bind(this.changePage, this),
                    onResized: _.bind(this.resizedCarousel, this),
                    onInitialized: _.bind(this.resizedCarousel, this)
                };

                var listItems = this.$el.find('.event-item');
                this.numberItems = listItems.length;

                if (listItems.length <= 1) {
                    this.$el.find(".upcomming-carousel-navigation .next").addClass('hidden-field');
                    this.$el.find(".upcomming-carousel-navigation .prev").addClass('hidden-field');
                }

                var self = this;
                windowOnload().then(function () {
                    var carouselObj = null;

                    setTimeout(function () {
                        carouselObj = carouselSlider.init(self.$el.find('.upcomming-carousel'), option);
                    }, 500);

                    self.$el.find(".upcomming-carousel-navigation .next").click(function () {
                        if (!$(this).hasClass('disable'))
                            carouselObj.carousel.trigger('next.owl.carousel');
                    });
                    self.$el.find(".upcomming-carousel-navigation .prev").click(function () {
                        if (!$(this).hasClass('disable'))
                            carouselObj.carousel.trigger('prev.owl.carousel');
                    });
                });

                this.registEvents();
            },

            checkSize: function () {
                var wWindow = $(window).width();
                if (wWindow >= this.tabletSize && wWindow < this.desktopSize) {
                    if (this.numberItems == 2) {
                        this.$el.find(".upcomming-carousel-navigation .next").addClass('hidden-field');
                        this.$el.find(".upcomming-carousel-navigation .prev").addClass('hidden-field');
                    }
                }
                else {
                    if (this.numberItems > 1) {
                        this.$el.find(".upcomming-carousel-navigation .next").removeClass('hidden-field');
                        this.$el.find(".upcomming-carousel-navigation .prev").removeClass('hidden-field');
                    }
                }
            },

            registEvents: function () {
                var _self = this;

                var timeout = null;
                $(window).on('resize', function () {
                    if (timeout)
                        clearTimeout(timeout);

                    timeout = setTimeout(function () {
                        clearTimeout(timeout);
                        _self.checkSize();
                    }, 200);
                });

                this.checkSize();
            },

            changePage: function (event) {
                if (!event.item.index) {
                    this.$el.find(".upcomming-carousel-navigation .prev").addClass('disable');
                }
                else {
                    this.$el.find(".upcomming-carousel-navigation .prev").removeClass('disable');
                }

                if (event.item.index && event.item.index > 0 && event.item.index + event.page.size >= event.item.count) {
                    this.$el.find(".upcomming-carousel-navigation .next").addClass('disable');
                }
                else {
                    this.$el.find(".upcomming-carousel-navigation .next").removeClass('disable');
                }
            },

            resizedCarousel: function () {

                $(document).trigger('upcomming-event-resized');
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
