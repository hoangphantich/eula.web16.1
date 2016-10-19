define(['jquery', 'underscore', 'base/modules/jitRequire', 'vendor/fastclick', 'base/modules/page-scroll-animation','vendor/picturefill'],
    function ($, _, jitRequire, fastClick, pageScrollAnimation) {
        'use strict';
        fastClick.attach(document.body);

        jitRequire.findDeps($(document));

        pageScrollAnimation.init($(document));
    });