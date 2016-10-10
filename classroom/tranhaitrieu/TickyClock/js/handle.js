var clock, d, h, m, s;

function clock(){
	d = new Date();
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();

	clock = h + ":" + m + ":" +s;

	document.getElementById("clock").innerHTML = clock;

	setTimeout(clock, 1000);	
}

setInterval(clock, 1000);