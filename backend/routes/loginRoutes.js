const express = require("express");
const router = express.Router();

const { getLoginDetails, 
        createLoginDetails,
        getLoginDetailsID,
        updateLoginDetailsID,
        deleteLoginDetailsID } 
        = require("../controllers/loginController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getLoginDetails).post(createLoginDetails);

router.route("/:id").get(getLoginDetailsID).put(updateLoginDetailsID).delete(deleteLoginDetailsID);

module.exports = router;