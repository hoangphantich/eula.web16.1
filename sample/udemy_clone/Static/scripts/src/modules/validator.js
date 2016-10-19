define(['jquery', 'vendor/jquery.validate', 'vendor/jquery.validate.additional'], function ($) {

	'use strict';

	$.extend($.validator.messages, {
		accept: "Please choose a valid file.",
		extension: "Please choose a valid file."
	});

	$.validator.addMethod("email", function(val, el) {

	    if (val.length == 0) {
	    	return true;
	    }

		return this.optional(el) || /^[\S]{1,}@[\S]{1,}\.[\S]{1,}$/ig.test(val);
	}, 'Please enter a valid email address.');

	$.validator.addMethod("url", function(val, el) {

	    if (val.length == 0) {
	    	return true;
	    }

	    if(!(/^(https?|s?ftp):\/\//i.test(val))) {
	        val = 'http://'+val;
	    }

	   	var valid = this.optional(el) || /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ig.test(val);

		if(valid) {
			$(el).val(val);
		}

		return valid;
	}, 'Please enter a valid URL.');

	$.validator.addMethod("phone", function (val, el) {

		if(val.length == 0) {
			return true;
		}

		return this.optional(el) || /^[+]?([()]?[0-9][()]?\s?)+([()]?[0-9][()]?)$/gm.test(val);
		//return this.optional(el) || /^\S*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\S*$/gm.test(val);
	}, 'Please enter a valid phone number.');

	return $.validator;
});
