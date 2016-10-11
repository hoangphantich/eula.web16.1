var keylist = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
var tmp ="";
var genPass;

function generatepassword(plength){
    tmp = '';
    for (i=0;i<plength;i++){
		tmp+= keylist.charAt(Math.floor(Math.random()*keylist.length));
    }
    return tmp;
}

function populateForm(enterlength){
	genPass = generatepassword(enterlength);
	$('#pwd').val(genPass);
	console.log(genPass);
	 $( "#repwd").prop( "disabled", true );
}


$(document).ready(function(){


	$('#btn-generatePass').click( function(){
			populateForm(6);
			$('#passwordRandomResult').val(genPass);
});


	$('#btn-submit').click( function(event){
			event.preventDefault();
			$(this).text("Saving ...");
			setTimeout(function (){

  $("#btn-submit").unbind('click').click();
       }, 2000); 
			
});
});


