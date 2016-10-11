function max(a, b){
var reg = new RegExp('^[0-9]+$');
if (reg.test(a) && reg.test(b)) {
	if (a>=b) {
		console.log("Max trong 2 số : " + a);
	} else {
		console.log("Max trong 2 số : " + b);
	}
} else {
	console.log("2 số bạn truyền vào có vấn đề");
}
}