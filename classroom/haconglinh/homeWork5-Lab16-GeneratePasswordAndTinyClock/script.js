//Hàm get Element theo id và set value tương ứng
function getElementAndSetData(id, value) {

    var element = document.getElementById(id);

    if (value < 10) {
        value = '0' + value;
    }
    element.innerHTML = value;
}

//Hàm hiển thị đồng hồ
function showClock() {

    now = new Date();
    hour = now.getHours();
    minute = now.getHours();
    second = now.getSeconds();

    getElementAndSetData("hours", hour);
    getElementAndSetData("minutes", minute);
    getElementAndSetData("seconds", second);
    getElementAndSetData("days", now.getDay());
    getElementAndSetData("months", now.getMonth());
    getElementAndSetData("years", now.getYear() + 1900);

    //    2 Dòng mã dưới đây là tính năng thay đổi màu nền theo thời gian, có thể un commmend để thử
    //    var color = "#" + hour + minute + second;
    //    document.getElementById("clockdiv").style.background = color;

    setTimeout(showClock, 1000);
}

showClock();

//Hàm generate Password
function generatePassword() {

    var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerCase = "abcdefghijklmnopqrstuvwxyz";
    var number = "1234567890";
    var special = "!@#$%^&*";
    
    var keylist = upperCase + lowerCase + number + special;

    var password = '';
    
    //at lest 1 upper characters
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
        
    //at lest 1 lower characters
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    
    //at lest 1 number characters
    password += number.charAt(Math.floor(Math.random() * number.length));
    
    //at lest 1 special characters
    password += special.charAt(Math.floor(Math.random() * special.length));
        
    var passLength = 4 + Math.floor(Math.random() * 8);
    
    for (var i = 0; i < passLength; i++) {
        password += keylist.charAt(Math.floor(Math.random() * keylist.length))
    }

    document.getElementById("password").innerHTML = password;


}
