$("#Register").css("color", "lightgray");
//Generate password
var keylist = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
var tmp = '';

function generatePass(plength) {
    tmp = '';
    for (i = 0; i < plength; i++) {
        tmp += keylist.charAt(Math.floor(Math.random() * keylist.length))
    }
    return tmp;
}

function populateForm(enterLength) {
    if (document.mainForm.output.value = generatePass(enterLength)) {
        $("#rePassword").attr("disabled", "disabled");
        $("#rePassword").css("background", "gray");
    }
}

if ($("#password").keydown(function(event) {
        $("#rePassword").removeAttr("disabled");
        $("#rePassword").css("background", "black");
    }));




$("#myForm").submit(function(e) {
    e.preventDefault();


    var emailRex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    var errList = ["* Can not leave blank", "* Your email should follow the format name@domain.com", "* Your password should contains one of Uppaercases, !@#$%^&*()_+ and numbers", "* Password is not match"];
    var emailField = $("#email").val();
    var passwordField = $("#password").val();
    var rePassField = $("#rePassword").val();
    var regisBtn = $("#Register");

    var emailInput = $("#email");
    var passInput = $("#password");
    var rePassInput = $("rePassword");



    if (emailField.length == 0 || passwordField.length == 0) {
        $("#mailError").text(errList[0]);
        $("#mailError").addClass("invalid");
        emailInput.focus();

    } else if (!emailRex.test(emailField)) {
        $("#mailError").text(errList[1]);
        $("#mailError").addClass("invalid");
        passInput.focus();
    } else if (rePassField !== passwordField) {
        $("#mailError").text(errList[3])
        $("#mailError").addClass("invalid");
        rePassInput.focus();
    } else {
        messege = $('input[name=email]').val();
        console.log('You put: ' + messege);

        $("#Register").css("color", "cyan");
        $("#mailError").text("");
        var saveText = "processing...";
        var successText = "success!!!"
        $(regisBtn).val(saveText);

        setTimeout(function() {
            $(regisBtn).val(successText);

        }, 1800);

        setTimeout(function() {
            window.location.href = "form.html";
        }, 2000);
    }
});
