const asyncHandler = require("express-async-handler");
const userModel = require("../models/user.model");
const taskModel = require("../models/task.model");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskModel.find({ user: req.user.id });
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a task");
  }
  const task = await taskModel.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("No such user found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Unauthorized");
  }

  const updatedTask = await taskModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await taskModel.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("No such user found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Unauthorized");
  }

  await taskModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
