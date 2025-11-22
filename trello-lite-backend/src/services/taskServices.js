const {getDB} = require('./db');
const {randomUUID} = require('crypto');

const validStates = ["todo","in-progress","done"];

exports.createTask = async(boardId,data) => {
    const db = getDB();
    const {title, description="",status="todo"} = data;

    const board = db.boards.find((b)=>b.id === boardId);
    if(!board){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    if(!title){
        const err = new Error('title is required');
        err.statusCode = 400;
        throw err;
    }
    if(!validStates.includes(status)){
        const err = new Error('invalid task status');
        err.statusCode = 400;
        throw err;
    }
    const task = {
        id: randomUUID(),
        boardId,
        title, 
        description,
        status,
        createdAt: Date.now(),
    };

    db.tasks.push(task);
    return task;
};
exports.deleteTask = async(taskId) => {
    const db = getDB();
    const index = db.tasks.findIndex((t)=>t.id === taskId);
    if(index===-1){
        const err = new Error('task not found');
        err.statusCode = 404;
        throw err;
    }
    db.tasks.splice(index,1);
};
exports.updateTask = async(taskId,data) => {
    const db = getDB();
    const {title, description, status} = data;
    const task = db.tasks.find((t)=>t.id === taskId);
    if(!task){
        const err = new Error('task not found');
        err.statusCode = 404;
        throw err;
    }
    if (title !== undefined && title.trim() === "") {
        const err = new Error("Task title cannot be empty");
        err.statusCode = 400;
        throw err;
    }
    if (status && !validStates.includes(status)) {
        const err = new Error("Invalid task status");
        err.statusCode = 400;
        throw err;
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    return task;
};
exports.getTasksByBoard = async(boardId) => {
    const db = getDB(); 
    const board = db.boards.find((b)=>b.id === boardId);
    if(!board){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    const boardTasks = db.tasks.filter((t)=>t.boardId === boardId);
    return boardTasks;
};
exports.moveTask = async (taskId, targetBoardId) => {
    const db = getDB();

    const task = db.tasks.find((t) => t.id === taskId);
    if (!task) {
        const err = new Error("Task not found");
        err.statusCode = 404;
        throw err;
    }

    const targetBoard = db.boards.find((b) => b.id === targetBoardId);
    if (!targetBoard) {
        const err = new Error("Target board not found");
        err.statusCode = 404;
        throw err;
    }

    task.boardId = targetBoardId;
    return task;
};