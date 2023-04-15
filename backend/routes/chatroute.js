import express from "express"
import { addusertochatgroupcontroller, getallchatofsingleuser, groupchatcontroller,  removeuserfromgroupcontroller, renamegroupchatcontroller, singlechatcontroller } from "../controller/chatcontroller.js";
import {authuser} from "../middleware/auth.js"
const router=express.Router();

router.route("/singlechat").post(authuser,singlechatcontroller);
router.route("/chat/me").get(authuser,getallchatofsingleuser);
router.route("/chat/group/create").post(authuser,groupchatcontroller);
router.route("/chat/name/update").put(authuser,renamegroupchatcontroller);
router.route("/chat/user/add").put(authuser,addusertochatgroupcontroller);
router.route("/chat/delete").put(authuser,removeuserfromgroupcontroller);

export default router;