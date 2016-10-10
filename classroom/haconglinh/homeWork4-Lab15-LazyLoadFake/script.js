var tr = document.createElement("tr");
var td = document.createElement("td");


document.getElementById("divTable").appendChild(table);

var row;

var userArray = JSON.parse(users);

function createTable() {

    var headers = new Array("Name", "Age", "Email");

    var headerCount = headers.length;

    row = table.insertRow(-1);
    for (var i = 0; i < headerCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = headers[i];
        assignClass(headerCell, i);
        row.appendChild(headerCell);
    }

    for (var i = 0; i < 3; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < headerCount; j++) {
            var cell = row.insertCell(-1);
            assignClass(cell, j);

            if (0 === j) {
                cell.innerHTML = userArray[i].name;
            }

            if (1 === j) {
                cell.innerHTML = userArray[i].age;
            }

            if (2 === j) {
                cell.innerHTML = userArray[i].email;
            }
        }
    }

    var divTable = document.getElementById("divTable");
    divTable.innerHTML = "";
    divTable.appendChild(table);
}

createTable();



function lazyLoad(){

    var n = 0;

    for (var i = 0; i < 3; i++) {
        row = table.insertRow(-1);

        n = Math.floor((Math.random() * 10));

        for (var j = 0; j < 3; j++) {
            var cell = row.insertCell(-1);
            assignClass(cell, j);

            if (0 === j) {
                cell.innerHTML = userArray[n].name;
            }

            if (1 === j) {
                cell.innerHTML = userArray[n].age;
            }

            if (2 === j) {
                cell.innerHTML = userArray[n].email;
            }
        }
    }
}

function assignClass(cell, column){
    if (0 === column) {
        cell.className = "name";
    }

    if (1 === column) {
        cell.className = "age";
    }

    if (2 === column) {
        cell.className = "email";
    }
}

