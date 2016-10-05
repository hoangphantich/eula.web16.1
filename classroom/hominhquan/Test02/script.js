function login(){
	var email = document.getElementById("userEmail");
	var password = document.getElementById("userPassword");

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			var n = obj.users.length;

			for (var i = 0; i < n; i++) {
				if (email.value == obj.users[i].email && password.value == obj.users[i].password) {
					alert("Login success");
				}
			}
		}
	};
	xhttp.open("POST", "data.json", true);
	xhttp.send();
}