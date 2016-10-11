function charFreq(myString) {
    var myObj = {};
      
    for (var i = 0; i < myString.length; i++) {
        var character = myString.charAt(i);
        
       if (typeof character === 'string' && myObj[character]) {
          myObj[character]++;
       }  else {
           myObj[character] = 1;
       }
    }
    
    return myObj;
}