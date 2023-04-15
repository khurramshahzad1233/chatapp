import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const kittySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        select:false,

    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});

kittySchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    };
    this.password=await bcrypt.hash(this.password,10);
    next()
});

kittySchema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
};

kittySchema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.jwt_secret,{
        expiresIn:"10d"
    })
};


const userdata=mongoose.model("user",kittySchema);
export default userdata;