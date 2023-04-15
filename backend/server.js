import app from "./app.js"
import dotenv from "dotenv"
if(process.config.env!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};
import mongoose from "mongoose";
import cloudinary from "cloudinary";



import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors"

mongoose.set("strictQuery",false);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongodb);
};


cloudinary.v2.config({
    cloud_name:process.env.cloudinary_name,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret,
})
    





const httpServer = createServer(app);

const io = new Server(httpServer,{
  cors:{
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
    
  },
   
  connectionStateRecovery: {
    // default values
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
});

io.on("connection", (socket) => {
  console.log(` connected successfully: ${socket.id}`); // x8WIv7-mJelg7on_ALbx

  socket.on("setup",(user)=>{
    socket.join(user._id);
    console.log(user._id)
    socket.emit("connected")


  });

  socket.on("join chat",(room)=>{
    socket.join(room);
    console.log("user joined room")
  });

  socket.on("send message",(msg)=>{
    let chat=msg.chat;
    // if(chat.users===undefined){return}
    // console.log(msg);
    
    chat.users.forEach((user)=>{
      if(user._id==msg.sender._id)return;
      
      socket.in(user._id).emit("message received",msg);
    })
  });
  

  socket.on("typing",(chat)=>{
    chat.users.forEach((user)=>{
      
      socket.in(user._id).emit("typing")
    })
  })

  socket.on("stop typing",(chat)=>{
    chat.users.forEach((user)=>{
      socket.in(user._id).emit("stop typing")
    })
  });




  socket.off("setup",()=>{
    console.log("user disconnected");
    socket.leave(user._id)
  })
});









httpServer.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
    
});