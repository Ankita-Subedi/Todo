import { useState } from "react";
import { useTodo } from "../contexts";

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsz, setTodoMsz] = useState(todo.title); //since todo obj is destructured above like ({todo})

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, title: todoMsz }); //taking which id to edit, then spreading the object and changing the title
    setIsEditable(false);
  };

  const toggle = () => {
    toggleComplete(todo.id);
  };

  return (
    <div>
      <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
          todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggle}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isEditable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
          value={todoMsz}
          onChange={(e) => setTodoMsz(e.target.value)}
          readOnly={!isEditable}
        />
        {/* Edit, Save Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todo.completed) return;

            if (isEditable) {
              editTodo();
            } else setIsEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
