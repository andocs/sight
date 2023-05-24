const asyncHandler = require("express-async-handler");
const Login = require("../models/loginModel");

//@desc Get all username and pass
//@route GET /api/login
//@access private
const getLoginDetails = asyncHandler(async (req, res) => {
    const login = await Login.find({ user_id: req.user.id });
    res.status(200).json(login);
});

//@desc Post all username and pass
//@route POST /api/login
//@access private
const createLoginDetails = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const {username,password} = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const login = await Login.create({
        username,
        password,
        user_id: req.user.id
    });

    res.status(201).json(login);
});

//@desc Get specific username and pass
//@route GET /api/login
//@access private
const getLoginDetailsID = asyncHandler(async (req, res) => {
    const login = await Login.findById(req.params.id);
    if(!login){
        res.status(404);
        throw new Error("Login Details not found");

    }
    if(login.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission!");
    }
    res.status(200).json(login);
});

//@desc Update specific username and pass
//@route PUT /api/login
//@access private
const updateLoginDetailsID = asyncHandler(async (req, res) => {
    const login = await Login.findById(req.params.id);
    if(!login){
        res.status(404);
        throw new Error("Login Details not found");

    }
    const updatedLoginDetails = await Login.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedLoginDetails);
});

//@desc Delete specific username and pass
//@route DELETE /api/login
//@access private
const deleteLoginDetailsID = asyncHandler(async (req, res) => {
    const login = await Login.findById(req.params.id);
    if(!login){
        res.status(404);
        throw new Error("Login Details not found");
    }
    if(login.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission!");
    }
    await Login.deleteOne({ _id: req.params.id });
    res.status(200).json(login);
});





module.exports = {  getLoginDetails,
                    createLoginDetails,
                    getLoginDetailsID,
                    updateLoginDetailsID,
                    deleteLoginDetailsID
                    };