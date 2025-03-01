const { validationResult } = require("express-validator");
const User = require("../models/user");
const nodemailer = require('nodemailer');

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { sendMails } = require("./subscription");

const JWT_SECURE = process.env.JWT_SECURE
const TOKEN_EXPIRATION = "2d";     // Token will expire in 1 hour (use other formats like '2d', '10m', '365d' as needed

let success = false;

async function signupUser(req, res) {
    try {
        //Destructure the user
        const { name, email, password, number } = req.body;

        //Validate the fields
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, Error: errors.array()[0].msg })
        }

        //Verify the user
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            success = false;
            return res.status(400).json({ success, Error: "User with this email id are already register!" })
        }

        //Create the salt
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);


        //Save data in the database
        user = await User.create({
            name,
            email,
            password: securePass,
            number
        })

        // user = await user.save();
        let subject = "Welcome to PharmaChem Times";

        let text = `
         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #007bff;">Welcome to PharmaChem Times, ${user.name}!</h2>
                    <p>Thank you for signing up. We are excited to have you as a part of our community.</p>

                    <h3>📢 Our Subscription Plans:</h3>
                    <ul>
                        <li>✅ <strong>Free Email Subscription:</strong> Receive a daily electronic newsletter with the latest industry news straight to your inbox.</li>
                        <li>✅ <strong>Free Print Subscription:</strong> Get a monthly hard copy of our print magazine delivered to your address.</li>
                    </ul>

                    <h3>📌 What’s Next?</h3>
                    <p>Your subscription form has been received. However, to confirm your subscription, please proceed with the payment. Once completed, we will activate your subscription and send you a confirmation email.</p>

                    <h3>📞 Need Assistance?</h3>
                    <p><strong>Contact:</strong> Jitendra Nate<br>
                    📱 <strong>Phone:</strong> +91 8779345336</p>

                    <p>🔗 <a href="https://www.pharmachemtimes.in" style="color: #007bff; text-decoration: none;">Visit Our Website</a></p>

                    <p>Thank you for joining <strong>PharmaChem Times</strong>!<br>
                    <strong>Best Regards,</strong><br>
                    <strong>PharmaChem Times Team</strong></p>
                </div>
        `

        await sendMails(user.email, subject, text)

        //Token
        const payload = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(payload, JWT_SECURE, { expiresIn: TOKEN_EXPIRATION });


        //Final
        success = true;
        return res.status(201).json({ success, token })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}

async function loginUser(req, res) {
    try {
        //Destructure the user
        const { email, password } = req.body;

        //Validate the user
        let user = await User.findOne({ email: req.body.email })

        if (!user) {
            success = false;
            return res.status(404).json({ success, Error: "User is not found!" })
        }

        //validate the Password
        let comparePass = await bcrypt.compare(req.body.password, user.password)

        if (!comparePass) {
            success = false;
            return res.status(404).json({ success, Error: "Password doesn't match!" })
        }

        // console.log(user.id)
        //Create the token
        const payload = {
            user: {
                id: user.id,
            }
        }

        const token = jwt.sign(payload, JWT_SECURE, { expiresIn: TOKEN_EXPIRATION });
        // console.log("con", token)

        //Final
        success = true;
        return res.status(200).json({ success, token })


    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}

async function loginUserDetails(req, res) {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        success = true;
        return res.status(200).json({ success, user })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}



async function signupUserDetails(req, res) {
    try {

        //Validate the user
        let user = await User.find({})

        //Final
        success = true;
        return res.status(200).json({ success, user })


    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


module.exports = {
    signupUser,
    loginUser,
    loginUserDetails,
    signupUserDetails
}