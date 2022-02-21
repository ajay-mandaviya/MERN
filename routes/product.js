const express = require("express")
const router =  express.Router()


const {isSignedIn , isAuthenticated , isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getProductById , createProduct , getProduct, photo , deleteProduct , updatePorduct , getAllProducts , getAllUniqueCategory} = require("../controllers/product")

// all params
router.param("userId" , getUserById)
router.param("productId" , getProductById)

// all are actual route

// create route
router.post("/products/create/:userId" , isSignedIn , isAuthenticated , isAdmin , createProduct)

//  read route
router.get("/products/:productId" , getProduct)
router.get("/products/photo/:productId" , photo)


// update route
router.put("/products/:productId/:userId" , isSignedIn , isAuthenticated , isAdmin , updatePorduct)
// delete route
router.delete("/products/:productId/:userId" , isSignedIn , isAuthenticated , isAdmin , deleteProduct)


// listing route
router.get("/products" , getAllProducts)
router.get("/products/categories" , getAllUniqueCategory)

module.exports = router;