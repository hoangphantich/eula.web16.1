function dataTypeCalculation(myInt, myDouble, myString) {
    var i = 4;
    var d = 4.0;
    var s = "HackerRank";
    
     
    var resultInt = i + parseInt(myInt);
    var resultDouble = (d + parseFloat(myDouble))/10;
    var resultString = s.concat(String(myString));
    
    console.log(resultInt);
    console.log(resultDouble);
    console.log(resultString);
}