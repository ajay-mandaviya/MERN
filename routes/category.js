const express = require('express')
const router = express.Router();

const {getCategoryById , getCategory, getAllCategory , updateCategory , createCategory , removeCategory } = require("../controllers/category")
const {isAuthenticated , isAdmin , isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

router.param("userId", getUserById)
router.param("categoryId" , getCategoryById)

// actual route

// create route
router.post("/category/create/:userId" , isSignedIn , isAuthenticated , isAdmin , createCategory)

// read route
router.get("/category/:categoryId" , getCategory)
router.get("/categories" , getAllCategory)

// update route
router.put("/category/categoryId/:userId" , isSignedIn , isAuthenticated , isAdmin , updateCategory)

// delte route
router.delete("/category/categoryId/:userId" , isSignedIn , isAuthenticated , isAdmin , removeCategory)
module.exports  = router;

