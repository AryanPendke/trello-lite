const asyncHandler = require('../middlewares/asyncHandler');
const getDB = require('./db');
const {randomUUID} = require('crypto');

exports.createUser = async (data) => {
    const db = getDB();
    const {name,email} = data;
    if(!name){
        const err = new Error(`Name is required`);
        
    }
};
exports.deleteUser = async (id) => {

};
exports.getAllUsers = async () => {

};
exports.getUserById = async(id) => {

};

 