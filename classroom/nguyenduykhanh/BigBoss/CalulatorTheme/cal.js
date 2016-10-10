resultHtmlElement = document.getElementById('result')
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
