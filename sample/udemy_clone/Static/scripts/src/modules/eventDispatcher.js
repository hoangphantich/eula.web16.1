define(['backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return function eventDispatcher() {

		return _.clone(Backbone.Events);
	};

});
