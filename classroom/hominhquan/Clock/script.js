var d, h, m, s, color;

var clock = document.getElementById('clockdiv');

var hoursSpan = clock.querySelector('.hours');
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');

function cloky(){
	d = new Date();
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();

	hoursSpan.innerHTML = ('0' + h).slice(-2);
	minutesSpan.innerHTML = ('0' + m).slice(-2);
	secondsSpan.innerHTML = ('0' + s).slice(-2);

	color = "#" + h + m + s;
	document.body.style.background = color;

	setTimeout(cloky, 1000);
}

cloky();