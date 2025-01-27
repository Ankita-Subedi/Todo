import { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    //Ensures the todo input is not empty before adding it. If todo is empty, the function exits early without calling addTodo.
    if (!todo) return;
    // since date is already passed as id in function so we need to fill only remaining fields of todo object
    addTodo({ title: todo, completed: false });
    setTodo("");
  };

  return (
    <div>
      <form onSubmit={add} className="flex">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
