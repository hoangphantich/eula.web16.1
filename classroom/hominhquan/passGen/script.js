var keylist = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
var tmp = '';

var keylength = keylist.length;

function generatepass(plength){
	tmp = '';
	for (var i = 0; i < plength; i++) {
		tmp += keylist.charAt(Math.floor(Math.random()*keylength));
	}
	return tmp;
}

function populateform(enterlength){
	document.passGen.output.value = generatepass(enterlength);
}