const {getDB} = require('./db');
const {randomUUID} = require('crypto');

exports.createUser = async (data) => {
    const db = getDB();
    const {name,email} = data;
    if(!name){
        const err = new Error('name is required');
        err.statusCode = 400;
        throw err;
    }
    if(!email){
        const err = new Error('email is required');
        err.statusCode = 400;
        throw err;
    }
    const existing = db.users.find((u)=>u.email === email);
    if(existing){
        const err = new Error('email already exists');
        err.statusCode = 400;
        throw err;
    }
    const newUser = {
        id: randomUUID(),
        name, 
        email,
        createdAt: Date.now()
    };
    db.users.push(newUser);
    return newUser;
};
exports.deleteUser = async (id) => {
    const db = getDB();
    const index = db.users.findIndex((u)=>u.id === id);
    if(index!=-1){
        const err = new Error('user not found');
        err.statusCode = 404;
        throw err;
    }
    db.users.splice(index,1);
};
exports.getAllUsers = async () => {
    const db = getDB();
    return db.users;
};
exports.getUserById = async(id) => {
    const db = getDB();
    const user = db.users.find((u)=> u.id === id);
    if(!user){
        const err = new Error('user not found');
        err.statusCode = 404;
        throw err;
    }
    return user;
};

   