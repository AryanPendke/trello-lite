const asyncHandler = require('../middlewares/asyncHandler');
const taskServices = require('../services/taskServices');

exports.createTask = asyncHandler(async(req,res)=>{
    const result = await taskServices.createTask(req.params.boardId,req.body);
    res.status(201).json({success: true, message: 'task created successfully', data: result});
})
exports.getTasksByBoard = asyncHandler(async(req,res) => {
    const result = await taskServices.getTasksByBoard(req.params.boardId);
    res.status(200).json({success: true, message: 'tasks fetched successfully', data: result});
}) 
exports.updateTask = asyncHandler(async(req,res) => {
    const result = await taskServices.updateTask(req.params.taskId,req.body);
    res.status(200).json({success: true, message: 'task updated successfully', data: result});
}) 
exports.deleteTask = asyncHandler(async(req,res) => {
    const result = await taskServices.deleteTask(req.params.taskId);
    res.status(200).json({success: true, message: 'task deleted successfully', data: result});
}) 
exports.moveTask = asyncHandler(async(req,res)=>{
    const result = await taskServices.moveTask(req.params.taskId,req.params.targetBoardId);
    res.status(200).json({success: true, message: 'task moved successfully', data: result});
})

