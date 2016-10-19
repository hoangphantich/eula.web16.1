define(['jquery', 'underscore', 'backbone', 'base/modules/carousel-slider', 'videojs', 'base/modules/window-onload'], function ($, _, backbone, carouselSlider, videojs, windowOnload) {

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
            videoSize: {
                width: 0,
                height: 0
            },
            videoPlayers: new Array(),
            mainCarousel: null,
            thumbnailCarousel: null,

            initialize: function () {
                windowOnload().then(_.bind(this.initSlider, this));
            },

            /**-- Initialize for slider ---**/
            // main slider
            initSlider: function () {
                this.numberItems = this.$el.find('.main-slider__item').length;
                var isLoop = this.numberItems > 1;

                var option = {
                    items: 1,
                    loop: isLoop,
                    autoplayTimeout: this.$el.attr("data-slider-speed") ? parseFloat(this.$el.attr("data-slider-speed")) * 1000 : 15000,
                    mouseDrag: false,
                    autoplay: false,
                    dots: false,
                    nav: true,
                    navText: ['<i class="fa fa-angle-left">&nbsp;</i>', '<i class="fa fa-angle-right">&nbsp;</i>'],

                    onInitialized: _.bind(this.carouselInitialized, this),
                    onChange: _.bind(this.carouselChange, this),
                    onChanged: _.bind(this.carouselChanged, this)
                };

                this.mainCarousel = carouselSlider.init(this.$el.find('#main-slider'), option);

                if (this.numberItems > 1) {
                    this.$el.find("#thumbnail-slider").removeClass('hidden');
                    this.initSliderThumbnail();
                } else {
                    this.$el.find("#thumbnail-slider").addClass('hidden');
                }
            },

            // thumbnail slider
            initSliderThumbnail: function () {
                var option = {
                    responsive: {
                        0: {
                            items: 4,
                            margin: 5
                        },
                        480: {
                            items: 4,
                            margin: 10
                        },
                        768: {
                            items: 4,
                            margin: 10
                        },
                        992: {
                            items: 6,
                            margin: 10
                        },
                        1200: {
                            items: 8,
                            margin: 10
                        }
                    },
                    dots: false,
                    nav: true,
                    loop: false,
                    navText: ['<i class="fa fa-angle-left">&nbsp;</i>', '<i class="fa fa-angle-right">&nbsp;</i>'],

                    onInitialized: _.bind(this.carouselThumbnailInitialized, this),
                    onResized: _.bind(this.carouselThumbnailResize, this)
                };

                this.thumbnailCarousel = carouselSlider.init(this.$el.find('#thumbnail-slider'), option);
                this.carouselThumbnailResize();
            },

            carouselInitialized: function (event) {
                this.initVideo();
            },

            carouselThumbnailInitialized: function (event) {

                var self = this;
                $(event.currentTarget).find(".owl-item").eq(0).addClass('current-slide').siblings().removeClass('current-slide');
                var listItems = $(event.currentTarget).find(".owl-item");
                for (var i = 0; i < listItems.length; i++) {
                    (function (item, index) {
                        item.on('click', function (el) {
                            el.preventDefault();
                            self.mainCarousel.carousel.trigger('to.owl.carousel', [index, 250, true]);
                            $(this).addClass('current-slide').siblings().removeClass('current-slide');
                        });
                    })(listItems.eq(i), i);
                }

                this.carouselThumbnailResize();
            },

            carouselThumbnailResize: function (event) {
                var widthWin = $(window).width();
                if (widthWin >= 1200) {
                    if (this.numberItems <= 8) {
                        this._hideNavigationThumbnail();
                    }
                }
                else if (widthWin >= 992) {
                    if (this.numberItems <= 6) {
                        this._hideNavigationThumbnail();
                    }
                    else {
                        this._displayNavigationThumbnail();
                    }
                }
                else {
                    if (this.numberItems <= 4) {
                        this._hideNavigationThumbnail();
                    }
                    else {
                        this._displayNavigationThumbnail();
                    }
                }
            },

            _hideNavigationThumbnail: function () {
                if (this.thumbnailCarousel) {
                    $(this.thumbnailCarousel.carousel).find('.owl-nav').addClass('hidden');
                }
            },

            _displayNavigationThumbnail: function () {
                if (this.thumbnailCarousel) {
                    $(this.thumbnailCarousel.carousel).find('.owl-nav').removeClass('hidden');
                }
            },

            carouselChange: function (event) {
                if (this.videoPlayers != null && this.videoPlayers.length > 0 && this.videoPlayers[event.item.index] != null && this.videoPlayers[event.item.index].readyState()) {
                    var videoObj = this.$el.find('.owl-item').eq(event.item.index).find('video').eq(0);
                    videoObj.css('opacity', 0);
                    this.videoPlayers[event.item.index].pause();
                }
            },

            carouselChanged: function (event) {
                var current = event.item.index;
                if (current == null) {
                    current = 0;
                }
                else {
                    var numberItems = event.item.count;
                    if (current < Math.round(numberItems / 2)) {
                        current = current + Math.floor(numberItems / 2);
                    }
                    else if (current < Math.round(numberItems / 2) + numberItems) {
                        current = current - Math.round(numberItems / 2);
                    }
                    else {
                        current = current - Math.round(numberItems / 2) - numberItems;
                    }
                }
                if (this.thumbnailCarousel) {
                    this.thumbnailCarousel.carousel.trigger('to.owl.carousel', [current, 250, true]);
                    $(this.thumbnailCarousel.carousel).find(".owl-item").eq(current).addClass('current-slide').siblings().removeClass('current-slide');
                }

                if (event && event.item && event.item.index != null && event.item.index >= 0) {
                    if (this.videoPlayers != null && this.videoPlayers.length > 0 && this.videoPlayers[event.item.index] != null && this.videoPlayers[event.item.index].readyState()) {
                        var videoObj = this.$el.find('.owl-item').eq(event.item.index).find('video').eq(0);
                        videoObj.css('opacity', 1);
                        this.videoPlayers[event.item.index].play();
                    }
                }
            },


            /**-- Initialize for videos in slider ---**/

            _getIndexCarousel: function () {
                return this.$el.find('.owl-item').index(this.$el.find('.owl-item.active').eq(0));
            },

            initVideo: function () {
                var self = this;
                var listSliders = this.$el.find('.owl-item');
                var isInit = false;
                for (var i = 0; i < listSliders.length; i++) {
                    (
                        function (i) {
                            var video = listSliders.eq(i).find('video');

                            var videoPlayer = null;
                            if (video && video.length > 0) {
                                videoPlayer = videojs(video.get(0), {
                                    loop: true
                                }, function () {
                                    this.on('loadedmetadata', function () {
                                        if (!isInit) {
                                            isInit = true;

                                            self.videoSize.width = video.get(0).videoWidth;
                                            self.videoSize.height = video.get(0).videoHeight;
                                            self.setSizeVideo();
                                            self.regisEventForVideo();

                                        }

                                        // Auto play the video if it is in the selected slide
                                        var selectIndex = self._getIndexCarousel();
                                        if (selectIndex == i) {
                                            video.css('opacity', 1);
                                            self.videoPlayers[i].play();
                                        }
                                    });
                                });

                            }
                            self.videoPlayers.push(videoPlayer);
                        }
                    )(i);
                }
            },

            setSizeVideo: function () {
                var self = this;
                var changeSizeVideo = _.debounce(function () {
                    var wrapperWidth = self.$el.find('.header-slider__item__video').width();
                    var wrapperHeight = self.$el.find('.header-slider__item__video').height();

                    self.$el.find('video').parent().css({
                        width: '100%',
                        height: '100%'
                    });

                    if (wrapperWidth / wrapperHeight > self.videoSize.width / self.videoSize.height) {
                        self.$el.find('video').css({
                            width: '100%',
                            height: 'auto'
                        });
                    } else {
                        self.$el.find('video').css({
                            height: '100%',
                            width: 'auto'
                        });
                    }
                }, 50);

                changeSizeVideo();
            },

            regisEventForVideo: function () {
                $(window).on('resize', _.bind(this.setSizeVideo, this));
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
