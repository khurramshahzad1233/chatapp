import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import messagedata from "../models/messageschema.js";
import userdata from "../models/userschema.js";
import chatdata from "../models/chatschema.js";


export const getallmessage=catchasyncerror(async(req,res,next)=>{
    const allmessage=await messagedata.find({chat:req.params.chatid})
    .populate("chat")
    .populate("sender","name email avatar");

    res.status(200).json({
        success:true,
        allmessage,
    })


});



export const sendmessagecontroller=catchasyncerror(async(req,res,next)=>{
    const {chatid,content}=req.body;
    

    if(!content ||!chatid){
        return next(new Errorhandler("plz enter your message and id",400))
    };

    let sender=req.user.id;
    let chat=chatid;
    content;

    let sendmessage=await messagedata.create({sender,chat,content});
    sendmessage=await sendmessage.populate("sender","name avatar");
    sendmessage=await sendmessage.populate("chat");
    sendmessage=await userdata.populate(sendmessage,{
        path:"chat.users",
        select:"name email avatar",
    });
    // console.log(sendmessage);

    await chatdata.findByIdAndUpdate(req.body.chatid,{latestmessage:sendmessage});

    res.status(200).json({
        success:true,
        sendmessage,
    })

})