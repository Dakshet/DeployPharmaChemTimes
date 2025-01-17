const express = require("express");
const { body } = require("express-validator");
const { fetchUser } = require("../middlewares/fetchUser");
const { addNews, updateNews, deleteNews, fetchSpecificNews, fetchAllNewsForSpecificRoute, fetchSearchNews, addMagazine, deleteMagazine, countVisitNumber, addAD, fetchAllProductData, addProductData, deleteProductData } = require("../controllers/news");

const router = express.Router();


router.get("/fetchspecificpagenews", fetchAllNewsForSpecificRoute)

router.get("/fetchspecificnews/:newsId", fetchSpecificNews)

router.get("/fetchsearchuser", fetchSearchNews)

router.post("/addnews", [
    body("title", "Title must be 3 characters").isLength({ min: 5 }),
    body("body", "Content must be 4 characters").isLength({ min: 10 })
], fetchUser, addNews)

router.post("/addmagazine", fetchUser, addMagazine);

router.put("/updatenews/:newsId", fetchUser, updateNews)

router.delete("/deletenews", fetchUser, deleteNews)

router.delete("/deletemagazine", fetchUser, deleteMagazine)

router.put("/updatecount", countVisitNumber)



// Routes for the AD
router.post("/addadvertisement", fetchUser, addAD)


// Routes for the Chemicals
router.get("/fetchallproductdata", fetchAllProductData)

router.post("/addproductdata", fetchUser, addProductData)

router.delete("/deleteproductdata", deleteProductData)

module.exports = router;