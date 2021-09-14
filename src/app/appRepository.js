(function(App){

    const _repositories = {
        todos: [],
        categories: [
            {
                id: 1,
                type: 'A',
                description: 'Category A'
            },
            {
                id: 2,
                type: 'B',
                description: 'Category B'
            },
            {
                id: 3,
                type: 'C',
                description: 'Category C'
            }
        ]
    };

    function getAllItems(targetRepositoryPayload)
    {
        return _repositories[targetRepositoryPayload];
    }

    function getItemById(targetRepositoryPayload, idPayload)
    {
        return _repositories[targetRepositoryPayload].find( x => x.id.toString() === idPayload.toString() );
    }

    function createItem(targetRepositoryPayload, itemPayload)
    {
        itemPayload.id = _repositories[targetRepositoryPayload].length + 1;
        _repositories[targetRepositoryPayload].push(itemPayload);
    }

    function deleteItem(targetRepositoryPayload, itemPayload)
    {
        const index = _repositories[targetRepositoryPayload].findIndex( x => x.id.toString() === itemPayload.id.toString());
        _repositories[targetRepositoryPayload].splice(index, 1);
    }


    App.repositories = {
        todosRepository: 'todos',
        categoriesRepository: 'categories',
        getAllItems,
        getItemById,
        createItem,
        deleteItem
    };
    
}(window.App));