const asyncHandler = require('../middlewares/asyncHandler');
const boardServices = require('../services/boardServices');

exports.createBoard = asyncHandler(async (req,res)=>{
    const result = await boardServices.createBoard(req.body);
    res.status(201).json({success: true, message: `Board created Successfully`, data: result});
});

exports.getAllBoards = asyncHandler(async(req,res) => {
    const result = await boardServices.getAllBoards();
    res.status(201).json({success: true, message: `All Boards fetched successfully`, data: result});
});

exports.getBoardById = asyncHandler(async(req,res)=>{
    const result = await boardServices.getBoardById(req.params.id);
    res.status(201).json({success: true, message: `Board fetched successfully`, data: result});
}); 

exports.updateBoard = asyncHandler(async(req,res) => {
    const result = await boardServices.updateBoard(req.params.id, req.body);
    res.status(201).json({success: true, message: `Board updated successfully`, data: result});
}); 

exports.deleteBoardById = asyncHandler(async(req,res) => {
    await boardServices.deleteBoardById(req.params.id);
    res.status(201).json({success: true, message: `Board deleted successfully`});
});

exports.exportBoard = asyncHandler(async(req,res) => {
    const result = await boardServices.exportBoard(req.params.id,res);
    res.status(201).json({success: true, message: `board Exported successfully`});
});

exports.importBoard = asyncHandler(async(req,res) => {
    const result = await boardServices.importBoard(req);
    res.status(201).json({success: true, message: `board imported successfully`, data: result});
});



