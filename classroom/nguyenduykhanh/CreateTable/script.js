
function createTable(){
    
  var tablePresent = document.getElementById("createTables");    
  var body = document.getElementsByTagName("body");
// var body2 = document.getElementsByTagName("body")[1];
 
  var create = document.getElementById("tables");
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");


  var tableHead = document.createElement("thead");
  var nameText = document.createTextNode("Name");
  var ageText = document.createTextNode("Age");
  var emailText = document.createTextNode("Email");
  var row = document.createElement("tr");
    

    var tableth = document.createElement("th");
    var tableth1 = document.createElement("th");
    var tableth2 = document.createElement("th");
      tableth.appendChild(nameText);
      tableth1.appendChild(ageText);
      tableth2.appendChild(emailText);
    
      var cell = document.createElement("td");
      row.appendChild(tableth);
      row.appendChild(tableth1);
      row.appendChild(tableth2);
      tableHead.appendChild(row);
      
    tbl.appendChild(tableHead);
    tablePresent.appendChild(tbl);
    
}


function showData() {
        var dataPresent = document.getElementById("datashow");    
    
        
        var randomName  = faker.name.findName();
        var randomAge = Math.floor(Math.random()*100).toString();
        var randomEmail = faker.internet.email();


       var create = document.getElementById("tables");
       var tbl     = document.createElement("table");
       var tblBody = document.createElement("tbody");


      var nameRandom = document.createTextNode(randomName);
      var ageRandom = document.createTextNode(randomAge);
      var emailRandom = document.createTextNode(randomEmail);

      var row = document.createElement("tr");

        var tabletd = document.createElement("td");
        var tabletd1 = document.createElement("td");
        var tabletd2 = document.createElement("td");

          tabletd.appendChild(nameRandom);
          tabletd1.appendChild(ageRandom);
          tabletd2.appendChild(emailRandom);

        row.appendChild(tabletd);
        row.appendChild(tabletd1);
        row.appendChild(tabletd2);
        tblBody.appendChild(row);

        tbl.appendChild(tblBody);
        dataPresent.appendChild(tblBody);
        console.log(randomName);
    }

 
 

