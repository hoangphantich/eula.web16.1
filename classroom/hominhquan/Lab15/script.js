var data = '[' +
    '{"name":"John", "age":20, "email":"doe@gmail.com"},' +
    '{"name":"Anna", "age":24, "email":"smith@yahoo.com"},' +
    '{"name":"Peter", "age":35, "email":"jones@outlook.com"},' +
    '{"name":"Test4", "age":42, "email":"txt4@gmail.com"},' +
    '{"name":"Test5", "age":31, "email":"txt5@gmail.com"},' +
    '{"name":"Test6", "age":18, "email":"txt6@gmail.com"},' +
    '{"name":"Test7", "age":54, "email":"txt7@gmail.com"},' +
    '{"name":"Test8", "age":33, "email":"txt8@gmail.com"},' +
    '{"name":"Test9", "age":27, "email":"txt9@gmail.com"},' +
    '{"name":"Test", "age":23, "email":"txt@gmail.com"}' +
']';

var table = document.createElement("TABLE");
table.border = "1";
var row;

var obj = JSON.parse(data);

function GenerateTable() {

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
                cell.innerHTML = obj[i].name;
            }

            if (1 === j) {
                cell.innerHTML = obj[i].age;
            }

            if (2 === j) {
                cell.innerHTML = obj[i].email;
            }
        }
    }

    var divTable = document.getElementById("divTable");
    divTable.innerHTML = "";
    divTable.appendChild(table);
}

function showMore(){

    var n = 0;

    for (var i = 0; i < 3; i++) {
        row = table.insertRow(-1);

        n = Math.floor((Math.random() * 10));

        for (var j = 0; j < 3; j++) {
            var cell = row.insertCell(-1);
            assignClass(cell, j);

            if (0 === j) {
                cell.innerHTML = obj[n].name;
            }

            if (1 === j) {
                cell.innerHTML = obj[n].age;
            }

            if (2 === j) {
                cell.innerHTML = obj[n].email;
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

GenerateTable();