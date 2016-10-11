//Defining the JS Constants
var defaults = {
    // CSS selectors and attributes that would be used by the JavaScript functions
    todoTask: "todo-task",
    todoHeader: "task-header",
    todoDate: "task-date",
    todoDescription: "task-description",
    taskId: "task-",
    formId: "todo-form",
    dataAttribute: "data",
    deleteDiv: "delete-div"
}, codes = {
    "1" : "#pending", //For pending tasks
    "2" : "#inProgress",
    "3" : "#completed"
};


//CREATING TASKS
//Add Task
var generateElement = function(params) {
    var parent = $(codes[params.code]),
        wrapper;
    
    if(!parent) {
        return;
    }
    
    wrapper = $("<div />", {
        "class": defaults.todoTask,
        "id" : defaults.taskId + params.id,
        "data" : params.id
    }).appendTo(parent);
    
    $("<div />", {
        "class" : defaults.todoHeader,
        "text" : params.title
    }).appendTo(wrapper);
    
    $("<div />", {
        "class": defaults.todoDate,
        "text" : params.date
    }).appendTo(wrapper);
    
    $("<div />", {
        "class" : defaults.todoDescription,
        "text"  : params.description
    }).appendTo(wrapper);
};

//This code shows how single task is generated
generateElement({
    id: "123",
    code: "1",
    title: "My Uber Important Task",
    date: "5/2/2014",
    description: "I have to do a lot of steps to implement this task!"
});


//DELETING TASK
var removeElement = function(params) {
    $("#" + defaults.taskId + params.id).remove();
};

//SAVING TASK IN LOCAL STORAGE

//n JavaScript, the variable localStorage stores all of this data. The following code sample shows how the to-do list data is retrieved from local storage.
data = {
    id: id,
    code: "1",
    title: title,
    date: date,
    description: description
}
var data = JSON.parse(localStorage.getItem("todoData"));
localStorage.setItem("todoData", JSON.stringify(data));




//SUBMITTING THE TO-DO FORM
//When the to-do form is submitted, a new task is created and added to local storage, and the contents of the page are updated. The following function implements this functionality.

var addItem = function() {
    var inputs = $("#" + defaults.formId + " :input"),
        errorMessage = "Title can not be empty",
        id, title, description, date, tempData;
    
    if(inputs.length !== 4) {
        return;
    }
    
    title = inputs[0].value;
    description = inputs[1].value;
    date = inputs[2].value;
    
    if(!title) {
        generateDialog(errorMessage);
        return;
    }
    
    id = new Date().getTime();
    
    tempData = {
        id: id,
        code: "1",
        title: title,
        date: date,
        description: description
    },
        
        // Saving implement in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));
    
    
    //Generate Todo Element
    generateElement(tempData);
    
    
    //Reset Form
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
};


// IMPLEMENTING DRAG AND DROP

$("." +defaults.todoTask).draggable();

// Add Task
var generateElement = function(params) {
    wrapper.draggable({
        start: function() {
            $("#" + defaults.deleteDiv).show();
        },
        stop: function() {
            $("#" + defaults.deleteDiv).hide();
        }
    });
};


//Secondly, we need to add the droppable() function to each of the categories as the elements are supposed to be dropped in any one of the three areas
//Adding drop function to each category of task
$.each(codes, function(index, value) {
    $(value).droppable({
        drop: function(event, ui){
        var element = ui.helper,
            css_id = element.attr("id"),
            id = css_id.replace(options.taskId, ""),
            object = data[id];
        
        // Removing old element
        removeElement(object);
        
        // Changing object code
        object.code = index;
        
        //Generaing new element
        GenerateElement(object);
        
        // Updating Local Storage
        data[id] = object;
        localStorage.setItem("todoData", JSON.stringify(data));
            
        //Hiding Delete Area
        $("#" + defaults.deleteDiv).hide();
        
        }
    });
});



//Thirdly, we need to add some code to delete tasks when they are dropped in the delete area.
// Adding drop function to delete div
$("#" + options.deleteDiv).droppable({
    drop: function(event, ui) {
        var element = ui.helper,
            css_id = element.attr("id"),
            id = css_id.replace(options.taskId, ""),
            object = data[id];
    
    //Removing old element
        removeElement(object);
        
    //Updating local storage
        delete data[id];
        localStorage.setItem("todoData", JSON.stringify(data));
        
        
    //Hiding Delete Data
        $("#", defaults.deleteDiv).hide();
    }
})




























