require('dotenv').config()

const express = require("express");
const cors = require("cors");
const path = require("path")
const { handleToDB } = require("./connection");
// const prerender = require('prerender-node');


const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://deploy-pharma-chem-times-f.vercel.app";
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
// const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN;
// console.log(FRONTEND_URL);
// const FRONTEND_URL = "https://deploy-news-web-frontend.vercel.app";


// Add your prerender.io token here
// prerender.set('prerenderToken', PRERENDER_TOKEN);


// Route Import
const userRoute = require("./routes/user")
const newsRoute = require('./routes/news')
const commentRoute = require("./routes/comment")

// MongoDB connection
handleToDB(MONGODB_URL).then(() => {
    console.log("MongoDB Connected Successfully!");

}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if the DB connection fails
})


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(path.resolve("./uploads")));


// Cors
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth_token"],
    credentials: true,
}));

// app.use(prerender); 


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


// Explicit handling of preflight requests
// app.options('*', (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(204); // No Content
// });





// app.get("/news/fetchallproductdata", async (req, res) => {
//     try {
//         // const products = await fetchProductDataFromDB(); // Example function
//         return res.status(200).json({ Data: "Successfully send data" });
//     } catch (error) {
//         console.error("Error fetching product data:", error.message);
//         res.status(500).json({ error: "Failed to fetch product data" });
//     }
// });


// Routes
app.get('/', (req, res) => {
    return res.json("The Dakshet Ghole");
});
app.use("/user", userRoute);

app.use("/news", newsRoute);

app.use('/comment', commentRoute)

// Logging for requests (optional)
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next();
// });
////////

// function getPosts() {
//     let val = "hello"
//     return val;
// }

// app.get("/news/fetchallnews", async (req, res) => {
//     if (req.method === 'GET') {
//         // const posts = await getPosts(); // your logic to get posts
//         const posts = "hello"
//         res.status(200).json(posts);
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// })


// Listen
const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


server.setTimeout(120000); 