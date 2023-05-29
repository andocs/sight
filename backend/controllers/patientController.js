const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerPatient = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await Patient.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists!");
    }

    // Validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400);
        throw new Error(
            "Password must contain 8 characters, including at least one uppercase letter, one lowercase letter, and one digit."
        );
    }

    // Hash password function
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await Patient.create({
        email,
        password: hashedPassword,
        role
    });
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email, role: user.role });
    } else {
        res.status(400);
        throw new Error("Patient data is not valid");
    }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginPatient = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await Patient.findOne({ email });

    // Compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    email: user.email,
                    role: user.role,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken, user });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@desc Get current user info
//@route POST /api/users/current
//@access private
const currentPatient = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerPatient,
    loginPatient,
    currentPatient,
};
