import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { TodoProvider } from "./contexts";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]); //since it is array of objects;this todos contain all todos, each with their own id, title, toggle complete

  // The reason for using { id: Date.now(), ...todo } is to ensure that any additional properties passed in the todo object (besides id) (like toggleComplete)are included in the new to-do item.
  const addTodo = (newTodo) => {
    console.log("Added Todo: ", newTodo);
    //this (newTodo) will be added in above todos state variable
    setTodos((prevTodos) => [{ id: Date.now(), ...newTodo }, ...prevTodos]);
  };

  //data means individual todo from previos todos(state)
  const updateTodo = (id, newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((data) => (data.id == id ? newTodo : data))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((data) => data.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((data) =>
        data.id == id ? { ...data, completed: !data.completed } : data
      )
    );
  };

  // get
  useEffect(() => {
    //getting all todos from local storage when first loading browser
    const todos = JSON.parse(localStorage.getItem("todo")); //todo is key since get requires key
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // set
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos)); //since our todos is in objet and local storage takes stirng so we need to convert it to string
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((data) => {
              return (
                <div key={data.id} className="w-full">
                  <TodoItem todo={data} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
