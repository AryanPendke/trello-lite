const asyncHandler = require('../middlewares/asyncHandler');
const userServices = require('../services/userServices');

exports.createUser = asyncHandler(async(req,res) => {
    const result =  await userServices.createUser(req.body);
    res.status(201).json({success: true, message: 'user created successfully', data: result});
});

exports.getAllUsers = asyncHandler(async(req,res)=>{
    const result = await userServices.getAllUsers();
    res.status(201).json({success: true, message: 'fetched all users successfully', data: result});
})

exports.getUserbyId = asyncHandler(async(req,res)=>{
    const result = await userServices.getUserById(req.params.id);
    res.status(201).json({success: true, message: `user Fetched successfully`, data: result});
});

exports.deleteUser = asyncHandler(async(req,res)=>{
    await userServices.deleteUser(req.params.id);
    res.status(201).json({success: true, message:  `user deleted successfully`});
}); 