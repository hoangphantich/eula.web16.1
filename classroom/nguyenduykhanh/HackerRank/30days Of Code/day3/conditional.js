function checkNumber(num) {
    if (num %2 !== 0) {
        console.log("Weird");
    } else if(num %2 === 0 && (num >= 2 && num <= 5)){
        console.log("Not Weird");
    } else if(num %2 === 0 && (num >=6 && num <= 20)){
        console.log("Weird");
    } else if (num %2 === 0 && num > 20){
        console.log("Not Weird");
    }
}

