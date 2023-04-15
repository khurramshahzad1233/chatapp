import mongoose from "mongoose"
const kittySchema=new mongoose.Schema({
    content:{
        type:String,
        trim:true,
    },
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    receiver:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"user"
        }
    ],
    chat:{
        type:mongoose.Schema.ObjectId,
        ref:"chat"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
const messagedata=mongoose.model("message",kittySchema);

export default messagedata;