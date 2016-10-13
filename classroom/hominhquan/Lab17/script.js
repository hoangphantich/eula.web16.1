var regexName = /^[a-zA-Z]{6,}$/;
var regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

var keylist = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
var tmp = '';

var keylength = keylist.length;

var uname = $("#uname");
var email = $("#email");
var pass = $("#pass");
var plength = $('#passLength');
var repass = $("#repass");

var flag = false;

function generatepass(){
	tmp = '';
	for (var i = 0; i < plength.val(); i++) {
		tmp += keylist.charAt(Math.floor(Math.random()*keylength));
	}
	return tmp;
}

function populateform(){
	var passGen = generatepass();
	pass.val(passGen);
	repass.val(passGen);
	repass.prop("disabled", true);
}

function register(){

	if (!regexName.test(uname.val())) {
		assignShake(uname);
		$('#uname_message').slideDown({ opacity: "show" });
		flag = false;
	} else {
		$('#uname_message').slideUp();
		flag = true;
	}

	if (!regexEmail.test(email.val())) {
		assignShake(email);
		$('#email_message').slideDown({ opacity: "show"});
		flag = false;
	} else {
		$('#email_message').slideUp();
		flag = true;
	}

	if (pass.val() !== repass.val()) {
		assignShake(repass);
		$('#repass_message').slideDown({ opacity: "show"});
		flag = false;
	} else {

		if (pass.val().length > 0 && repass.val().length > 0) {
			$('#repass_message').slideUp();
			flag = true;
		} else {
			flag = false;
		}
	}

	if (flag) {
		$('#success_message').slideDown({ opacity: "show" }, "slow");
		setTimeout(function(){ alert("Register successful"); }, 3000);
	}

	function assignShake(control){
		if (control.hasClass("invalid")) {
			control.removeClass("invalid");
		} else {
			control.addClass("invalid");
		}
	}
}