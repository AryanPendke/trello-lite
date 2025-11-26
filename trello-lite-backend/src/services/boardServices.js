const path = require("path");
const fs = require("fs");

const Board = require("../models/Board");
const User = require("../models/User");
const Task = require("../models/Task");

// CREATE BOARD
exports.createBoard = async (data) => {
  const { name, ownerId } = data;

  if (!name) {
    const err = new Error("board name is required");
    err.statusCode = 400;
    throw err;
  }

  if (!ownerId) {
    const err = new Error("owner id is required");
    err.statusCode = 400;
    throw err;
  }

  // check if owner user exists
  const owner = await User.findById(ownerId);
  if (!owner) {
    const err = new Error("owner not found");
    err.statusCode = 404;
    throw err;
  }

  const board = await Board.create({
    name,
    ownerId
  });

  return board;
};

// GET ALL BOARDS
exports.getAllBoards = async () => {
  const boards = await Board.find().sort({ createdAt: -1 });
  return boards;
};

// GET BOARD BY ID
exports.getBoardById = async (id) => {
  const board = await Board.findById(id);

  if (!board) {
    const err = new Error("board not found");
    err.statusCode = 404;
    throw err;
  }

  return board;
};

// UPDATE BOARD
exports.updateBoard = async (id, data) => {
  const { name } = data;

  if (!name) {
    const err = new Error("Board name is required");
    err.statusCode = 400;
    throw err;
  }

  const board = await Board.findById(id);
  if (!board) {
    const err = new Error("board not found");
    err.statusCode = 404;
    throw err;
  }

  board.name = name;
  await board.save();

  return board;
};

// DELETE BOARD + CASCADE DELETE TASKS
exports.deleteBoardById = async (id) => {
  const board = await Board.findById(id);
  if (!board) {
    const err = new Error("board not found");
    err.statusCode = 404;
    throw err;
  }

  await Board.findByIdAndDelete(id);
  await Task.deleteMany({ boardId: id });
};

// EXPORT BOARD (board + tasks → JSON file)
exports.exportBoard = async (id) => {
  const board = await Board.findById(id).lean();

  if (!board) {
    const err = new Error("board not found");
    err.statusCode = 404;
    throw err;
  }

  const tasks = await Task.find({ boardId: id }).lean();

  const exportData = { board, tasks };

  const filePath = path.join(__dirname, `../../exports/${id}.json`);
  const writeStream = fs.createWriteStream(filePath);

  writeStream.write(JSON.stringify(exportData, null, 2));
  writeStream.end();

  return { filePath };
};

// IMPORT BOARD (JSON file → new board + tasks in Mongo)
exports.importBoard = async (filePath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

    let raw = "";

    readStream.on("data", (chunk) => {
      raw += chunk;
    });

    readStream.on("end", async () => {
      try {
        const data = JSON.parse(raw);
        const { board, tasks } = data;

        // Create new board (ignore old _id)
        const newBoard = await Board.create({
          name: board.name,
          ownerId: board.ownerId
        });

        const newBoardId = newBoard._id.toString();

        // Insert cloned tasks
        if (Array.isArray(tasks) && tasks.length > 0) {
          const newTasks = tasks.map((t) => ({
            title: t.title,
            description: t.description || "",
            status: t.status || "todo",
            boardId: newBoardId
          }));

          await Task.insertMany(newTasks);
        }

        resolve({ boardId: newBoardId });
      } catch (err) {
        reject(err);
      }
    });

    readStream.on("error", (err) => reject(err));
  });
};
