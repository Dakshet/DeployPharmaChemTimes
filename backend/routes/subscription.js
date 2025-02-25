const express = require("express");
const { body } = require("express-validator");
const { addSubscription, getSubscriptionData, updateSubscriptionData, deleteSubscriptionData } = require("../controllers/subscription");
const { fetchUser } = require("../middlewares/fetchUser");

const router = express.Router();


router.post("/addsubscription", [
    body("name", "Name must be 3 characters").isLength({ min: 3 }),
    body("address", "Address must be 10 characters").isLength({ min: 10 }),
    body("country", "Password must be 2 characters").isLength({ min: 2 }),
    body("number", "Number must be 10 characters").isLength({ min: 10 }),
    body("email", "Enter the valid email").isEmail(),
], addSubscription);

router.get("/getsubscriptionData/:paymentStatus", fetchUser, getSubscriptionData);

router.put("/updateSubscriptionData/:id", fetchUser, updateSubscriptionData);

router.delete("/deletesubscription", fetchUser, deleteSubscriptionData);


module.exports = router;