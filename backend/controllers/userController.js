const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {
        fname,
        lname,
        email,
        password,
        contact,
        address,
        city,
        province,
        postal,
    } = req.body;

    if (!fname ||
        !lname ||
        !email ||
        !password ||
        !contact ||
        !address ||
        !city ||
        !province ||
        !postal
    ){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("User already exists!");
    }
    //Hash password function
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword); 
    
    const user = await User.create({
        fname,
        lname, 
        email,
        password: hashedPassword,
        contact,
        address,
        city,
        province,
        postal,
        role: "patient"
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email, role: user.role});
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Registration success!"});
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });

    //compare password with hashedPassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                email: user.email,
                role: user.role,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }        
        );
        res.status(200).json({ accessToken, role: user.role});
    } else {
        res.status(401)
        console.log(password, user.password);
        throw new Error("Email or password is not valid");
    }
});

//@desc Get staff by Role
//@route GET /api/users/roles
//@access private (admin only)
const getStaff = asyncHandler(async (req, res) => {
    const users = await User.find({ role: { $in: ['doctor', 'technician'] } });
    if (!users){
        res.status(404);
        throw new Error("User not found");
    }
    res.json(users);
  });
  
//@desc Get user by ID
//@route GET /api/users/:id
//@access Private (admin or user with the same ID)
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (req.user.id !== userId && req.user.role !== "admin"){
    res.status(403);
    throw new Error("User don't have permission!");
  }
  res.json(user)
});

//@desc Update user
//@route PUT /api/users/update/:id
//@access private (admin or user with the same ID)
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    if (req.user.id !== userId && req.user.role !== "admin"){
        res.status(403);
        throw new Error("User don't have permission!");
    }

    if (updates.password){
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        updates.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
  
    if (!user) {
      res.status(404);
      throw new Error("Staff account not found");
    }
    
    res.json(user);
    console.log(user);
  });

//@desc Delete user
//@route DELETE /api/users/delete/:id
//@access private (admin only)
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // Delete the user
    await user.deleteOne()

    res.json({ message: "User deleted" });
    });

module.exports = {  registerUser,
                    loginUser,
                    updateUser,
                    getStaff,
                    getUserById,
                    deleteUser           
                 };