import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        { id: 1, title: 'Task1', completed: false },
        { id: 2, title: 'Task2', completed: false },
    ], //this is array of objects, cause array can contain any type of data including objects
    addTodo: (newTodo) => { },  //addTodo is a function that accepts object(id, title, completed). It doesn't do anything yet because the body {} is empty.
    updateTodo: (id, newTodo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
});



export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;