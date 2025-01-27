const express=require("express")
const { signup,login,protectRoute,loginreturn, logout}=require("../controller/jwt")

const routejwt=express.Router();



routejwt.get('/verifyuers', protectRoute,loginreturn)
routejwt.post("/usersignup",signup)
routejwt.post("/userlogin",login)
routejwt.post("/api/logout",logout)
module.exports={routejwt}