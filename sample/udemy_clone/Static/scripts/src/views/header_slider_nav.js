define(['jquery', 'underscore', 'backbone', 'base/modules/carousel-slider', 'base/modules/animate', 'videojs', 'base/modules/window-onload'], function ($, _, backbone, carouselSlider, animate, videojs, windowOnload) {

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
            carousel: null,

            initialize: function () {
                windowOnload().then(_.bind(this.initSlider, this));
            },

            /**-- Initialize for slider ---**/
            initSlider: function () {
                this.isLoop = this.$el.attr("data-slider-loop") && this.$el.attr("data-slider-loop") != "" ? this.$el.attr("data-slider-loop") == "true" ? true : false : false;
                var option = {
                    items: 1,
                    smartSpeed: 250,
                    loop: this.isLoop,
                    autoplayTimeout: this.$el.attr("data-slider-speed") ? parseFloat(this.$el.attr("data-slider-speed")) * 1000 : 15000,
                    mouseDrag: false,
                    autoplay: true,
                    dots: false,
                    navText: ['<i class="fa fa-angle-left">&nbsp;</i>', '<i class="fa fa-angle-right">&nbsp;</i>'],
                    nav: true,

                    onInitialized: _.bind(this.carouselInitialized, this),
                    onChange: _.bind(this.carouselChange, this),
                    onChanged: _.bind(this.carouselChanged, this)
                };

                var sliderItems = this.$el.find('.header-slider__item');
                for (var i = 1; i < sliderItems.length; i++) {
                    sliderItems.eq(i).find('.header-slider__item__text').css('display', 'none');
                }

                this.carousel = carouselSlider.init(this.$el, option);
            },

            carouselInitialized: function (event) {
                $(event.target).find('.owl-item .header-slider__item__text').css('display', 'none');

                var text = $(event.target).find('.owl-item').eq(event.item.index).find('.header-slider__item__text');
                animate(text, 'fadeIn', { duration: 0, easing: "easeInOutQuad", delay: 0 }).then(function () {
                    animate(text.find('h3'), 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 250 });
                    animate(text.find('p'), 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 500 });
                    animate(text.find('.header-button-container'), 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 750, display: 'inline-block' });
                });

                this.changePostionOfPagingForMobile(event);

                this.initVideo();
            },

            _hideTextInSlide: function (text) {
                var h3 = text.find('h3');
                var p = text.find('p');
                var buttons = text.find('.header-button-container');

                if (h3 && h3.length > 0 && p && p.length > 0 && buttons && buttons.length > 0) {

                    $.when(animate(h3, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' }),
                    animate(p, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' }),
                    animate(buttons, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'inline-block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
                else if (h3 && h3.length > 0 && p && p.length > 0) {

                    $.when(animate(h3, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' }),
                    animate(p, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
                else if (h3 && h3.length > 0 && buttons && buttons.length > 0) {

                    $.when(animate(h3, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' }),
                    animate(buttons, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'inline-block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
                else if (p && p.length > 0 && buttons && buttons.length > 0) {

                    $.when(animate(p, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' }),
                    animate(buttons, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'inline-block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
                else if (h3 && h3.length > 0) {

                    $.when(animate(h3, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
                else if (p && p.length > 0) {
                    $.when(animate(p, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
                else if (buttons && buttons.length > 0) {
                    $.when(animate(buttons, { opacity: 0 }, { duration: 250, easing: "easeInOutQuad", display: 'block' })
                    ).then(function () {
                        animate(text, 'fadeOut', { duration: 0, easing: "easeInOutQuad", display: 'none' });
                    });
                }
            },

            _showTextInSlide: function (text, event) {
                var self = this;
                var h3 = text.find('h3');
                var p = text.find('p');
                var buttons = text.find('.header-button-container');

                if (h3 && h3.length > 0 && p && p.length > 0 && buttons && buttons.length > 0) {

                    $.when(animate(h3, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 250 }),
                    animate(p, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 500 }),
                    animate(buttons, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 750, display: 'inline-block' })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });
                }
                else if (h3 && h3.length > 0 && p && p.length > 0) {

                    $.when(animate(h3, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 250 }),
                    animate(p, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 500 })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });
                }
                else if (h3 && h3.length > 0 && buttons && buttons.length > 0) {

                    $.when(animate(h3, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 250 }),
                    animate(buttons, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 750, display: 'inline-block' })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });
                }
                else if (p && p.length > 0 && buttons && buttons.length > 0) {

                    $.when(animate(p, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 500 }),
                    animate(buttons, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 750, display: 'inline-block' })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });

                }
                else if (h3 && h3.length > 0) {
                    $.when(animate(h3, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 250 })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });

                }
                else if (p && p.length > 0) {
                    $.when(animate(p, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 500 })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });

                }
                else if (buttons && buttons.length > 0) {
                    $.when(animate(buttons, 'transition.slideUpIn', { duration: 500, easing: "easeInOutQuad", delay: 750, display: 'inline-block' })
                    ).then(function () {
                        //self.changePostionOfPagingForMobile(event);
                    });
                }
            },

            carouselChange: function (event) {
                if (this.videoPlayers != null && this.videoPlayers.length > 0 && this.videoPlayers[event.item.index] != null && this.videoPlayers[event.item.index].readyState()) {
                    var videoObj = this.$el.find('.owl-item').eq(event.item.index).find('video').eq(0);
                    videoObj.css('opacity', 0);
                    this.videoPlayers[event.item.index].pause();

                    if (this.isLoop) {
                        if (this.videoPlayers.length > event.item.index + this.numberItems && this.videoPlayers[event.item.index + this.numberItems] != null && this.videoPlayers[event.item.index + this.numberItems].readyState()) {
                            var videoObj = this.$el.find('.owl-item').eq(event.item.index + this.numberItems).find('video').eq(0);
                            videoObj.css('opacity', 0);
                            this.videoPlayers[event.item.index + this.numberItems].pause();
                        }

                        if (event.item.index - this.numberItems >= 0 && this.videoPlayers[event.item.index - this.numberItems] != null && this.videoPlayers[event.item.index - this.numberItems].readyState()) {
                            var videoObj = this.$el.find('.owl-item').eq(event.item.index - this.numberItems).find('video').eq(0);
                            videoObj.css('opacity', 0);
                            this.videoPlayers[event.item.index - this.numberItems].pause();
                        }
                    }
                }

                var text = $(event.target).find('.owl-item').eq(event.item.index).find('.header-slider__item__text');
                this._hideTextInSlide(text);

                if (this.isLoop) {
                    if (this.videoPlayers.length > event.item.index + this.numberItems) {
                        var text1 = $(event.target).find('.owl-item').eq(event.item.index + this.numberItems).find('.header-slider__item__text');
                        this._hideTextInSlide(text1);
                    }

                    if (event.item.index - this.numberItems >= 0) {
                        var text1 = $(event.target).find('.owl-item').eq(event.item.index - this.numberItems).find('.header-slider__item__text');
                        this._hideTextInSlide(text1);
                    }
                }

                //this.hidePagingForMobile();
            },

            carouselChanged: function (event) {
                if (event && event.item && event.item.index != null && event.item.index >= 0) {
                    var self = this;
                    //self.changePostionOfPagingForMobile(event);
                    var text = $(event.target).find('.owl-item').eq(event.item.index).find('.header-slider__item__text');
                    animate(text, 'fadeIn', { duration: 0, easing: "easeInOutQuad", delay: 0 }).then(function () {
                        self._showTextInSlide(text, event);
                    });

                    if (this.videoPlayers != null && this.videoPlayers.length > 0 && this.videoPlayers[event.item.index] != null && this.videoPlayers[event.item.index].readyState()) {
                        var videoObj = this.$el.find('.owl-item').eq(event.item.index).find('video').eq(0);
                        videoObj.css('opacity', 1);
                        this.videoPlayers[event.item.index].play();
                    }
                }
            },

            carouselResized: function (event) {
                this.changePostionOfPagingForMobile(event);
            },

            hidePagingForMobile: function () {
                if (this.$el.find('.header-slider__item__text').css('position') != 'absolute') {
                    this.$el.find('.owl-nav').css({ 'display': 'none', 'visibility': 'hidden' });
                }
            },
            changePostionOfPagingForMobile: function (event) {
                var sliderItems = this.$el.find('.header-slider__item');
                var display = "block";
                if (sliderItems && sliderItems.length <= 1)
                    display = "none";

                if (this.$el.find('.header-slider__item__text').css('position') == 'absolute') {
                    this.$el.find('.owl-nav').css({
                        bottom: "auto",
                        top: "50%",
                        display: display,
                        visibility: 'visible'
                    });
                    return;
                }

                var activeItem = $(event.target).find('.owl-item').eq(event.item.index);
                //var textItem = (activeItem && activeItem.length > 0) ? activeItem.find('.header-slider__item__text') : null;
                //if (textItem && textItem.length > 0) {
                //    var bottom = textItem.outerHeight();
                //    this.$el.find('.owl-nav').css({
                //        bottom: (bottom + 15) + 'px',
                //        top: "auto"
                //    });

                //    var _self = this;
                //    var timeout = setTimeout(function () {
                //        _self.$el.find('.owl-nav').css({
                //            display: display,
                //            visibility: 'visible'
                //        });
                //    }, 500);
                //}
                var image = (activeItem && activeItem.length > 0) ? activeItem.find('img') : null;
                if (image && image.length > 0) {
                    var top = image.outerHeight();
                    this.$el.find('.owl-dots').css({
                        top: (top - 15 - 30 - 10) + 'px'
                    });

                    var _self = this;
                    var timeout = setTimeout(function () {
                        _self.$el.find('.owl-dots').css({
                            display: display,
                            visibility: 'visible'
                        });
                    }, 500);
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
