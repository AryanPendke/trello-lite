const {getDB} = require('./db');
const {randomUUID} = require('crypto');

exports.createBoard = async(data) => {
    const db = getDB();
    const {name,ownerId} = data;
    if(!name){
        const err = new Error('board name is required');
        err.statusCode = 400;
        throw err;
    }
    if(!ownerId){
        const err = new Error('owner id is required');
        err.statusCode = 400;
        throw err;
    }
    const owner = db.users.find((u)=>u.id === ownerId);
    if(!owner){
        const err = new Error('owner not found');
        err.statusCode = 404;
        throw err;
    }
    const board = {
        id: randomUUID(),
        name, 
        ownerId,
        createdAt: Date.now(),
    }
    db.boards.push(board);
    return board;
}
exports.getAllBoards = async() => {
    const db = getDB();
    const result = db.boards;
    return result;
}
exports.getBoardById = async(id) => {
    const db = getDB();
    const board = db.boards.find((u)=>u.id === id);
    if(!board){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    return board;
}
exports.updateBoard = async(id,data) =>{
    const db = getDB();
    const {name} = data;
    if(!name){
        const err = new Error('Board name is required');
        err.statusCode = 400;
        throw err;
    }
    const board = db.boards.find((u)=>u.id === id);
    if(!board){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    board.name = name;
    return board;
}
exports.deleteBoardById = async(id) => {
    const db = getDB();
    const boardIndex = db.boards.findIndex((u)=>db.id === id);
    if(!boardIndex){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    db.boards.splice(boardIndex,1);
    db.tasks = db.tasks.filter((t)=>t.boardId !== id);
}
exports.exportBoard = async(id,res) => {
    
}
exports.importBoard = async(req)=>{

}
 