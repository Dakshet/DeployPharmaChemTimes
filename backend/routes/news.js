const express = require("express");
const { fetchUser } = require("../middlewares/fetchUser");
const { addNews, updateNews, deleteNews, fetchSpecificNews, fetchAllNewsForSpecificRoute, fetchSearchNews, addMagazine, deleteMagazine, countVisitNumber, addAD, fetchAllProductData, addProductData, deleteProductData, updateCompanyData } = require("../controllers/news");
const multer = require('multer')

const router = express.Router();


// Custom Storage engine for multer
const googleDriveStorage = multer.memoryStorage();

const upload = multer({ storage: googleDriveStorage });


router.get("/fetchspecificpagenews", fetchAllNewsForSpecificRoute)

router.get("/fetchspecificnews/:newsId", fetchSpecificNews)

router.get("/fetchsearchuser", fetchSearchNews)

router.post("/addnews", upload.single("uPhoto"), fetchUser, addNews)

router.post("/addmagazine", upload.single("coverImageURL"), fetchUser, addMagazine);

router.put("/updatenews/:newsId", fetchUser, updateNews)

router.delete("/deletenews", fetchUser, deleteNews)

router.delete("/deletemagazine", fetchUser, deleteMagazine)

router.put("/updatecount", countVisitNumber)



// Routes for the AD
router.post("/addadvertisement", upload.single("coverImageURLs"), fetchUser, addAD)


// Routes for the Chemicals
router.get("/fetchallproductdata", fetchAllProductData)

router.post("/addproductdata", fetchUser, addProductData)

router.put("/updatecompanydata/:companyid", fetchUser, updateCompanyData)

router.delete("/deleteproductdata", fetchUser, deleteProductData)

module.exports = router;