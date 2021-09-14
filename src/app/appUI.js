(function (App) {

    App.ui = {
        form: {
            id: document.getElementsByClassName('c-todo__form')[0],
            title: document.getElementById("tdTitle"),
            description: document.getElementById("tdDescription"),
            category: document.getElementById("tdCategory"),
            submitButton: document.getElementById("todoFormSubmit"),
        },
        list: document.getElementById("todoList"),
        select: document.getElementById("tdCategory"),
    };

}(window.App));