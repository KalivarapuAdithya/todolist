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
}


function create()
{

    $.post('/api/todos' , {name : $("#todotask").val()})
    .then(addTodo)
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
    })
}

function makeComplete(task)
{
    task.toggleClass("completed");
    let updateUrl = "/api/todo/" + task.data('id');
    let updatedData = {completed: !task.data('completed')};
    console.log(updatedData);
    $.ajax({
        method : 'PUT',
        url : updateUrl,
        data : updatedData
    })
    .then(function(data){
        task.data('completed' , !task.data('completed'));
    })
}