var date = new Date();
date.setDate(1);

window.onload = function() {
  createMonth(date.getMonth());
};

function dayOfWeekAsString(dayIndex) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];
}

function monthsAsString(monthIndex) {
  return ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][monthIndex];
}

function createCalendarDay(num, day, month) {
  var currentCalendar = document.getElementById("calendar");

  var newDay = document.createElement("div");
  var date = document.createElement("p");
  date.innerHTML = num;

  var dayElement = document.createElement("p");
  dayElement.innerHTML = day;

  newDay.className = "calendar-day";

  var dateActual = new Date();
  if (num == dateActual.getDate() && month == dateActual.getMonth()) {
    var specialElement = document.createElement("p");
    specialElement.className = "specialElement";
    newDay.appendChild(specialElement);
    newDay.className = "calendar-day special";
  }

  newDay.appendChild(date);
  newDay.appendChild(dayElement);

  currentCalendar.appendChild(newDay);
}

function clearCalendar() {
  var currentCalendar = document.getElementById("calendar");

  currentCalendar.innerHTML = "";

}

function monthCreate(i) {
  clearCalendar();
  date.setMonth(i);
  createMonth(date.getMonth());
}

// Generate month
function createMonth(month) {
  var currentCalendar = document.getElementById("calendar");

  var dateObject = new Date();
  dateObject.setDate(date.getDate());
  dateObject.setMonth(month);
  dateObject.setYear(date.getFullYear());

  createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()), dateObject.getMonth());
  dateObject.setDate(dateObject.getDate() + 1);

  while (dateObject.getDate() != 1) {
    createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()), dateObject.getMonth());
    dateObject.setDate(dateObject.getDate() + 1);
  }

}