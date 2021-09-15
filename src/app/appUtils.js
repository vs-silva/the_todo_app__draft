(function(App){

    // Perhaps changing the following lines to:
    // const {todosService: _todoServices, categoriesService: _categoryServices} = App.services;
    const _todoServices = App.services.todosService;
    const _categoryServices = App.services.categoriesService;
    const _ui = App.ui;
    
    const _actions = {
        edit: {
            label: 'edit',
            fn: _todoServices.editTodo // I think you and others would benefit on the long term with more descriptive object key names 
        },
        delete: {
            label: 'delete',
            fn: _todoServices.deleteTodo // I think you and others would benefit on the long term with more descriptive object key names 
        },
    };

    function init()
    {
        const { select, list } = _ui;
        const { submitButton } = _ui.form;

        updateCategoriesSelect(_categoryServices.getAllCategories(), select);
        updateTodosList(_todoServices.getAllTodos(), list);
        submitButton.addEventListener('click', createOrEditTodo);

    }

    function updateCategoriesSelect(categoriesPayload, uiElementContainer)
    {       
        if(uiElementContainer && categoriesPayload.length > 0)
        {
            categoriesPayload.forEach( item => {
                const optionItem = document.createElement('option');

                optionItem.setAttribute('id', item.id);
                optionItem.setAttribute('value', item.type);                
                const optionItemContent = `${item.description}`;
                optionItem.innerText = optionItemContent;

                uiElementContainer.appendChild(optionItem);
            });
        }
    }

    function updateTodosList(todosPayload, uiElementContainer)
    {
        if( uiElementContainer.childNodes.length > 0)
        {
            uiElementContainer.innerHTML = '';
        }

        if(todosPayload.length > 0)
        {
            todosPayload.forEach( item => {
                const listItem = document.createElement('li');                
                const listItemContent = `( ${item.category} ) ${item.title} - ${item.description}`;

                listItem.setAttribute('id', item.id);
                listItem.setAttribute('class', 'u-margin-bottom-20px');
                listItem.innerText = listItemContent;

                listItem.appendChild(addEditDeleteOptions('span',_actions.edit.label));
                listItem.appendChild(addEditDeleteOptions('span',_actions.delete.label));
                uiElementContainer.appendChild(listItem);
            });
        }
    }

    function createOrEditTodo() {

        const { id, title, description, category } = _ui.form;
        const { list } = _ui;
        const todoId = id.getAttribute('id');

        const todoPayload = {
            title: title.value,
            description: description.value,
            category: category.value
        };   
        
        if (todoId)
        {
            todoPayload.id = todoId;
            _todoServices.editTodo( todoPayload.id, todoPayload );
        }
        else
        {
            _todoServices.addTodo( todoPayload );
        }

        resetForm();
        updateTodosList(_todoServices.getAllTodos(), list);
    }

    function addEditDeleteOptions(elementType, elementLabel)
    {
        const { list } = _ui;
        const optionElement = document.createElement(elementType.toString());
        optionElement.innerText = elementLabel.toString();
        optionElement.setAttribute('class', 'u-padding-left-10px u-padding-right-10px u-cursor-pointer');

        optionElement.addEventListener('click', event => {
           
           _actions[event.target.innerText].fn(event.target.parentElement.getAttribute('id'), null ,toEdit);
            updateTodosList(_todoServices.getAllTodos(), list);
        });

        return optionElement;
    }

    function toEdit(todoToEditPayload){

        const { form } = _ui;

        form.id.setAttribute('id', todoToEditPayload.id);
        form.title.value = todoToEditPayload.title;
        form.description.value = todoToEditPayload.description;
        form.category.value = todoToEditPayload.category;
    }

    function resetForm()
    {
        //Perhaps only one line of code? Much like you do on line 22.
        // const { form, select } = _ui;
        const { form } = _ui;
        const { select } = _ui;

        form.id.removeAttribute('id');
        form.title.value = '';
        form.description.value = '';
        form.category.innerHTML = '';

        updateCategoriesSelect( _categoryServices.getAllCategories(), select);   
    }

    App.utils = {
        init
    };
    
}(window.App));