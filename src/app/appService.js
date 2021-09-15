(function(App){

    const _repositories = App.repositories;

    function getAllCategories()
    {
        return _repositories.getAllItems(_repositories.categoriesRepository);
    }

    function getAllTodos()
    {
       return _repositories.getAllItems(_repositories.todosRepository);
    }

    function getTodoById(idPayload)
    {
        return _repositories.getItemById(_repositories.todosRepository, idPayload);
    }

    function addTodo(todoPayload)
    {
        if( todoPayload && todoPayloadIsValid(todoPayload))
        {
            _repositories.createItem(_repositories.todosRepository, todoPayload);
        }
    }

    function editTodo(idPayload, todoPayload = null, fn = null) // I think you and others would benefit on the long term with a more descriptive name for "fn" 
    {
        const todo = (idPayload) ? getTodoById(idPayload) : null;

        if(todo && fn)
        {
            fn(todo);
        }

        if(todo && todoPayload)
        {
            todo.title = todoPayload.title;
            todo.description = todoPayload.description;
            todo.category = todoPayload.category;
        }
    }

    function deleteTodo(idPayload, fn = null) // I think you and others would benefit on the long term with a more descriptive name for "fn" 
    {
        const todo = getTodoById(idPayload);

        if(todo)
        {
            _repositories.deleteItem(_repositories.todosRepository, todo);
        }        
    }
    
    function todoPayloadIsValid (formDataPayload) {

        let validationResults = [];        
        
        if(formDataPayload)
        {
            for (const key in formDataPayload) {
    
                //Im not sure if it was on porpuse or if it was for a particular reason but 
                //you can obtain the same result with "formDataPayload.hasOwnProperty(key)" and less code
                if (Object.hasOwnProperty.call(formDataPayload, key))
                {                                   
                    validationResults.push( (formDataPayload[key].toString().trim() !== '') );
                }
            }
        }

        const tempIndex = validationResults.findIndex( x => x === false);
        return ( tempIndex == -1 ) ? true : false;
    }

    App.services = {
        todosService: {
            addTodo,
            getAllTodos,
            getTodoById,
            editTodo,
            deleteTodo            
        },
        categoriesService: {
            getAllCategories
        }
               
    };
    
}(window.App));