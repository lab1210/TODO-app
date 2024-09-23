import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [completed, setCompleted] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDesc,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewDesc("");
    setNewTitle("");
  };

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completed];
    updatedCompletedArr.push(filteredItem);
    setCompleted(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem("completed", JSON.stringify(updatedCompletedArr));
  };

  const handleCompletedDelete = (index) => {
    let reducedTodo = [...completed];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completed", JSON.stringify(reducedTodo));
    setCompleted(reducedTodo);
  };
  useEffect(() => {
    let savedList = JSON.parse(localStorage.getItem("todolist"));
    if (savedList) {
      setTodos(savedList);
    }
    let savedCompletedList = JSON.parse(localStorage.getItem("completed"));
    if (savedCompletedList) {
      setCompleted(savedCompletedList);
    }
  }, []);

  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleupdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };
  const handleupdateDesc = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };
  const handleUpdate = () => {
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
    localStorage.setItem("todolist", JSON.stringify(newTodo));
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-inputitem">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the Task?"
            />
          </div>
          <div className="todo-inputitem">
            <label>Description</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What's the description?"
            />
          </div>
          <div className="todo-inputitem">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            onClick={() => setIsCompleteScreen(false)}
            className={`secbtn ${isCompleteScreen === false && "active"}`}
          >
            Todo
          </button>
          <button
            onClick={() => setIsCompleteScreen(true)}
            className={`secbtn ${isCompleteScreen === true && "active"}`}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit_wrapper" key={index}>
                    <input
                      type="text"
                      placeholder="Updated Title"
                      value={currentEditedItem.title}
                      onChange={(e) => handleupdateTitle(e.target.value)}
                    />
                    <textarea
                      rows={4}
                      placeholder="Updated Description"
                      value={currentEditedItem.description}
                      onChange={(e) => handleupdateDesc(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      />
                      <BsCheckLg
                        title="Completed"
                        onClick={() => {
                          handleComplete(index);
                        }}
                        className="check-icon"
                      />
                      <AiOutlineEdit
                        title="Edit?"
                        className="check-icon"
                        onClick={() => {
                          handleEdit(index, item);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completed.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed On: {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => {
                        handleCompletedDelete(index);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
