
define(['jquery', 'underscore', 'backbone', 'vendor/history', 'base/modules/jitRequire'], function ($, _, backbone, history, jitRequire) {

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
            stateIndex: 0,
            currentUrl: "",
            collectionPages: new Array(),
            target: '',

            initialize: function () {
                if (this.$el.parents('.brand-tabs__container').css('display') == 'none')
                    return;

                this.registerHistory();
                this.target = this.$el.attr('data-container');
                var currentTabUrl = this.getHrefCurrentTab();
                var matches = $('head').html().match(/<title>(.*?)<\/title>/);
                var title = matches[1];

                $('#' + this.target).children().eq(0).attr('data-url', currentTabUrl);
                this.collectionPages.push({
                    key: currentTabUrl,
                    title: title
                });

                var _self = this;
                this.$el.find('a').on('click', function (e) {
                    e.preventDefault();
                    var href = $(this).attr('href');

                    var _this = this;
                    _self.loadPage(href, function (title) {
                        _self.currentUrl = _self.getFullUrl(href);
                        _self.setActiveTab(_self.currentUrl);

                        History.pushState({ state: _self.stateIndex++ }, title, href);
                    });
                });
            },

            // register events for change url when back by browser, need to check when changing url by code
            registerHistory: function () {
                var _self = this;

                History.Adapter.bind(window, 'statechange', function () {
                    var state = History.getState();
                    var isSameUrl = false;

                    if (_self._sameUrl(state.url, _self.currentUrl)) {
                        isSameUrl = true;
                    }

                    if (!isSameUrl) {
                        _self.loadPage(state.url, function () {
                            _self.currentUrl = state.url;
                            _self.setActiveTab(_self.currentUrl);
                        });
                    }
                });
            },

            _sameUrl: function (url1, url2) {
                if (!url1 || !url2)
                    return false;
                if (url1.length >= url2.length) {
                    if (url1.lastIndexOf(url2) == url1.length - url2.length)
                        return true;
                }
                else {
                    if (url2.lastIndexOf(url1) == url2.length - url1.length)
                        return true;
                }

                return false;
            },

            setActiveTab: function (href) {
                this.$el.find('a').removeClass('active');

                var listLinks = this.$el.find('a');
                for (var i = 0; i < listLinks.length; i++) {
                    var tabUrl = this.getFullUrl(listLinks.eq(i).attr('href'))
                    if (this._sameUrl(href, tabUrl)) {
                        listLinks.eq(i).addClass('active');
                        if (listLinks.eq(i).attr('data-model').toLowerCase() == "true") {
                            listLinks.eq(i).parents('.brand-container').addClass('brand-tab__container_model');
                        }
                        else {
                            listLinks.eq(i).parents('.brand-container').removeClass('brand-tab__container_model');
                        }
                        break;
                    }
                }
            },

            loadPage: function (href, callback) {
                for (var i = 0; i < this.collectionPages.length; i++) {
                    if (this._sameUrl(this.collectionPages[i].key, this.getFullUrl(href))) {
                        this.hideCurrentPage();
                        this.showDestinationPage('', this.getFullUrl(href), true);
                        if (callback)
                            callback(this.collectionPages[i].title);
                        return;
                    }
                }

                this.loadAjax(href, callback);
            },

            loadAjax: function (href, callback) {
                this.showLoading();

                var _self = this;
                $.ajax({
                    url: href,
                    method: 'GET',
                    async: true,
                    cache: false,
                    success: function (html) {
                        var inputTitle = $("<div>" + html + "</div>").find('input[name="title"]');
                        var title = inputTitle && inputTitle.length > 0 ? inputTitle.val() : "";

                        _self.collectionPages.push({
                            key: _self.getFullUrl(href),
                            title: title
                        });

                        _self.hideCurrentPage();
                        _self.showDestinationPage(html, _self.getFullUrl(href));

                        if (callback)
                            callback(title);
                    },
                    error: function (error) {
                    }
                });
            },

            getFullUrl: function (href) {
                if (href.indexOf(window.location.host) < 0)
                    return window.location.protocol + "//" + window.location.host + href;
                return href;
            },

            getHrefCurrentTab: function () {
                var listAs = this.$el.find('a');
                for (var i = 0; i < listAs.length; i++) {
                    if (listAs.eq(i).hasClass('active')) {
                        return this.getFullUrl(listAs.eq(i).attr('href'));
                    }
                }

                return null;
            },

            showLoading: function () {
                this.hideCurrentPage();
                if (!this.isAddedLoading) {
                    var html = "<div class='brand-loading-container'><img src='/img/loading.gif' alt='' /></div>";
                    $('#' + this.target).append(html);
                }
                else {
                    $('#' + this.target).children('.brand-loading-container').css('display', 'block');
                }
            },

            hideCurrentPage: function () {
                $('#' + this.target).children().css('display', 'none');
            },

            showDestinationPage: function (html, href, notLoadJs) {
                if (!notLoadJs) {
                    $('#' + this.target).append('<div data-url="' + href + '">' + html + '</div>');
                    this.collectionPages.push({

                    });
                    this.loadDependJavascript($('#' + this.target).children().last());
                }
                else {
                    $('#' + this.target).children('[data-url="' + href + '"]').css('display', 'block');
                }
            },

            loadDependJavascript: function (container) {
                jitRequire.findDeps(container);
            }
        });
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});
