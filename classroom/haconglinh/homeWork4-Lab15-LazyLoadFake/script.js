var userArray = JSON.parse(users);

function showData(index) {
    var tr = document.createElement("tr");
    for (j = 0; j < 3; j++) {
        var td = document.createElement("td");

        switch (j) {
            case 0:
                td.innerHTML = userArray[index].name;
                td.style.textAlign = "left";
                break;
            case 1:
                td.innerHTML = userArray[index].age;
                td.style.textAlign = "right";
                break;
            case 2:
                td.innerHTML = userArray[index].email;
                td.style.textAlign = "left";
                break;
        }
        tr.appendChild(td);
    }
    document.getElementById("tbody").appendChild(tr);
}

function createTable() {
    var i, j;
    for (i = 0; i < 3; i++) {
        showData(i);
    }
}

createTable();

function lazyLoad() {
    var i, j;
    for (i = 0; i < 3; i++) {
        var randomIndex = parseInt(Math.random() * userArray.length);
        showData(randomIndex);
    }
}