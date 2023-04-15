import express from "express"
import { getallmessage, sendmessagecontroller } from "../controller/messagecontroller.js";
import {authuser} from "../middleware/auth.js"
const router=express.Router();

router.route("/message/create").post(authuser,sendmessagecontroller);
router.route("/message/all/:chatid").get(authuser,getallmessage)


export default router;