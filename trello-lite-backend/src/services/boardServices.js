const path = require('path');
const {getDB} = require('./db');
const fs = require('fs');
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
    const boardIndex = db.boards.findIndex((u)=>u.id === id);
    if(boardIndex === -1){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    db.boards.splice(boardIndex,1);
    db.tasks = db.tasks.filter((t)=>t.boardId !== id);
}
exports.exportBoard = async(id) => {
    const db = getDB();
    const board = db.boards.find((b)=> b.id === id);
    if(!board){
        const err = new Error('board not found');
        err.statusCode = 404;
        throw err;
    }
    const tasks = db.tasks.filter((t)=>t.boardId === id);
    const exportData = {board,tasks};
    const filePath = path.join(__dirname,`../../exports/${id}.json`);
    const writeStream = fs.createWriteStream(filePath);

    writeStream.write(JSON.stringify(exportData,null,2));
    writeStream.end();

    return {filePath};
}
exports.importBoard = async(filePath)=>{
    const db = getDB();

    return new Promise((resolve,reject) => {
        const readStream = fs.createReadStream(filePath,{encoding:"utf8"});
        let raw = "";
        readStream.on("data",(chunk) => {
            raw += chunk;
        });
        readStream.on("end",()=>{
            try{
                const data = JSON.parse(raw);
                const {board,tasks} = data;
                const newBoardId = randomUUID();
                const newBoard = {
                    ...board,
                    id: newBoardId,
                    createdAt: Date.now()
                }
                db.boards.push(newBoard);

                tasks.forEach((t)=>{
                    db.tasks.push({
                        ...t,
                        id:randomUUID(),
                        boardId: newBoardId,
                        createdAt: Date.now(),
                    })
                })

                resolve({boardId: newBoardId});
            }
            catch(err){
                reject(err);
            }
        })
        readStream.on("error",(err) => reject(err));
    })
}
 