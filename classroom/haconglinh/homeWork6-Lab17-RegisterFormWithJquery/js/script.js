(function ($) {

    //Hide all the alert
    $('.alert').hide();

    //Check valid user name
    $('#userName').blur(function () {

        if ($.trim($('#userName').val()).length < 6) {
            $('#userName').addClass('vibrate');
            $('#wrongUserName').show();
        } else {
            $('#wrongUserName').hide();
        }
    });

    //Check valid email
    $('#email').blur(function () {

        var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!filter.test($.trim($('#email').val()))) {
            $('#email').addClass('vibrate');
            $('#wrongEmail').show();
        } else {
            $('#wrongEmail').hide();
        }
    });

    //Check valid password
    $('#password').blur(function () {

        var filter = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))/;

        if (!filter.test($.trim($('#password').val()))) {
            $('#password').addClass('vibrate');
            $('#wrongPassword').show();
        } else {
            $('#wrongPassword').hide();
        }
    });

    //Check valid Re-Password
    $('#rePassword').blur(function () {

        if ($.trim($('#password').val()) !== $.trim($('#rePassword').val())) {
            $('#rePassword').addClass('vibrate');
            $('#wrongRePassword').show();
        } else {
            $('#wrongRePassword').hide();
        }
    });

    //Button Register
    $('#register').click(function () {

        if ($('.alert').is(':visible')) {
            alert("Wrong Syntax, please re-check back");
        } else {
            alert("Register sucessfull");
        }

    });

}(jQuery));