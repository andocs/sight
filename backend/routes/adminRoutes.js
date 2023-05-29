const express = require("express");
const router = express.Router();

const {
  adminLogin,
  createStaffAccount,
  updateStaffAccount,
  deleteStaffAccount,
  getStaffAccountByID,
  getAllStaffAccounts,
} = require("../controllers/adminController");

const validateToken = require("../middleware/validateTokenHandler");
const restrictToAdmin = require("../middleware/restrictToAdmin");

router.use(validateToken);
router.use(restrictToAdmin);

router.post("/login", adminLogin);

router.route("/staff")
    .post(createStaffAccount)
    .get(getAllStaffAccounts);
router.route("/staff/:id")
    .put(updateStaffAccount)
    .delete(deleteStaffAccount)
    .get(getStaffAccountByID);

module.exports = router;
