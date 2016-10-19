define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	var $win = $(window);

	return function Breakpoints(eventDispatcher, opts) {

		var self = this;

		var options = _.extend({
        	breakpoints: [
	            { min: 480, name: 'small' },
	            { min: 640, name: 'medium' },
	            { min: 1024, name: 'large' },
	            { min: 1200, name: 'xlarge' }
	        ]
		}, opts);

		var activeBreakpoint;
		var prevBreakpoint;
		var mqLists = [];

		function init() {

			addBreakpoint({ min: 0, name: 'base' });
			options.breakpoints = processBreakpoints(options.breakpoints);

			checkActiveBreakpoint();

			$win.on('orientationchange', checkActiveBreakpoint);

			prevBreakpoint = self.getActiveBreakpoint();
		}

		function addBreakpoint(breakpoint) {

			if (breakpoint.hasOwnProperty('min') && !self.getBreakpoint(breakpoint.min)) {
				options.breakpoints.push(breakpoint);

				return true;
			}
		}

		function processBreakpoints(breakpoints) {

			mqLists.forEach(removeMediaListener);
			mqLists = [];

			return breakpoints.sort(sortBreakpoints).map(function (breakpoint, i) {

				if(i < breakpoints.length - 1) {
					breakpoint.max = breakpoints[i + 1].min - 1;
				}

				mqLists.push(addMediaListener(breakpoint));

				return breakpoint;
			});
		}

		function checkMedia(breakpoint) {

			if (getMedia(breakpoint).matches) {
				return breakpoint;
			}
		}

		function addMediaListener(breakpoint, index) {

			var mqList = getMedia(breakpoint);
			mqList.breakpoint = breakpoint;
			mqList.addListener(matchBreakpoint);

			return mqList;
		}

		function removeMediaListener(mqList) {

			mqList.removeListener(matchBreakpoint);
		}

		function matchBreakpoint(evt) {

			if (evt.matches) {
				setActiveBreakpoint(evt.breakpoint || evt.currentTarget.breakpoint);
			}
		}

		function sortBreakpoints(a, b) {

			return a.min - b.min;
		}

		function getMedia(breakpoint) {

			var mq = 'screen and (min-width:' + breakpoint.min + 'px)';

			if(breakpoint.max) {
				mq += ' and (max-width:' + breakpoint.max + 'px)';
			}

			return window.matchMedia(mq);
		}

		function setActiveBreakpoint(breakpoint) {

			if (breakpoint != activeBreakpoint) {
				prevBreakpoint = activeBreakpoint;
				activeBreakpoint = breakpoint;

				eventDispatcher.trigger('change.Breakpoints', activeBreakpoint, prevBreakpoint);
			}
		}

        function checkActiveBreakpoint() {

			var matchArr = options.breakpoints.filter(checkMedia);
			setActiveBreakpoint(matchArr[0]);
		}

		this.matchCurrentBreakpoint = function (breakpoints) {

			return breakpoints.sort(sortBreakpoints).reduce(function (matchBreakpoint, breakpoint) {
				return (activeBreakpoint.min >= breakpoint.min) ? breakpoint : matchBreakpoint;
			}.bind(this), breakpoints[0]);

		}.bind(this);

		this.getActiveBreakpoint = function () {

			return activeBreakpoint;
		}

		this.getBreakpoint = function (value) {

			return options.breakpoints.filter(function (breakpoint) {
				if (breakpoint.name === value || breakpoint.min === value) return breakpoint;
			})[0];
		}

		this.getBreakpoints = function () {

			return options.breakpoints;
		}

		this.getPrevBreakpoint = function () {

			return prevBreakpoint;
		}

		this.setBreakpoint = function (breakpoint) {

			if(addBreakpoint(breakpoint)) {
				options.breakpoints = processBreakpoints(options.breakpoints);
			}

			return this.getActiveBreakpoint();
		}

		this.setBreakpoints = function (breakpoints) {

			breakpoints.forEach(addBreakpoint);
			options.breakpoints = processBreakpoints(options.breakpoints);

			return this.getActiveBreakpoint();
		}

		this.destroy = function () {

		    $win.off('orientationchange', checkActiveBreakpoint);

		    mqLists.forEach(removeMediaListener);
		    mqLists = [];
		}

		init();
	};

});
