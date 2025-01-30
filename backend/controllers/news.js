const News = require("../models/news");
const cloudinary = require("../middlewares/cloudinary")
const fs = require('fs');
const path = require("path")
const CountVisit = require("../models/countVisit");
const nodemailer = require('nodemailer');
const User = require("../models/user");
const Comment = require("../models/comment");
const { jsPDF } = require("jspdf");     // Import the jsPDF library
require("jspdf-autotable"); // Import jsPDF autoTable plugin
const Chemicals = require("../models/chemicalProd");
const { google } = require("googleapis");
const stream = require('stream');

let success = false;





// Keys 
const private_key = process.env.PRIVATE_KEY
const client_email = process.env.CLIENT_EMAIL
// const spreadsheetId = process.env.SPREADSHEETID


// Get Auth Here
async function getAuth() {
    try {

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: client_email,
                private_key: private_key
            },
            scopes: ["https://www.googleapis.com/auth/drive"]
        })

        return auth;

    } catch (error) {
        console.log("Get Auth", error.message)
    }
}



// Access Google Drive Using Buffer Storage
async function uploadToGoogleDrive(fileBuffer, mimeType, fileName) {
    const auth = await getAuth();

    // Obtain an authenticated client
    const drive = google.drive({ version: "v3", auth })

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    const response = await drive.files.create({
        resource: {
            name: fileName,
            parents: ['1aIAMB1FUnvVNNDo1-TW65gGLzqbmuApb']  // Optional: specify a destination folder
        },
        media: {
            mimeType: mimeType,
            body: bufferStream
        },
        fields: 'id, webViewLink'
    });

    return response.data;
}



// Using Google drive image.
async function fetchImageAndConvertedIntoHash(fileId) {
    try {
        // let imageUrl = "https://res.cloudinary.com/dpkaxrntd/image/upload/v1729657532/iqgpcl1hnra06rdi1e93.jpg"

        // let fileId = req.params.id;

        let imageUrl = `https://lh3.googleusercontent.com/d/${fileId}`

        // Download the image as a buffer using axios
        // const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const response = await fetch(imageUrl, {
            method: 'GET', // You can use 'GET' or leave it out as it's the default
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Convert the response to an ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        // Convert the buffer to base64
        // const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
        const imageBase64 = Buffer.from(arrayBuffer).toString('base64');
        const imageMimeType = 'image/jpeg'; // Update this if using a different image type (e.g., image/png)

        // Send the base64 string back to the frontend
        return `data:${imageMimeType};base64,${imageBase64}`;
        // return res.status(200).json({ success: true, imageUrl });



    } catch (error) {
        console.error("Error fetching image:", error.message);
        return null; // Return null if the image fetch fails
    }
}




async function fetchAllNewsForSpecificRoute(req, res) {
    try {
        let allNews = await News.find({ tag: req.query.tag }).sort({ createdAt: -1 });

        // console.log(allNews.length);

        if (!allNews.length) {
            return res.status(404).json({ success: false, allNews: "No news found" });
        }

        // Use Promise.all to fetch all images asynchronously
        allNews = await Promise.all(allNews.map(async (article) => {
            const base64Image = await fetchImageAndConvertedIntoHash(article.coverImageURL);
            return {
                ...article.toObject(), // Convert Mongoose document to plain object
                coverImageURL: base64Image || article.coverImageURL // Use original if fetch fails
            };
        }));

        return res.status(200).json({ success: true, allNews });

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function fetchSpecificNews(req, res) {
    try {
        const news = await News.findById(req.params.newsId)

        const id = await fetchImageAndConvertedIntoHash(news.coverImageURL);

        news.coverImageURL = id;

        // console.log(news);

        success = true;
        return res.status(200).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function fetchSearchNews(req, res) {
    try {

        const keyword = req.query.search ? {
            title: { $regex: req.query.search, $options: "i" }
        } : {};

        const news = await News.find({ ...keyword })

        success = true;
        return res.status(200).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function addNews(req, res) {
    try {
        //Destructure the request
        const { title, body, tag } = req.body;

        // console.log(req.body);

        // Upload to Google Drive directly using stream
        const file = req.file;

        const driveResponse = await uploadToGoogleDrive(file.buffer, file.mimetype, `${title}.jpg`);

        // const imageLinkShree = driveResponse.webViewLink;
        const copyImageId = driveResponse.id;


        //Add data in DB
        let news = await News.create({
            title,
            body,
            tag,
            createdUser: req.user.id,
            coverImageURL: copyImageId,
        })

        news = await news.save();

        //Final
        success = true;
        return res.status(201).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function addMagazine(req, res) {
    try {
        // //Destructure the request
        const { title, body } = req.body;

        // Upload to Google Drive directly using stream
        const file = req.file;

        const driveResponse = await uploadToGoogleDrive(file.buffer, file.mimetype, `${title}.jpg`);

        // const imageLinkShree = driveResponse.webViewLink;
        const copyImageId = driveResponse.id;


        //Add data in DB
        let news = await News.create({
            title,
            body,
            tag: "MAGAZINE",
            createdUser: req.user.id,
            coverImageURL: copyImageId
        })

        news = await news.save();
        // console.log(news);

        // //Final
        success = true;
        return res.status(201).json({ success, news })

        // console.log(req.file);
        // Give the data type also so accroding to that they fetch it.

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function updateNews(req, res) {
    try {
        //Destructrue the request
        const { title, desc, tag, prevDescription } = req.body;
        // console.log("ccc", prevDescription);


        // //Logic to Find out src link from the description, but this logic for only one src are present in the description that time they work.

        // function findImgSrc(htmlString) {
        //     const regex = /<img[^>]+src="([^"]+)"/g; // Regular expression to match img tag with src attribute
        //     const matches = htmlString.matchAll(regex); // Find all matches

        //     const imgSrcList = [];
        //     for (const match of matches) {
        //         imgSrcList.push(match[1]); // Extract and store the captured src attribute
        //     }

        //     return imgSrcList;
        // }

        // const imgSrcList = findImgSrc(desc);
        // const imgSrcList1 = findImgSrc(prevDescription);

        // if (imgSrcList.length !== 0 && imgSrcList1.length !== 0) {

        //     async function compareArrays(arr1, arr2) {
        //         const matches = arr1.filter(element => arr2.includes(element));
        //         const unmatches = arr2.filter(element => !arr1.includes(element));

        //         if (unmatches.length !== 0) {
        //             //Delete news from cloudinary
        //             for (let imgLink of unmatches) {
        //                 try {
        //                     //Separate the cloudinary image id
        //                     const urlArray = imgLink.split("/");
        //                     const image = urlArray[urlArray.length - 1];
        //                     const imageName = image.split(".")[0];

        //                     //Delete from cloudinary
        //                     const result = await cloudinary.uploader.destroy(imageName);
        //                     // console.log(result);
        //                 } catch (error) {
        //                     success = false;
        //                     return res.status(400).json({ success, Error: error });
        //                 }
        //             }
        //         }
        //         else {
        //             console.log(matches);
        //         }
        //     }

        //     compareArrays(imgSrcList, imgSrcList1);
        // }

        //Create the new object
        const newNews = {};

        if (title) {
            newNews.title = title;
        }

        if (desc) {
            newNews.body = desc;
        }

        if (tag) {
            newNews.tag = tag;
        }


        //Verified the news id first
        let news = await News.findById(req.params.newsId)

        if (!news) {
            success = false;
            return res.status(404).json({ success, Error: "News is not found!" })
        }

        //Verified the news user and login user
        if (news.createdUser.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "You can't edit news!" })
        }

        //Update news
        news = await News.findByIdAndUpdate(req.params.newsId, { $set: newNews }, { new: true })

        //Final
        success = true;
        return res.status(200).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function deleteNews(req, res) {
    try {
        // //Verified the news id first
        // let coverImageURL = req.query.coverImage;

        // //Separate the cloudinary image id
        // const urlArray = coverImageURL.split("/");
        // const image = urlArray[urlArray.length - 1];
        // const imageName = image.split(".")[0];


        let news = await News.findById(req.query.id);


        if (!news) {
            success = false;
            return res.status(404).json({ success, Error: "News is not found!" })
        }

        //Verified the news user and login user
        if (news.createdUser.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "You can't delete news!" })
        }

        //Delete news
        let newss = await News.findByIdAndDelete(req.query.id)

        const auth = await getAuth();
        const drive = await google.drive({ version: "v3", auth })

        let responseDrive = await drive.files.delete(
            {
                fileId: news.coverImageURL
            })

        console.log(responseDrive);

        //         //Delete image from cloudinary
        //         await cloudinary.uploader.destroy(imageName, (error, result) => {
        //             // console.log(error, result);
        //             try {
        //                 // console.log(result);
        //             } catch (error) {
        //                 success = false;
        //                 return res.status(400).json({ success, Error: error });
        //             }
        //         })
        // 
        //Final
        success = true;
        return res.status(200).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function deleteMagazine(req, res) {
    try {
        //Verified the news id first
        // let coverImageURL = req.query.coverImage;
        let pdfURL = req.query.pd;


        //Separate the cloudinary image id
        // const urlArray = coverImageURL.split("/");
        // const image = urlArray[urlArray.length - 1];
        // const imageName = image.split(".")[0];

        //Separate the 
        const urlArrayPdf = pdfURL.split("/");
        const pdf = urlArrayPdf[urlArrayPdf.length - 1];
        // const pdfName = pdf.split(".")[0];


        let news = await News.findById(req.query.id);

        if (!news) {
            success = false;
            return res.status(404).json({ success, Error: "News is not found!" })
        }

        //Verified the news user and login user
        if (news.createdUser.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "You can't delete news!" })
        }

        const auth = await getAuth();
        const drive = await google.drive({ version: "v3", auth })

        let responseDrive = await drive.files.delete(
            {
                fileId: news.coverImageURL
            })

        console.log(responseDrive);

        //Delete news

        //1] Delete from Storage
        // let allPdf = await News.findById(req.query.id);

        // try {
        //     fs.unlinkSync(`../backend/uploads/${allPdf.body}`);

        // } catch (error) {
        //     console.log(error);

        // }


        //2] Delete from backend
        news = await News.findByIdAndDelete(req.query.id)

        // // Delete the image from Cloudinary
        // const imageDeletionResult = await cloudinary.uploader.destroy(imageName);

        // if (imageDeletionResult.result !== 'ok') {
        //     console.log(`Error deleting image: ${imageDeletionResult}`);
        //     return res.status(500).json({ success: false, Error: "Failed to delete image from Cloudinary." });
        // }


        // // Delete the PDF from Cloudinary (resource_type: "raw" is required for non-image files like PDFs)
        const pdfDeletionResult = await cloudinary.uploader.destroy(pdf, {
            resource_type: "raw"
        });

        if (pdfDeletionResult.result !== 'ok' && pdfDeletionResult.result !== 'not found') {

            console.log(`Error deleting PDF: ${JSON.stringify(pdfDeletionResult)}`);
            return res.status(500).json({ success: false, Error: "Failed to delete PDF from Cloudinary." });

        } else if (pdfDeletionResult.result === 'not found') {
            console.log("PDF not found, skipping deletion.");
        }

        //Final
        success = true;
        return res.status(200).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}




// Method
async function createAdminPDF() {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    const userData = await User.find({});
    const newsData = await News.find({});
    const commentData = await Comment.find({});
    const countVisitData = await CountVisit.find({});

    // Fetch the data
    let data = [...userData, ...newsData, ...commentData, ...countVisitData];
    // console.log(data[1].email)
    // if (data[1].count) {
    //     console.log("true");
    // }

    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    doc.text("pharmaChem Times 24", 60, 20);

    doc.setFont("helvetica", "normal");
    doc.setLineWidth(0.5);
    doc.line(20, 28, 190, 28);


    const date = new Date();

    // Extract components of the date
    const day = date.getDate();
    const months = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // // Combine them into a number
    const numericDate = (`${day}-${months}-${year}`);

    doc.setFontSize(10);
    doc.text(`Date: ${numericDate}`, 159, 37);


    doc.setFontSize(8);

    // Define starting Y position and page height
    let startY = 50;
    const pageHeight = doc.internal.pageSize.height;

    // Process each record
    const lineSpacing = 5; // Adjust spacing between lines

    for (let i = 0; i < data.length; i++) {

        const recordLines = [];
        let recordHeight = 0;

        // Prepare record content and calculate the height dynamically
        if (data[i].email) {
            recordLines.push(`_id: ${data[i]._id} name: ${data[i].name} email: ${data[i].email}`);
            recordLines.push(`password: ${data[i].password}`);
            recordLines.push(`profileImageURL: ${data[i].profileImageURL}`);
            recordLines.push(`role: ${data[i].role} createdAt: ${data[i].createdAt}`);
            recordLines.push(`updatedAt: ${data[i].updatedAt} __v: ${data[i].__v}`);
        }
        if (data[i].body) {
            recordLines.push(`_id: ${data[i]._id} createdUser: ${data[i].createdUser}`);
            const titleLine = doc.splitTextToSize(`title: ${data[i].title}`, 180);
            const bodyLine = doc.splitTextToSize(`body: ${data[i].body}`, 180);
            recordLines.push(...titleLine);
            recordLines.push(...bodyLine);
            recordLines.push(`coverImageURL: ${data[i].coverImageURL}`);
            recordLines.push(`tag: ${data[i].tag} createdAt: ${data[i].createdAt}`);
            recordLines.push(`updatedAt: ${data[i].updatedAt} __v: ${data[i].__v}`);
        }
        if (data[i].content) {
            recordLines.push(`_id: ${data[i]._id} newsId: ${data[i].newsId}`);
            const contentLine = doc.splitTextToSize(`content: ${data[i].content}`, 180);
            recordLines.push(...contentLine);
            recordLines.push(` createdUser: ${data[i].createdUser} createdAt: ${data[i].createdAt}`);
            recordLines.push(`updatedAt: ${data[i].updatedAt} __v: ${data[i].__v}`);
        }
        if (data[i].month) {
            recordLines.push(`_id: ${data[i]._id} month: ${data[i].month}`);
            recordLines.push(` count: ${data[i].count} createdAt: ${data[i].createdAt}`);
            recordLines.push(`updatedAt: ${data[i].updatedAt} __v: ${data[i].__v}`);
        }


        // Calculate total height of this record
        recordHeight = recordLines.length * lineSpacing;


        // Check if the entire record fits on the current page
        if (startY + recordHeight > pageHeight - 10) { // Leave some bottom margin
            doc.addPage(); // Add a new page
            startY = 10;   // Reset Y position for the new page
        }


        // Render the record
        recordLines.forEach((line) => {
            doc.text(line, 20, startY);
            startY += lineSpacing;
        });
        startY += lineSpacing + 7; // Add extra spacing after each record
    }


    // Save the PDF to a temporary location
    const tempDir = require('os').tmpdir();
    const outputPath = path.join(tempDir, "pharmaChem-times-data.pdf");

    const arrayBuffer = doc.output("arraybuffer");
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(outputPath, buffer);

    console.log(`PDF saved at: ${outputPath}`);
    return outputPath;
}
// createAdminPDF();



// Fetch All Data from sheet 1
async function sendAdminMails() {
    try {

        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.USER,       // Sender gmail address 
                pass: process.env.APP_PASSWORD,     // App password from gmail account this process are written on the bottom of the web page.
            },
        });


        const pdfPath = await createAdminPDF();

        let attachments = [
            {
                filename: "pharmaChem-times-data.pdf",
                path: pdfPath,
                contentType: "application/pdf"
            },
        ]

        // mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "pharmaChem Times 24",
                address: process.env.USER,
            }, // sender address
            // to: "bar@example.com, baz@example.com", // When we have list of receivers and here add gym mail account and our gym account.
            to: "dakshghole@gmail.com",
            // to: `${email}`,
            subject: "All data of pharmaChem times", // Subject line
            text: "pharmaChem Times 24",
            attachments: attachments
        });

        console.log("Message sent: %s", info.messageId);


    } catch (error) {
        console.log("Read data error", error.message);
        // return res.status(400).json({ Error: error.message });
    }
}



async function countVisitNumber(req, res) {
    try {
        //Verified the news id first
        let { month } = req.query;

        // Ensure month is a valid number
        if (isNaN(month) || month < 0 || month > 11) {
            return res.status(400).json({ success: false, error: "Invalid month value" });
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[parseInt(month, 10)];


        // let createMonth = await CountVisit.create({
        //     month: "Nov",
        //     count: 0,
        // })

        // createMonth = await CountVisit.save();

        // console.log(createMonth);

        // Update visit count for the month
        let news = await CountVisit.findOneAndUpdate(
            { month: monthName },
            { $inc: { count: 1 } },
            { new: true, upsert: true } // Ensures document is created if not found
        );


        // Get the current date in ddmmyyyy format
        const date = new Date();
        const numericDate = parseInt(`${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`, 10);

        // Check and update 'currentDateMail' entry
        let currentDateMail = await CountVisit.findOne({ month: "currentDateMail" });


        if (!currentDateMail || currentDateMail.count !== numericDate) {
            await CountVisit.findOneAndUpdate(
                { month: "currentDateMail" },
                { count: numericDate },
                { upsert: true }
            );

            await sendAdminMails(); // Send mail when the date changes
        }


        //Final
        success = true;
        return res.status(200).json({ success, count: "Successfully count" })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}




// Add AD
async function addAD(req, res) {
    try {
        //Destructure the request
        const { body } = req.body;

        // Upload to Google Drive directly using stream
        const file = req.file;

        const driveResponse = await uploadToGoogleDrive(file.buffer, file.mimetype, `${body}.jpg`);

        // const imageLinkShree = driveResponse.webViewLink;
        const copyImageId = driveResponse.id;

        //Add data in DB
        let news = await News.create({
            body,
            tag: "AD",
            createdUser: req.user.id,
            coverImageURL: copyImageId,
        })

        news = await news.save();

        //Final
        success = true;
        return res.status(201).json({ success, news })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}




// Fetch All Chemical Product Data
async function fetchAllProductData(req, res) {
    try {
        const chemicals = await Chemicals.find({});

        success = true;
        return res.status(200).json({ success, chemicals })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function addProductData(req, res) {
    try {
        //Destructure the request
        const { companyName, productName, companyLink } = req.body;

        const productArray = productName.split(', ').map(product => product.trim()); // Split and trim products    

        let chemical;

        //Add data in DB
        chemical = await Chemicals.create({
            companyName,
            productName: productArray,
            companyLink,
            createdUser: req.user.id,
        })

        chemical = await chemical.save();

        // Final
        success = true;
        return res.status(201).json({ success, chemical })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}



async function updateCompanyData(req, res) {
    try {
        //Destructrue the request
        const { companyName, productName, companyLink } = req.body;

        //Create the new object
        const newCompanyData = {};

        if (companyName) {
            newCompanyData.companyName = companyName;
        }

        if (productName) {
            newCompanyData.productName = productName;
        }

        if (companyLink) {
            newCompanyData.companyLink = companyLink;
        }


        //Verified the news id first 
        let companyData = await Chemicals.findById(req.params.companyid)

        if (!companyData) {
            success = false;
            return res.status(404).json({ success, Error: "Company Data is not found!" })
        }

        //Verified the news user and login user
        if (companyData.createdUser.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "You can't edit company data!" })
        }

        //Update news
        companyData = await Chemicals.findByIdAndUpdate(req.params.companyid, { $set: newCompanyData }, { new: true })


        // Final
        success = true;
        return res.status(200).json({ success, companyData })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}



// Delete Product data
async function deleteProductData(req, res) {
    try {

        let chemical = await Chemicals.findById(req.query.id);


        if (!chemical) {
            success = false;
            return res.status(404).json({ success, Error: "Chemicals is not found!" })
        }

        //Verified the news user and login user
        if (chemical.createdUser.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "You can't delete chemical!" })
        }

        //Delete news
        chemical = await Chemicals.findByIdAndDelete(req.query.id)

        //Final
        success = true;
        return res.status(200).json({ success, chemical })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


module.exports = {
    addNews,
    updateNews,
    deleteNews,
    fetchSpecificNews,
    fetchAllNewsForSpecificRoute,
    fetchSearchNews,
    addMagazine,
    deleteMagazine,
    countVisitNumber,
    addAD,
    fetchAllProductData,
    addProductData,
    updateCompanyData,
    deleteProductData
}
