$(document).ready(function(){  // do not delete 
// ----------------------------------------------------------------------------
// EXERCISE 3
// In the HTML file, first look at the code to see what has been hidden 
// with this jQuery.
// Then figure out how to make the appropriate character appear when we
// hover on his or her name in the main text.
//
// Hint: From Code School, do you remember this?
// var amount = $(this).closest('.vacation').data('price');
// ----------------------------------------------------------------------------


var rama = $('[data-person = "#rama"]');
var sita = $('[data-person = "#sita"]');
var hanuman = $('[data-person = "#hanuman"]');
var ravana = $('[data-person = "#ravana"]');
var lakshmana = $('[data-person = "#lakshmana"]');

$('.character').hide();


rama.hover(function(){$('.character').show();}, function(){ $('.character').hide();});
sita.hover(function(){$('.character').show();}, function(){ $('.character').hide();});
hanuman.hover(function(){$('.character').show();}, function(){ $('.character').hide();});
ravana.hover(function(){$('.character').show();}, function(){ $('.character').hide();});
lakshmana.hover(function(){$('.character').show();}, function(){ $('.character').hide();});




// ----------------------------------------------------------------------------
}); // do not delete
