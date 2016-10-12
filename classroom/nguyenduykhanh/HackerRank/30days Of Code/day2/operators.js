// Given meal price, tip percent, tax percent. Find and print the metal's total cost
function totalCost (meal, tip, tax) {
    var totalCost;
    this.meal = parseFloat(meal);
    this.tip = parseInt(tip);
    this.tax = parseInt(tax);
    
    var tipPercent = meal * (tip/100);
    var taxPercent = meal * (tax/100);
    
    totalCost = Math.round(meal + tipPercent + taxPercent); 
    console.log("The total meal cost is " + totalCost + " dollars");
   
}