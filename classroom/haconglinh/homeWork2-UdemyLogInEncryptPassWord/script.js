function login(){

	var email = document.getElementById("userEmail").value;
	var password = document.getElementById("userPassword").value;
    var passHash = md5(password);

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);



			var n = obj.users.length;


			for (var i = 0; i < n; i++) {
				if (email === obj.users[i].email && passHash === obj.users[i].password) {
					alert("Login success");
                    console.log(obj.users[i].email);
            console.log(obj.users[i].password);
				}
			}
		}
	};
	xhttp.open("POST", "user.json", true);
	xhttp.send();
}