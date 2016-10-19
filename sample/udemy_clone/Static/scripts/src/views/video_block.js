define(['jquery', 'underscore', 'backbone', 'videojs'], function ($, _, backbone, videojs) {

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

            initialize: function () {
                this.initVideo();
            },

            initVideo: function () {
                var self = this;
                var videos = this.$el.find('video');
                var isInit = false;
                for (var i = 0; i < videos.length; i++) {
                    (
                        function (i) {
                            var videoPlayer = videojs(videos.eq(i).get(0), {
                                loop: true,
                                autoplay: true
                            }, function () {
                                this.on('loadedmetadata', function () {
                                    if (!isInit) {
                                        isInit = true;

                                        var videoObj = self.$el.find('video').eq(i);
                                        self.videoSize.width = videoObj.get(0).videoWidth;
                                        self.videoSize.height = videoObj.get(0).videoHeight;
                                        self.setSizeVideo();
                                        self.regisEventForVideo();
                                    }
                                });
                            });
                        }
                    )(i);
                }
            },

            setSizeVideo: function () {
                var self = this;
                var changeSizeVideo = _.debounce(function () {
                    var wrapperWidth = self.$el.width();
                    var wrapperHeight = self.$el.height();

                    self.$el.find('video').parent().css({
                        width: '100%',
                        height: '100%'
                    });

                    if (wrapperWidth / wrapperHeight > self.videoSize.width / self.videoSize.height) {
                        self.$el.find('video').css({
                            width: '100%',
                            height: 'auto',
                            opacity: 1
                        });
                    } else {
                        self.$el.find('video').css({
                            height: '100%',
                            width: 'auto',
                            opacity: 1
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
