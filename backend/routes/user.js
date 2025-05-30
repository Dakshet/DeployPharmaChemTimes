const express = require("express");
const { signupUser, loginUser, loginUserDetails, signupUserDetails } = require("../controllers/user");

const { body } = require("express-validator");
const { fetchUser } = require("../middlewares/fetchUser");
const { addAD } = require("../controllers/news");

const router = express.Router();


router.post("/signup", [
    body("name", "Name must be 3 characters").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password must be 4 characters").isLength({ min: 4 }),
    body("number", "Number must be 10 characters").isLength({ min: 10 })
], signupUser)

router.post("/login", loginUser)

router.get("/loginuserdetails", fetchUser, loginUserDetails)

// Routes for the AD
router.post("/addadvertisement", fetchUser, addAD)

router.get("/signupuserdetails", fetchUser, signupUserDetails)


module.exports = router;