const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const  { signout , signup , signin , isSignedIn} = require("../controllers/auth")



router.post("/signup" ,[
    check("email" , "email must be require").isEmail(),
    check("password" , "password must be require").isLength({min : 5}),
]  ,signup)
 


router.post("/signin" ,[
    check("email" , "email must be require").isEmail(),
    check("password" , "password must be require").isLength({min : 5}),
]  ,signin)



router.get("/signout" , signout)



// router.get("/testroute" , isSignedIn , (req, res)=>{
//     res.send("A protectd route")
// })

module.exports = router;