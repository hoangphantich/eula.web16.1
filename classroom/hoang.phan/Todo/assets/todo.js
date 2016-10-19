var todo = todo || {};

var data = JSON.parse(localStorage.getItem("todoData"));
data = data || {};

(function(todo, data, $) {
  var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        };
  var codes = {
            "1" : "#pending",
            "2" : "#inProgress",
            "3" : "#completed"
        };
  
  
  //todoServices (CRUD, controller)
  todo.list = function(){
    
  };
  
  todo.add = function(){
    //get data from view controller
    var taskobj = addElement();
    
    //convert json
    //save to localStorage
    var objJSON = JSON.stringify(taskobj);
    localStorage.setItem('data', objJSON);
  };
  
  todo.delete = function(){
    
  };
  
  todo.update = function(){
    
  };
  
  //avoid hoisting
  var buildCard = function(params){
        var parent = $(codes[params.code]);
        var wrapper;

        //defense
        if (!parent) {
            return;
        }

        //build div wrapper
        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

       //add title
        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        //due date
        $("<div />", {
            "class" : defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

        //description
        $("<div />", {
            "class" : defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

        //binding event
	    wrapper.draggable({
            start: function() {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function() {
                $("#" + defaults.deleteDiv).hide();
            },
	        revert: "invalid",
	        revertDuration : 200
        });
    };  
  
  
  //viewController
  var addElement = function(){
    //get all value
    var inputs = $('#todo-form :input');
    
    //add defense code
    if(inputs.length !==4){
      return;
    }
    
    var title = inputs[0].value;
    var desc = inputs[1].value;
    var duedate = inputs[2].value;
    var id = new Date().getTime(); //unix time

    var taskobj = {
            id : id,
            code: "1",
            title: title,
            date: duedate,
            description: desc
        };    
    
    //create card
    buildCard(taskobj);
    
    //avoid global variable / state change, monitor
    return taskobj;
  };
  
  var removeElement = function(){
    //drag
    
    //remove div
    
    //remove from localStorage
  }
  
  var dragElement = function(){
    //drag
    
    //remove from source div
    
    //add to target div
    
    //update todo db
    
  }
  
}(todo, data, jQuery));