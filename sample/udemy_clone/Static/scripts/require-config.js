(function (root, factory) {
	'use strict';
	var requireJsShim = {
		cache: null,
		config: function (config) {
			if (config)
				this.cache = config;
			return this.cache;
		}
	};
	if (typeof define === 'function' && define.amd && typeof requirejs !== 'undefined') {
		factory(requirejs);
	} else if (typeof exports === 'object') {
		var config = factory(requireJsShim).config();
		module.exports = config;
	}
}(this, function (requirejs) {
	'use strict';
	requirejs.config({
		baseUrl: '/../js/',
		paths: {
			base: 'src',
			jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
			//videojs: 'http://vjs.zencdn.net/4.12/video',
			underscore: 'lib/bower/underscore',
			backbone: 'lib/bower/backbone',
			vendor: 'lib/bower',
			templates: 'templates',
			pikaday: 'lib/pikaday',
			//moment: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min'
		},
		map: {
		    '*': {
		        'handlebars': 'vendor/handlebars',
		        'velocity': 'vendor/velocity'
		    }
		},
		shim: {
		    'vendor/handlebars': {
		        exports: 'Handlebars'
		    },
		    'lib/owl.carousel': {
		        exports: 'jQuery.fn.owlCarousel',
		        deps: [
		            'jquery'
		        ]
		    },
		    'lib/pikaday.jquery': {
		        deps: [
                    'jquery',
                    'moment'
		        ]
		    },
		    'lib/jquery.fancybox': {
		        deps: [
                    'jquery'
		        ]
		    }
		}
	});
	return requirejs;
}));
