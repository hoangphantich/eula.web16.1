function maxArray(x, y) {
    var myArr = [];
    myArr.push(x);
    myArr.push(y);
    var bigg = "";
    
    myArr.forEach(function(eachNumber){
        if (isNaN(eachNumber)) {
            console.log("wrong type");
        } else {
           bigg = Math.max.apply(Math, myArr);
        }      
    });
    return bigg;
}