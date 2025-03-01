const { validationResult } = require("express-validator");
const Subscribe = require("../models/subscription");
const nodemailer = require('nodemailer');


// Fetch All Data from sheet 1
async function sendMails(email, subject, text) {
    try {

        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.USERMAIL,       // Sender gmail address 
                pass: process.env.APP_PASSWORDEMAIL,     // App password from gmail account this process are written on the bottom of the web page.
            },
        });


        // const pdfPath = await createAdminPDF();

        // let attachments = [
        //     {
        //         filename: "pharmaChem-times-data.pdf",
        //         path: pdfPath,
        //         contentType: "application/pdf"
        //     },
        // ]

        // mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "PharmaChem Times",
                address: process.env.USERMAIL,
            }, // sender address
            // to: "bar@example.com, baz@example.com", // When we have list of receivers and here add gym mail account and our gym account.
            to: `${email},pharmachemtimes@gmail.com`,
            subject: `${subject}`, // Subject line
            html: `${text}`
            // attachments: attachments
        });

        console.log("Message sent: %s", info.messageId);


    } catch (error) {
        console.log("Read data error", error.message);
        // return res.status(400).json({ Error: error.message });
    }
}



async function addSubscription(req, res) {
    try {

        const { name, address, country, number, email } = req.body;

        // Validate the fields
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, Error: errors.array()[0].msg })
        }

        // Verify the user
        let user = await Subscribe.findOne({ email: req.body.email });

        if (user) {
            success = false;
            return res.status(400).json({ success, Error: "User with this email id are already subscribed!" })
        }

        user = await Subscribe.create({
            name,
            address,
            country,
            number,
            email
        })

        let subject = "Your Subscription Form Has Been Successfully Submitted";

        let text = `
              <p>Dear ${user.name},</p>
                <p>Thank you for submitting your subscription form on <strong>PharmaChem Times</strong>. We have received your request and will process it soon.</p>

                <h3>Subscription Schemes Available:</h3>
                <ul>
                    <li>✅ <strong>Free Email Subscription:</strong> Receive a daily electronic newsletter with the top news of the day, delivered straight to your inbox.</li>
                    <li>✅ <strong>Free Print Subscription:</strong> Get a monthly hard copy of our print magazine delivered to your address.</li>
                </ul>

                <p><strong>📢 Important Note:</strong><br>
                Your subscription is not yet confirmed. To complete the process, please proceed with the payment. Once we receive the payment, we will activate your subscription and send you a confirmation email.</p>

                <p><strong>For queries, contact:</strong><br>
                📞 <strong>Jitendra Nate</strong> - +91 8779345336</p>

                <p>Best Regards,</p>
                <p><strong>PharmaChem Times</strong></p>
                <p><a href="https://www.pharmachemtimes.in">Visit Our Website</a></p>
        `


        await sendMails(user.email, subject, text)

        //Final
        success = true;
        return res.status(201).json({ success })


    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function getSubscriptionData(req, res) {
    try {

        let allSubscriptionData;

        if (req.params.paymentStatus === "YES") {
            allSubscriptionData = await Subscribe.find({ paymentStatus: "YES" })

        }
        else {
            allSubscriptionData = await Subscribe.find({ paymentStatus: "NO" })

        }

        // const { name, address, country, number, email } = req.body;



        //Final
        success = true;
        return res.status(201).json({ success, subscriptionData: allSubscriptionData })


    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function updateSubscriptionData(req, res) {
    try {

        let userSubscriptionData = await Subscribe.findById(req.params.id);


        if (!userSubscriptionData) {
            success = false;
            return res.status(404).json({ success, Error: "User is not found!" })
        }

        userSubscriptionData = await Subscribe.findByIdAndUpdate(req.params.id, { $set: { paymentStatus: "YES" } }, { new: true })

        let subject = "Your Subscription is Confirmed! 🎉";

        let text = `
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>🎉 Welcome to PharmaChem Times, ${userSubscriptionData.name}! 🎉</h2>
                <p>We are thrilled to inform you that your <strong>Premium</strong> subscription is now active. Thank you for supporting <strong>PharmaChem Times</strong>!</p>

                <h3>What You Get:</h3>
                <ul>
                    <li>📰 Daily Email Newsletter with top industry news</li>
                    <li>📩 Monthly Print Magazine delivered to your doorstep (for print subscribers)</li>
                </ul>

                <p>We are excited to have you with us and look forward to keeping you updated with the latest trends and news in the pharma and chemical industry.</p>

                <p>📞 Need help or have any questions? Contact our support team:</p>
                <p><strong>Jitendra Nate</strong> - +91 8779345336</p>

                <p>Best Regards,</p>
                <p><strong>PharmaChem Times</strong></p>
                <p><a href="https://www.pharmachemtimes.in" style="color: #007bff; text-decoration: none;">Visit Our Website</a></p>
            </body>
        `


        await sendMails(userSubscriptionData.email, subject, text)

        //Final
        success = true;
        return res.status(201).json({ success, userSubscriptionData })


    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}




async function deleteSubscriptionData(req, res) {
    try {

        let subscriptionUser = await Subscribe.findById(req.query.id);

        if (!subscriptionUser) {
            success = false;
            return res.status(404).json({ success, Error: "Subscription User is not found!" })
        }

        //Delete news
        subscriptionUser = await Subscribe.findByIdAndDelete(req.query.id)


        //Final
        success = true;
        return res.status(200).json({ success, subscriptionUser })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}

module.exports = {
    addSubscription,
    getSubscriptionData,
    updateSubscriptionData,
    deleteSubscriptionData,
    sendMails
}