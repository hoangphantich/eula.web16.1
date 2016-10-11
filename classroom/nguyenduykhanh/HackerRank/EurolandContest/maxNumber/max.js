function maxOfThree(num1, num2, num3) {

    var myArray = [];
    myArray.push(num1);
    myArray.push(num2);
    myArray.push(num3);
    var bigg = "";
    var result = "";
    myArray.forEach(function(eachNum) {
        if(isNaN(eachNum)) {
            console.log("error of argument");
        } else if (eachNum >= 9999999999999999999999999999) {
            console.log("overflow");            
        } else {
         bigg =  Math.max.apply(Math, myArray);
        }
    });
    return result.concat(String(bigg));
};
