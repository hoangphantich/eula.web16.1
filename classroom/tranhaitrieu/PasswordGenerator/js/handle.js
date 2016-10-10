
var keylist = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
var tmp ="";

function generatepassword(plength){
    tmp = '';
    for (i=0;i<plength;i++){
		tmp+= keylist.charAt(Math.floor(Math.random()*keylist.length));
    }
    return tmp;
}

function populateForm(enterlength){
	document.passGen.output.value =generatepassword(enterlength);
}

