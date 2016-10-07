 function shuffle(a) {
    var r, x, i;
    for (i = a.length; i; i--) {
        r = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[r];
        a[r] = x;
    }
}

 var json = '{"employees":[' +
'{"name":"Phan Hoang1","age":"35", "email":"phanhoang1@gmail.com" },' +
'{"name":"Phan Hoang2","age":"35" , "email":"phanhoang2@gmail.com"},' +
'{"name":"Phan Hoang3","age":"35" , "email":"phanhoang3@gmail.com"},' +
'{"name":"Phan Hoang4","age":"35" , "email":"phanhoang4@gmail.com"},' +
'{"name":"Phan Hoang5","age":"35" , "email":"phanhoang5@gmail.com"},' +
'{"name":"Phan Hoang6","age":"35" , "email":"phanhoang6@gmail.com"},' +
'{"name":"Phan Hoang7","age":"35" , "email":"phanhoang7@gmail.com"},' +
'{"name":"Phan Hoang8","age":"35" , "email":"phanhoang8@gmail.com"},' +
'{"name":"Phan Hoang9","age":"35" , "email":"phanhoang9@gmail.com"},' +
'{"name":"Phan Hoang10","age":"35" , "email":"phanhoang10@gmail.com"},' +
'{"name":"Phan Hoang11","age":"35" , "email":"phanhoang11@gmail.com"},' +
'{"name":"Phan Hoang12","age":"35" , "email":"phanhoang12@gmail.com"},' +
'{"name":"Phan Hoang13","age":"35" , "email":"phanhoang13@gmail.com"},' +
'{"name":"Phan Hoang14","age":"35" , "email":"phanhoang14@gmail.com"},' +
'{"name":"Phan Hoang15","age":"35" , "email":"phanhoang15@gmail.com"},' +
'{"name":"Phan Hoang16","age":"35" , "email":"phanhoang16@gmail.com"},' +
'{"name":"Phan Hoang17","age":"35" , "email":"phanhoang17@gmail.com"},' +
'{"name":"Phan Hoang18","age":"35" , "email":"phanhoang18@gmail.com"},' +
'{"name":"Phan Hoang19","age":"35" , "email":"phanhoang19@gmail.com"},' +
'{"name":"Phan Hoang20","age":"35" , "email":"phanhoang20@gmail.com"},' +
'{"name":"Phan Hoang21","age":"35" , "email":"phanhoang21@gmail.com"},' +
'{"name":"Phan Hoang22","age":"35" , "email":"phanhoang22@gmail.com"},' +
'{"name":"Phan Hoang23","age":"35" , "email":"phanhoang23@gmail.com"},' +
'{"name":"Phan Hoang24","age":"35" , "email":"phanhoang24@gmail.com"}]}';

obj = JSON.parse(json);

shuffle(obj.employees);


  var table = document.getElementById("myTable");
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = "name";
                cell2.innerHTML = "age";
                cell3.innerHTML = "email";
  
        

    function show3Row(){
        var i = 0;
                    for (var j = document.getElementById("myTable").rows.length; j < obj.employees.length+1; j++) {
                i++;
                var table = document.getElementById("myTable");
                var row = table.insertRow(j);
                var cell1 = row.insertCell(0);
                cell1.setAttribute("id", "nameCol");
                var cell2 = row.insertCell(1);
                cell2.setAttribute("id", "ageCol");
                var cell3 = row.insertCell(2);
                cell3.setAttribute("id", "emailCol");

                cell1.innerHTML = obj.employees[j-1].name;
                cell2.innerHTML = obj.employees[j-1].age;
                cell3.innerHTML = obj.employees[j-1].email;
                if (i==3) {
                    break;
                }
            }
            }

            console.log(obj.employees.length);