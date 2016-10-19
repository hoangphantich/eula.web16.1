define(['jquery'], function ($) {

    'use strict';

    return {
        isRtl: $('html').attr('dir') == 'rtl'
    };
});
