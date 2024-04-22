const moment = require("moment");
const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

exports.createTodo = async (req, res) => {
  // console.log("createTodo");
  try {
    const usersId = req.params.usersId;
    // console.log(usersId, "usersId");
    const { title, description, createdOn } = req.body;
    // console.log(req.body, "body");

    const formattedCreatedOn = moment(
      createdOn,
      "DD-MM-YYYY [at] HH:mm:ss"
    ).format("DD-MM-YYYY [at] HH:mm:ss");

    // console.log(formattedCreatedOn, "formattedCreatedOn");

    const userIdObject = new mongoose.Types.ObjectId(usersId);

    const newTodo = new Todo({
      title: title,
      description: description,
      createdOn: formattedCreatedOn,
      createdBy: userIdObject,
    });

    const savedTodo = await newTodo.save();
    // console.log("savedTodo", savedTodo);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTodoList = async (req, res) => {
  try {
    const userId = req.params.usersId;
    // console.log(userId, "userIdssssss");
    const todos = await Todo.find({ createdBy: userId, isCompleted: false });
    const completedTodos = await Todo.find({
      createdBy: userId,
      isCompleted: true,
    });
    res.status(200).json({ todos, completedTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    // console.log(todoId, "todoId ");
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.completeTodo = async (req, res) => {
  const todoId = req.params.todoId;
  // console.log(todoId,"todoIdssssssss");

  try {
   
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { isCompleted: true }, { new: true });
    // console.log(updatedTodo,"updatedTodoooooo");
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo marked as completed', updatedTodo });
  } catch (error) {
    console.error('Error completing todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.todoUpdation = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    // console.log(todoId);
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo. Please try again.' });
  }
}