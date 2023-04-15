import express from "express"
import { getsearchusercontroller, getprofilecontroller, loginusercontroller, registerusercontroller } from "../controller/usercontroller.js";
import {authuser} from "../middleware/auth.js"
const router=express.Router();


router.route("/user/register").post(registerusercontroller);
router.route("/user/login").post(loginusercontroller)
router.route("/users").get(authuser,getsearchusercontroller);
router.route("/user/me").get(authuser,getprofilecontroller)

export default router;