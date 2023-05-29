const express = require("express");
const {  
    registerUser,
    loginUser,
    updateUser,
    getStaff,
    getUserById,
    deleteUser           
 } = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");
const restrictToAdmin = require("../middleware/restrictToAdmin");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/roles", validateToken, restrictToAdmin, getStaff);

router.get("/:id", validateToken, getUserById)

router.put("/:id", validateToken, updateUser);

router.delete("/:id", deleteUser)

module.exports = router;