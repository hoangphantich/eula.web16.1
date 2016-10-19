define(['jquery', 'base/modules/custom_select_wrapper', 'base/modules/validator', 'base/modules/analytics', 'base/modules/animate'], function ($, customSelectWrapper, validator, analytic, animate) {
    var recaptcha1, recaptcha2;
    function initReCaptchar() {

        if (!window.reCaptchaIsReady) {
            var timeout = setTimeout(function () {
                clearTimeout(timeout);
                initReCaptchar();
            }, 1000);
            return;
        }

        if ($("#recaptcha1").length > 0)
            recaptcha1 = grecaptcha.render('recaptcha1', {
                'sitekey': $("#recaptcha1").attr('data-recaptcha')

            });

        if ($("#recaptcha2").length > 0)
            recaptcha2 = grecaptcha.render('recaptcha2', {
                'sitekey': $("#recaptcha2").attr('data-recaptcha')
            });
    }

    function addGoogleTagManager(event) {
        analytic[event]({});
    }

    function init(container) {
        initReCaptchar();
      

        if ($("#VehicleModel").length > 0 && $("#VehicleModel").val() == 0)
            $("#VehicleModel").attr("data-disabled", true);
        if ($("#Finance_VehicleModel").length > 0 && $("#Finance_VehicleModel").val() == 0)
            $("#Finance_VehicleModel").attr("data-disabled", true);

        customSelectWrapper.init(container);

        if ($("#VehicleBrand").length > 0)
            $("#VehicleBrand").change(function () {
                if ($("#VehicleBrand").val() != "") {
                    var CountryOptions = {};
                    CountryOptions.url = "/FinanceAndInsurance/VehicleModel";
                    CountryOptions.type = "POST";
                    CountryOptions.data = JSON.stringify({ BrandId: $("#VehicleBrand").val() });
                    CountryOptions.datatype = "json";
                    CountryOptions.contentType = "application/json";
                    CountryOptions.success = function (StatesList) {
                        $("#VehicleModel").empty();
                        $("#VehicleModel").append("<option value=\"\">Vehicle model</option>");
                        for (var i = 0; i < StatesList.length; i++) {
                            if (StatesList[i].Text != null)
                                $("#VehicleModel").append("<option value=\"" + StatesList[i].Value.ID + "\">" + StatesList[i].Text + "</option>");
                        }
                        $("#VehicleModel").attr("data-disabled", false);

                        customSelectWrapper.updateSelect($("#VehicleModel"));
                    };
                    CountryOptions.error = function (err) {
                        alert(err);
                    };
                    $.ajax(CountryOptions);
                }
                else {
                    $("#VehicleModel").empty();
                    $("#VehicleModel").append("<option value=\"\">Vehicle model</option>");
                    $("#VehicleModel").attr("data-disabled", true);
                    customSelectWrapper.updateSelect($("#VehicleModel"));
                }
            });

        if ($("#Finance_VehicleBrand").length > 0)
            $("#Finance_VehicleBrand").change(function () {
                if ($("#Finance_VehicleBrand").val() != "") {
                    var CountryOptions = {};
                    CountryOptions.url = "/FinanceAndInsurance/VehicleModel";
                    CountryOptions.type = "POST";
                    CountryOptions.data = JSON.stringify({ BrandId: $("#Finance_VehicleBrand").val() });
                    CountryOptions.datatype = "json";
                    CountryOptions.contentType = "application/json";
                    CountryOptions.success = function (StatesList) {
                        $("#Finance_VehicleModel").empty();
                        $("#Finance_VehicleModel").append("<option value=\"\">Vehicle model</option>");
                        for (var i = 0; i < StatesList.length; i++) {
                            if (StatesList[i].Text != null)
                                $("#Finance_VehicleModel").append("<option value=\"" + StatesList[i].Value.ID + "\">" + StatesList[i].Text + "</option>");
                        }
                        $("#Finance_VehicleModel").attr("data-disabled", false);
                        customSelectWrapper.updateSelect($("#Finance_VehicleModel"));
                    };
                    CountryOptions.error = function (err) {
                        alert(err);
                    };
                    $.ajax(CountryOptions);
                }
                else {
                    $("#Finance_VehicleModel").empty();
                    $("#Finance_VehicleModel").append("<option value=\"\">Vehicle model</option>");
                    $("#Finance_VehicleModel").attr("data-disabled", true);
                    customSelectWrapper.updateSelect($("#Finance_VehicleModel"));
                }
            });
        function htmlEscape(str) {
            return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
        }
        (function ($) {

            $.each($.validator.methods, function (key, value) {
                $.validator.methods[key] = function () {
                    if (arguments.length > 0) {
                        var el = $(arguments[1]);
                        el.val(htmlEscape($.trim(el.val())));
                    }

                    return value.apply(this, arguments);
                };
            });
        }(jQuery));
       
        validator.setDefaults({
            ignore: '*:not([name]), .input-hidden', //Fixes your name issue
            onkeyup: false,
            debug: true,
            onfocusout: function (element) {
                if ($(element).valid()) {
                    $(element).removeClass("invalid");
                    if ($(element).is('select')) {
                        $(element).parent().children('.selected-label').removeClass("invalid");
                    }
                }
            },
            focusInvalid: false,
            highlight: function (element, errorClass) {
                $(element).addClass("invalid");
                if ($(element).is('select')) {
                    $(element).parent().children('.selected-label').addClass("invalid");
                }
            },
            errorPlacement: function (error, element) {
                return true;
            },
            rules: {
                Email: {
                    required: true,
                    email: true
                },
                Tel: {
                    required: true,
                    digits: true
                },
                Miles: {
                    required: true,
                    digits: true
                },
                VehicleBrand: {
                    required: true
                },
                VehicleModel: {
                    required: true
                },
                VehicleType: {
                    required: true
                },
                DrivingExperience: {
                    required: true
                },
                hiddenRecaptcha: {
                    required: function () {
                        if (window.reCaptchaIsReady && grecaptcha.getResponse(recaptcha1) == '') {
                            if ($("#recaptcha1").children("span.messagefillCapcha").length==0)
                                $("#recaptcha1").append("<span class=\"messagefillCapcha\" style=\"color: red\">Fill the captchar</span>");
                            return true;
                        } else {
                                $("span.messagefillCapcha").remove();
                            return false;
                        }
                    }
                }
                ,hiddenRecaptcha2: {
                    required: function() {
                        if (window.reCaptchaIsReady && grecaptcha.getResponse(recaptcha2) == '') {
                            if ($("#recaptcha2").children("span.messagefillCapcha").length == 0)
                                $("#recaptcha2").append("<span class=\"messagefillCapcha\" style=\"color: red\">Fill the captchar</span>");
                            return true;
                        } else {
                            $("span.messagefillCapcha").remove();
                            return false;
                        }
                    }
                }
            },
            submitHandler: function (form) {
                var id = $(form).attr('id');
                var event = '';
                switch (id) {
                    case 'RenewInsuranceForm':
                        event = 'renew-insurance';
                        break;
                    case 'FinanceAndInsuranceForm':
                        event = 'renew-finance';
                        break;
                    case 'ContactUsForm':
                        event = 'send-enquiry';
                        break;
                    case 'BookServicesForm':
                        event = 'book-service';
                        break;
                    case 'BookTestDriveForm':
                        event = 'book-test-drive';
                        break;
                }

                if (event && event.length > 0) {
                    addGoogleTagManager(event);
                }

                $(form)[0].submit();
            },

            invalidHandler: function (event, validator) {
                animate($('body'), 'scroll', { offset: $(validator.errorList[0].element).offset().top - 60, duration: 500, easing: "easeInOutQuad" });
            }
        });

        

        $("#RenewInsuranceForm").validate({
            onfocusout: function (element) {
                if ($(element).valid()) {
                    $(element).removeClass("invalid");
                    if ($(element).is('select')) {
                        $(element).parent().children('.selected-label').removeClass("invalid");
                    }
                }
            }
        });

        $("#FinanceAndInsuranceForm").validate({
            onfocusout: function (element) {
                if ($(element).valid()) {
                    $(element).removeClass("invalid");
                    if ($(element).is('select')) {
                        $(element).parent().children('.selected-label').removeClass("invalid");
                    }
                }
            }
        });
        $("#BookTestDriveForm").validate({
            onfocusout: function (element) {
                if ($(element).valid()) {
                    $(element).removeClass("invalid");
                    if ($(element).is('select')) {
                        $(element).parent().children('.selected-label').removeClass("invalid");
                    }
                }
            }
        });

        $("#BookServicesForm").validate({
            onfocusout: function (element) {
                if ($(element).valid()) {
                    $(element).removeClass("invalid");
                    if ($(element).is('select')) {
                        $(element).parent().children('.selected-label').removeClass("invalid");
                    }
                }
            }
        });
        $("#ContactUsForm").validate({
            ignore: ".input-hidden textarea",
            onfocusout: function (element) {
                if ($(element).valid()) {
                    $(element).removeClass("invalid");
                    if ($(element).is('select')) {
                        $(element).parent().children('.selected-label').removeClass("invalid");
                    }
                }
            }
        });
        function isExternal(url) {
            var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
            if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
            if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host) return true;
            return false;
        }
        //$("#button-done-submit").on("click", function() {
        //    //var previousLink = window.history.go(-2);
        //    //if (isExternal(previousLink))
        //        window.Location.href = "/";
        //    //else {
        //    //    window.history.go(-2);
        //    //}


        //});
        
    }

    return {
        init: function (container) {
            init(container);
        }
    };
});