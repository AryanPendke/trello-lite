const Task = require("../models/Task");
const Board = require("../models/Board");

/**
 * VALID STATUSES
 */
const VALID_STATUSES = ["todo", "in-progress", "done"];

/**
 * Create Task under a board
 * - validates board exists
 * - validates title & status
 */
exports.createTask = async (boardId, data) => {
  const { title, description = "", status = "todo" } = data;

  // board existence
  const board = await Board.findById(boardId);
  if (!board) {
    const err = new Error("Board not found");
    err.statusCode = 404;
    throw err;
  }

  // title validation
  if (!title || title.toString().trim() === "") {
    const err = new Error("Task title is required");
    err.statusCode = 400;
    throw err;
  }

  // status validation
  if (!VALID_STATUSES.includes(status)) {
    const err = new Error("Invalid task status");
    err.statusCode = 400;
    throw err;
  }

  const task = await Task.create({
    title,
    description,
    status,
    boardId: board._id.toString()
  });

  return task;
};

/**
 * Get tasks for a board
 * - validates board exists
 */
exports.getTasksByBoard = async (boardId) => {
  const board = await Board.findById(boardId);
  if (!board) {
    const err = new Error("Board not found");
    err.statusCode = 404;
    throw err;
  }

  const tasks = await Task.find({ boardId }).sort({ createdAt: -1 });
  return tasks;
};

/**
 * Update task (title, description, status)
 */
exports.updateTask = async (taskId, data) => {
  const { title, description, status } = data;

  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  // title validation (if provided)
  if (title !== undefined && title.toString().trim() === "") {
    const err = new Error("Task title cannot be empty");
    err.statusCode = 400;
    throw err;
  }

  // status validation (if provided)
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    const err = new Error("Invalid task status");
    err.statusCode = 400;
    throw err;
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  await task.save();
  return task;
};

/**
 * Delete task
 */
exports.deleteTask = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  await Task.findByIdAndDelete(taskId);
};

/**
 * Move task to another board
 * - validates task exists
 * - validates target board exists
 * - updates task.boardId
 */
exports.moveTask = async (taskId, targetBoardId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  const targetBoard = await Board.findById(targetBoardId);
  if (!targetBoard) {
    const err = new Error("Target board not found");
    err.statusCode = 404;
    throw err;
  }

  task.boardId = targetBoard._id.toString();
  await task.save();
  return task;
};
