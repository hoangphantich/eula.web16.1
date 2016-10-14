(function ($) {
    
    //Hide all the alert
    $('.alert').hide();
    
    var resultUserName, resultEmail, resultPassword, resultRePassword;

    function validUserName() {
        
        console.log($('userName').val());
        
        //console.log($.trim($('userName').val()));
//        
//        
//        if ($.trim($('userName').val()).length < 6) {
//            $('userName').addClass('vibrate');
//            $('#wrongUserName').show();
//        }else{
//            $('#wrongUserName').hide();
//        }
    }

    $('userName').blur(validUserName());
    
    
    function validEmail() {
        var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!filter.test(email.value)) {
            email.classList.add("vibrate");
            var alert = document.createElement('span');
            var textAlert = document.createTextNode("Wrong Email Syntax !!!");
            alert.setAttribute('class', 'help-block');
            alert.appendChild(textAlert);
            document.getElementById("formEmail").appendChild(alert);
            setTimeout(function () {
                email.classList.remove("vibrate");
            }, 250);
            setTimeout(function () {
                document.getElementById("formEmail").removeChild(alert);
            }, 1000);
            resultEmail = false;
        } else {
            resultEmail = true;
        }
    }

    $('email').blur(validEmail());
    
    
    function validPassword() {
        var filter = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))/;
        if (!filter.test(password.value)) {
            password.classList.add("vibrate");
            var alert = document.createElement('span');
            var textAlert = document.createTextNode("Wrong PassWord Syntax !!!");
            alert.setAttribute('class', 'help-block');
            alert.appendChild(textAlert);
            document.getElementById("formPassword").appendChild(alert);
            setTimeout(function () {
                password.classList.remove("vibrate");
            }, 250);
            setTimeout(function () {
                document.getElementById("formPassword").removeChild(alert);
            }, 1000);
            resultPassword = false;
        } else {
            resultPassword = true;
        }
    }

    function validRePassword() {
        if (rePassword.value !== document.getElementById("password").value) {
            rePassword.classList.add("vibrate");
            var alert = document.createElement('span');
            var textAlert = document.createTextNode("Two PassWord are not the same !!!");
            alert.setAttribute('class', 'help-block');
            alert.appendChild(textAlert);
            document.getElementById("formRePassword").appendChild(alert);
            setTimeout(function () {
                password.classList.remove("vibrate");
            }, 250);
            setTimeout(function () {
                document.getElementById("formRePassword").removeChild(alert);
            }, 1000);
            document.getElementById("password").focus();
            resultRePassword = false;
        } else {
            resultRePassword = true;
        }
    }

    function register() {
        if ((resultUserName === false) || (resultEmail === false) || (resultPassword === false) || (resultRePassword === false)) {
            alert("Wrong Syntax, please check back");
        } else {
            window.location.replace("result.html");
        }
    }
}(jQuery));