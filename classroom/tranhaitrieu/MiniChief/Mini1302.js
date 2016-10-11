function max(a, b, c){
var reg = /^[0-9]*$/g;
if (reg.test(a) && reg.test(b) && reg.test(c)) {
	var max =  Math.max(a, b, c);
	console.log("Giá trị lớn nhất trong 3 số : " + max);
	return true;
} else {
	console.log("3 số bạn truyền vào có vấn đề");
	return false;
}
}