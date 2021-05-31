$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)
    .catch(function(err)
    {
        console.log(err);
    })

    
    $("#todotask").keypress(function(event){
        
        if(event.which == 13)
        {
            event.preventDefault();
            if( $("#todotask").val().trim() !== "")
            create();
            $("#todotask").val("");
        }
    });

    $(".todolist").on("click" , "span" , function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $(".todolist").on("click" , "li" , function(e){
        makeComplete($(this));
    });
})


function addTodos(todos)
{
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo)
{
    let todo1 = $(`<li class="todos">${todo.name} <span>X</span> </li>`);
    todo1.data('id' , todo._id);
    todo1.data('completed' , todo.completed);
    if(todo.completed == true)
        todo1.addClass("completed");
    $("ul").append(todo1);
    return todo.name;
}

function addAlert(alert)
{
    $(".notifications").append(alert);
    alert.animate({marginLeft : '+=150%' , marginRight : '-=150%'} , 2000).fadeOut(5000);
}

function successMsg(todoName)
{
    let alert = $(`<p class="notification"> <b>${todoName}</b> is successfully added to the list</p>`)
    addAlert(alert);
    
}

function deletedTodo(todoName)
{
    let alert = $(`<p class="notification"> <b>${todoName}</b> is successfully deleted from the list</p>`)
    addAlert(alert);
}

function updatedTodo(todo)
{
    let alert;
    if(todo.completed === true)
    alert = $(`<p class="notification"> <b>${todo.name}</b> is changed from "not completed" to "completed" </p>`);
    else
    alert = $(`<p class="notification"> <b>${todo.name}</b> is changed from "completed" to "not completed" </p>`);
    addAlert(alert);
}


function create()
{

    $.post('/api/todos' , {name : $("#todotask").val()})
    .then(addTodo)
    .then(successMsg)
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(task)
{
    task.hide('slow');
    let deleteUrl = "/api/todo/" + task.data('id');
    $.ajax({
        method : 'DELETE',
        url : deleteUrl
    })
    .then(function(data){
        deletedTodo(data.name);
    })
}

function makeComplete(task)
{
    task.toggleClass("completed");
    let updateUrl = "/api/todo/" + task.data('id');
    let updatedData = {completed: !task.data('completed')};
    $.ajax({
        method : 'PUT',
        url : updateUrl,
        data : updatedData
    })
    .then(function(data){
        task.data('completed' , !task.data('completed'));
        updatedTodo(data);
    })
}

