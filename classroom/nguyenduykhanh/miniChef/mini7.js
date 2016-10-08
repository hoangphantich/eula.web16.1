function filterLongWords() {
    Array.prototype.remove = function(value) {
        var idx = this.indexOf(value);
        if (idx != -1) {
            return this.splice(idx, 1); 
        }
        return false;
}
      
    var myArray = ["khanh", "brain", "international", "kingdom", "applicable", "queen", "superman", "kidman", "longlastingever", "wueiyrtiweurteijf", "hirueyjdfgdsjfgds"];
    var maxWords = 7;
    var result = "";
  
    for ( var i = 0; i < myArray.length; i++) {
        if (myArray[i].length > maxWords) {
            
            myArray.remove(myArray[i]);        
        }
    }
    
return myArray;
}