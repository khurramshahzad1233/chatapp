import catchasyncerror from "../middleware/catchasyncerror.js"
import Errorhandler from "../utils/errorhandler.js"
import userdata from "../models/userschema.js"
import cloudinary from "cloudinary"
import sendtoken from "../utils/sendtoken.js"


export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body;
    if(!name ||!email ||!password){
        return next(new Errorhandler("plz enter all fields",400))
    };

    let user=await userdata.findOne({email});

    if(user){
        return next(new Errorhandler("user already exist",409))
    };
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatar",
        width:150,
        crop:"scale",
    });
    user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });
    sendtoken(res,user,201,"register successfully")
});


export const loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("plz enter email and password",400))
    };

    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("invalid email or password",401))
    };

    const matchpassword=await user.comparepassword(password);

    if(!matchpassword){
        return next(new Errorhandler("invalid email or password",401))
    };

    sendtoken(res,user,200,"login successfully")
})


export const getsearchusercontroller=catchasyncerror(async(req,res,next)=>{
    const keyword=req.query.search?{
        $or:[
            {
                name:{
                    $regex:req.query.search,
                    $options:"i",
                }
            },{
                email:{
                    $regex:req.query.search,
                    $options:"i"
                }
            },
        ],
    }:{};

    const alluser=await userdata.find({...keyword}).find({_id:{$ne:req.user.id}});

    res.status(200).json({
        success:true,
        alluser,
    })
});


export const getprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);

    if(!user){
        return next(
            new Errorhandler("plz login to acccess the resource",400)
        )
    };

    res.status(200).json({
        success:true,
        user,
    })
})