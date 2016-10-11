function sumArray(num1, num2, num3, num4) {
    var myArr = [];
    myArr.push(num1);
     myArr.push(num2);
     myArr.push(num3);
     myArr.push(num4);

    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    console.console.log(sum);
}
