define(['jquery', 'underscore'], function ($, _) {

	'use strict';

    var callbackAfterLoaded = null;
	function findModules ($container, callback) {
	    callbackAfterLoaded = callback;
		return $container.find('[data-require]').toArray().map(function(item) {
		    return initModule($(item));
		});
	}

	function initModule ($el) {

		var deferred = $.Deferred(),
			regModule = $el.data('module'),
	        ref = $el.data('require');
	    
		if (!ref || ref.length == 0) {
		    deferred.resolve(false);
		}

		var resolveDefer = _.debounce(function (module) {
		    deferred.resolve(module);
	    }, 100);

        try {

        	if (regModule) {
        	    deferred.resolve(regModule);
        	}
        	else {

        	    requirejs([ref], function (module) {
		            module.init($el, true);
		            
		            $el.data('module', module);
        	        resolveDefer(module);
        	    });
        	}

        }
        catch(err) {
        	deferred.reject(err);
        }

        return deferred.promise();
	}

	function traceModules (deps) {

		$.when.apply(this, deps).done(function () {
		    //console.log('INFO: Modules loaded', Array.prototype.slice.call(arguments));
		    if (callbackAfterLoaded)
		        callbackAfterLoaded();
		});

		return deps;
	}

	return {
		findDeps: _.compose(traceModules, findModules)
	};
});



