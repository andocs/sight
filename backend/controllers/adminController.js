const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");

//@desc Create a staff account
//@route POST /api/admin/staff
//@access private (admin only)
const createStaffAccount = asyncHandler(async (req, res) => {
  // Get the staff details from the request body
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
    role,
  } = req.body;

  // Create the staff account
  const staff = await Staff.create({
    fname,
    lname,
    email,
    password,
    contact,
    address,
    city,
    province,
    postal,
    role,
  });

  res.status(201).json(staff);
});

//@desc Update a staff account
//@route PUT /api/admin/staff/:id
//@access private (admin only)
const updateStaffAccount = asyncHandler(async (req, res) => {
  const staffId = req.params.id;
  const updates = req.body;

  const staff = await Staff.findByIdAndUpdate(staffId, updates, {
    new: true,
    runValidators: true,
  });

  if (!staff) {
    res.status(404);
    throw new Error("Staff account not found");
  }

  res.json(staff);
});

//@desc Delete a staff account
//@route DELETE /api/admin/staff/:id
//@access private (admin only)
const deleteStaffAccount = asyncHandler(async (req, res) => {
  const staffId = req.params.id;

  const staff = await Staff.findById(staffId);

  if (!staff) {
    res.status(404);
    throw new Error("Staff account not found");
  }

  await staff.remove();

  res.json({ message: "Staff account deleted" });
});

//@desc Get staff account by ID
//@route GET /api/admin/staff/:id
//@access private (admin only)
const getStaffAccountByID = asyncHandler(async (req, res) => {
  const staffId = req.params.id;

  const staff = await Staff.findById(staffId);

  if (!staff) {
    res.status(404);
    throw new Error("Staff account not found");
  }

  res.json(staff);
});

//@desc Get all staff accounts
//@route GET /api/admin/staff
//@access private (admin only)
const getAllStaffAccounts = asyncHandler(async (req, res) => {
  const staff = await Staff.find();

  res.json(staff);
});

module.exports = {
  adminLogin,
  createStaffAccount,
  updateStaffAccount,
  deleteStaffAccount,
  getStaffAccountByID,
  getAllStaffAccounts,
};
