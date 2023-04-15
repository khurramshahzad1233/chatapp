import express from "express";
import Errormiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from 'cors'


import user from "./routes/userroute.js";
import chat from "./routes/chatroute.js";
import message from "./routes/messageroute.js"
const app=express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload())

app.use("/api",user);
app.use("/api",chat);
app.use("/api",message)





app.use(Errormiddleware);
export default app;