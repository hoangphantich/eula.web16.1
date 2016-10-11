$('li').each(function (i) {
    var indexBold = $("<b></b>").text(i + ": ");
    $(this).prepend(indexBold);
});
