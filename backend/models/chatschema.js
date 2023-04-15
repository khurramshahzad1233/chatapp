import mongoose from "mongoose";
const kittySchema=new mongoose.Schema({
    chatname:{
        type:String,
        trim:true,
    },
    isgroupchat:{
        type:Boolean,
        default:false,
    },
    latestmessage:{
        type:mongoose.Schema.ObjectId,
        ref:"message"
    },
    users:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"user"
        }
    ],
    groupadmin:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
const chatdata=mongoose.model("chat",kittySchema);
export default chatdata;