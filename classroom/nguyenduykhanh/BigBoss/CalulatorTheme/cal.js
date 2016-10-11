resultHtmlElement = document.getElementById('result');
        result = resultHtmlElement.innerHTML;
        function add(number){
            result += number;
            resultHtmlElement.innerHTML = result;
        }
        function calculate(){
            result = eval(result);
            resultHtmlElement.innerHTML = result;
        }
        function clearResult(){
            result = 0;
            resultHtmlElement.innerHTML = result;
        }


//CHANGE THEME
$("select").change(function() {
        var mySelect = $("select");

    $("select").each(function(){
        if($("select")) {
            $("#changeTheme").append('<link rel="stylesheet" href="dark.css" type="text/css" />');
        } else if ($("#colors")){
            $("#changeTheme").append('<link rel="stylesheet" href="colorful.css" type="text/css" />');
        } else {
            $("#changeTheme").css("color", "brown");
        }

    });
});
















