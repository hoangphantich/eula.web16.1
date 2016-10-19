define(['jquery', 'underscore', 'backbone', 'base/modules/video_youtube_module', 'base/modules/eventDispatcher'], function ($, _, backbone, videoModule, eventDispatcher) {

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
            enablePlayVideo: true,
            events: {
                'click [data-youtube-button]': 'startVideo'
            },

            initialize: function () {
                this.options = {
                    playerClass: 'player-video'
                };

                this.localDispatcher = eventDispatcher();
                this.initVideo();
            },

            initVideo: function () {
                this.videoId = this.getYoutubeId(this.$('a').attr('href'));
                this.addVideoEvents();
            },

            addVideoEvents: function () {
                this.listenTo(this.localDispatcher, 'stateChange.Video', this.stateChange);
            },

            stateChange: function (evt, arg) {
            },

            startVideo: function (evt) {
                evt.preventDefault();

                if (!this.enablePlayVideo)
                    return;
                this.enablePlayVideo = false;

                videoModule.then(_.bind(this.loadVideo, this));
            },

            loadVideo: function (api) {
                this.$playerContainer = $('<div class="' + this.options.playerClass + '"></div>');
                this.$el.append(this.$playerContainer);

                return api.create(this.$playerContainer.get(0), {
                    height: '100%',
                    width: '100%',
                    videoId: this.videoId
                }, this.localDispatcher).then(_.bind(this.ready, this));
            },

            ready: function (player) {
                this.player = player;
            },

            removeVideo: function () {
                if (this.player) {
                    this.player.destroy();
                }
                this.$playerContainer.remove();
            },

            getYoutubeId: function (url) {

                var id = '';

                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

                if (url[2] !== undefined) {
                    id = url[2].split(/[^0-9a-z_\-]/i);
                    id = id[0];
                }
                else {
                    id = url;
                }

                return id;
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
