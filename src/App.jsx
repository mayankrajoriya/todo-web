import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };





  
  return (
    <>
      <Navbar />
      <div className="md: container bg-slate-200 mx-auto rounded-xl p-5 my-5 md:w-1/2 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold text-center py-3">Add a Todo</h2>
          <input
            type="text"
            className="w-full rounded-md p-2"
            onChange={handleChange}
            value={todo}
          />
          <button
            disabled={todo.length < 3}
            className="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-800 text-white my-2  p-2 font-bold w-full rounded-md"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex me-4  justify-between my-2 "
              >
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  value={item.isCompleted}
                  className="mx-3"
                />
                <div className={item.isCompleted ? "line-through " : ""}>
                  {item.todo}
                </div>

                <div className="buttons flex max-h-8">
                  <button
                    className="bg-blue-500 hover:bg-blue-800 text-white mx-1 py-1 p-2 font-bold rounded-md"
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-800 text-white mx-1 py-1 p-2 font-bold rounded-md"
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
