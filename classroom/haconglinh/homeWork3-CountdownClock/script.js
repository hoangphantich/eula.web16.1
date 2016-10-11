
//Hàm get data theo id

function getData(id) {
    var time = document.getElementById(id).value;
    return time;
}

//Hàm tính toán thời gian còn lại

function getTimeRemaining(endTime) {

    var countDownTime = Date.parse(endTime) - Date.parse(new Date());
    var seconds = Math.floor((countDownTime / 1000) % 60);
    var minutes = Math.floor((countDownTime / 1000 / 60) % 60);
    var hours = Math.floor((countDownTime / (1000 * 60 * 60)) % 24);
    var days = Math.floor((countDownTime / (1000 * 60 * 60 * 24)) % 30);
    var months = Math.floor((countDownTime / (1000 * 60 * 60 * 24 * 30)) % 12);
    var years = Math.floor(countDownTime / (1000 * 60 * 60 * 24 * 365));

    return {
        'total': countDownTime,
        'years': years,
        'months': months,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}


//Hàm khởi tạo Đồng hồ và hiển thị giá trị

function initializeClock(id, endTime) {

    var clock = document.getElementById(id);
    var yearsSpan = clock.querySelector('.years');
    var monthsSpan = clock.querySelector('.months');
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var countDownTime = getTimeRemaining(endTime);

        yearsSpan.innerHTML = countDownTime.years;
        monthsSpan.innerHTML = countDownTime.months;
        daysSpan.innerHTML = ('0' + countDownTime.days).slice(-2);;
        hoursSpan.innerHTML = ('0' + countDownTime.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + countDownTime.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + countDownTime.seconds).slice(-2);

        if (countDownTime.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    supdateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

//Hàm khởi chạy

function startCountDown() {

    var dateInput = getData("dateInput");
    var monthInput = getData("monthInput");
    var yearInput = getData("yearInput");

    var hourInput = getData("hourInput");
    var minuteInput = getData("minuteInput");
    var secondInput = getData("secondInput");

    var stringEndTime = yearInput + '-' + monthInput + '-' + dateInput + 'T' + hourInput + ':' + minuteInput + ':' + secondInput;

    var endTime = new Date(stringEndTime);

    if (Date.parse(endTime)) {

        if ((Date.parse(endTime) - Date.parse(new Date())) > 0) {
            initializeClock('clockdiv', endTime);
        } else {
            alert("Thời gian nhập vào phải lớn hơn thời gian hiện tại");
        }

    } else {
        alert("Sai cú pháp thời gian nhập vào !!!");
    }

}
