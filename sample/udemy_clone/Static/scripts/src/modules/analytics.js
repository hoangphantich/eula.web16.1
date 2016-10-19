define(['underscore'], function (_) {

    'use strict';

    var ANALYTICS_DICT = {
        'newsletter-subscription': {
            'Category': 'Newsletter Subscription'
        },
        /*
        'download-brochure': {
            'Category': 'Download Brochure'
        },
        */
        'renew-insurance': {
            'Category': 'Renew Insurance'
        },
        'renew-finance': {
            'Category': 'Renew Finance'
        },
        'send-enquiry': {
            'Category': 'Send Enquiry'
        },
        'book-service': {
            'Category': 'Book Service'
        },
        'book-test-drive': {
            'Category': 'Book Test Drive'
        }
    }

    function push(defaults, evt) {

        var data = _.extend(defaults, evt);

        console.log('dataLayer:', data);

        if (dataLayer) {
            dataLayer.push(data);
        }
    }

    function virtualPageview(url, title) {

        push({}, {
            'event': 'VirtualPageview',
            'virtualPageURL': url,
            'virtualPageTitle': title
        });
       
    }

    return _.extend({
        virtualPageview: virtualPageview
    }, Object.keys(ANALYTICS_DICT).reduce(function append(obj, key) {
        obj[key] = _.partial(push, _.extend({
            'event': key
        }, ANALYTICS_DICT[key]));

        return obj;
    }, {}));
});
