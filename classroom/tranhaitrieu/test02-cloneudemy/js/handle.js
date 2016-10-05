function checklogin(email,pass){
 	var mail= email;
 	var pass = pass;
 	console.log(email);
 	$.getJSON("js/info_user.json", function(json) {
 		for(var i=0; i< json.name.length;i++){
 			if(mail==json.name[i]&&pass==json.pass[i]) {
 				alert("you signed in");
 				break;
 			} else {
 				alert("You fail logging in");
 				break;
 			}
 		}

	});
}