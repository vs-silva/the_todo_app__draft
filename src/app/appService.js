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

    function editTodo(idPayload, todoPayload = null, fn = null)
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

    function deleteTodo(idPayload, fn = null)
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