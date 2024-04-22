import React, { useEffect, useState } from "react";
import "./Todo.css";
import moment from "moment";

import { useSelector } from "react-redux";
import { UserApi } from "../../utils/User/userApi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

function formatDate(dateString) {
  const date = moment(dateString);
  return date.format("DD-MM-YYYY [at] HH:mm:ss");
}

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const users = useSelector((state) => state.user);

  const handleAddTodo = async () => {
    try {
      let now = new Date();
      let dd = now.getDate();
      let mm = now.getMonth() + 1;
      let yyyy = now.getFullYear();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      let createdOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

      const usersId = users.id;

      const response = await UserApi.post(`/todo/${usersId}`, {
        title: newTitle,
        description: newDescription,
        createdOn: createdOn,
        createdBy: usersId,
      });

      console.log(response.data);
      setTodos((prevTodos) => [...prevTodos, response.data]);

      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert(error.response.data.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await UserApi.delete(`/todoDelete/${todoId}`);
      const updatedTodos = allTodos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo. Please try again.");
    }
  };

  const handleComplete = async (todoId) => {
    try {
      await UserApi.post(`/todoComplete/${todoId}`);

      const updatedAllTodos = allTodos.filter((todo) => todo._id !== todoId);
      setTodos(updatedAllTodos);

      const completedTodo = allTodos.find((todo) => todo._id === todoId);

      if (completedTodo) {
        setCompletedTodos((prevCompletedTodos) => [
          ...prevCompletedTodos,
          completedTodo,
        ]);
      }
    } catch (error) {
      console.error("Error completing todo:", error);
      alert("Failed to complete todo. Please try again.");
    }
  };

  const handleDeleteCompletedTodo = async (todoId) => {
    try {
      await UserApi.delete(`/todoDelete/${todoId}`);
      const updatedCompletedTodos = completedTodos.filter(
        (todo) => todo._id !== todoId
      );
      setCompletedTodos(updatedCompletedTodos);
    } catch (error) {
      console.error("Error deleting completed todo:", error);
      alert("Failed to delete completed todo. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setCurrentEdit(item._id);
    setCurrentEditedItem(item);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await UserApi.put(
        `/todoUpdate/${currentEditedItem._id}`,
        {
          title: currentEditedItem.title,
          description: currentEditedItem.description,
        }
      );

      const updatedTodos = allTodos.map((todo) =>
        todo._id === currentEditedItem._id ? response.data : todo
      );
      setTodos(updatedTodos);
      setCurrentEdit("");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo. Please try again.");
    }
  };

  useEffect(() => {
    const usersId = users.id;
    const fetchData = async () => {
      try {
        const response = await UserApi.get(`/todo/${usersId}`);
        if (response && response.data) {
          const { todos, completedTodos } = response.data;
          setTodos(todos || []);
          setCompletedTodos(completedTodos || []);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        alert(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdatedTitle = (value) => {
    setCurrentEditedItem((prevItem) => ({
      ...prevItem,
      title: value,
    }));
  };

  const handleUpdatedDescription = (value) => {
    setCurrentEditedItem((prevItem) => ({
      ...prevItem,
      description: value,
    }));
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's your task?"
            />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description"
            />
          </div>

          <div className="todo-input-item">
            <button onClick={handleAddTodo} className="add-btn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondary-btn ${!isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondary-btn ${isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen
            ? completedTodos.map((item) => (
                <div className="todo-list-item" key={item._id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>
                        Completed on: {formatDate(item.completedOn)}{" "}
                      </small>
                    </p>
                  </div>

                  <div className="icon-container">
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(item._id)}
                      title="Delete?"
                    />
                  </div>
                </div>
              ))
            : allTodos.map((item) => (
                <div className="todo-list-item" key={item._id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Created on: {formatDate(item.createdOn)}</small>
                    </p>
                  </div>

                  <div className="icon-container">
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(item._id)}
                      title="Delete?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(item._id)}
                      title="Complete?"
                    />
                    <AiOutlineEdit
                      className="check-icon"
                      onClick={() => handleEdit(item)}
                      title="Edit?"
                    />
                  </div>
                </div>
              ))}
        </div>
        {currentEdit && (
          <div>
            <input
              type="text"
              value={currentEditedItem.title}
              onChange={(e) => handleUpdatedTitle(e.target.value)}
              style={{ color: "black" }}
            />
            <input
              type="text"
              value={currentEditedItem.description}
              onChange={(e) => handleUpdatedDescription(e.target.value)}
              style={{ color: "black" }}
            />
            <button className="add-btn" onClick={handleUpdateTodo}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
