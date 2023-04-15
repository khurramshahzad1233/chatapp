import catchasyncerror from "../middleware/catchasyncerror.js"
import Errorhandler from "../utils/errorhandler.js"
import chatdata from "../models/chatschema.js"
import userdata from "../models/userschema.js"


export const singlechatcontroller=catchasyncerror(async(req,res,next)=>{
    const {userid}=req.body;

    if(!userid){
        return next(new Errorhandler("user id not found",400))
    };

    let ischat=await chatdata.find({
        isgroupchat:false,
        $and:[
            {
                users:{$elemMatch:{$eq:req.user.id}}
            },
            {
                users:{$elemMatch:{$eq:userid}}
            },
        ],
    }).populate("users","-password").populate("latestmessage");

    ischat=await userdata.populate(ischat,{
        path:"latestmessage.sender",
        select:"name email avatar"
    });

    if(ischat.length>0){
        res.status(200).json({
            success:true,
           
            chat:ischat[0],
        })
    }else{
        let chatinfo={
            chatname:"sander",
            isgroupdata:false,
            users:[req.user.id,userid]
        };
    
        const createchat=await chatdata.create(chatinfo);
        let chat=await chatdata.findOne({_id:createchat._id}).populate(
            "users","-password"
        );
        res.status(200).json({
            success:true,
            chat,
            messgae:"new chat created successfully"
    
        });
    }
    
    
});


export const getallchatofsingleuser=catchasyncerror(async(req,res,next)=>{
    let allchat=await chatdata.find({
        users:{$elemMatch:{$eq:req.user.id}}
    })
    .populate("users","-password")
    .populate("groupadmin","-password")
    .populate("latestmessage")
    .sort({updatedAt:-1});
    await userdata.populate(allchat,{
        path:"latesmessage.sender",
        select:"name email avatar"
    });
    res.status(200).json({
        success:true,
        allchat,
    })

});



export const groupchatcontroller=catchasyncerror(async(req,res,next)=>{
    let {chatname}=req.body;
    let users=JSON.parse(req.body.users);

    if(!req.body.users||!req.body.chatname){
        return next(new Errorhandler("plz complete all fields",400))
    };


    if(users.length<2){
        return next(new Errorhandler("plz add more then 2 user form a group chat", 400))
    };
    users.push(req.user.id);

    let groupchat=await chatdata.create({
        chatname:chatname,
        users:users,
        isgroupchat:true,
        groupadmin:req.user.id,

    });

    const fullgroupchat=await chatdata.findOne({_id:groupchat._id})
    .populate("users", "-password")
    .populate("groupadmin","-password");

    res.status(200).json({
        success:true,
        fullgroupchat,
    })


});


export const renamegroupchatcontroller=catchasyncerror(async(req,res,next)=>{
    const {chatid,chatname}=req.body;

    console.log(chatid)
    const updategroupname=await chatdata.findByIdAndUpdate(
        chatid,{chatname:chatname},{
            new:true,
            runValidators:true,
        }
    ).populate("users","-password").populate("groupadmin","-password");

    if(!updategroupname){
        return next(new Errorhandler("chat not found",400))
    };
    res.status(200).json({
        success:true,
        updategroupname,
    })
});







export const removeuserfromgroupcontroller=catchasyncerror(async(req,res,next)=>{
    const {chatid,userid}=req.body;
    console.log(chatid)
    console.log(userid)

    const removeuserfromchat=await chatdata.findByIdAndUpdate(chatid,{
        $pull:{users:userid},
    },{
        new:true,
        runValidators:true,
    }).populate("users","-password")
    .populate("groupadmin","-password");

    if(!removeuserfromchat){
        return next(new Errorhandler("chat not found",400))
    };
    res.status(200).json({
        success:true,
        message:"user remove successfully"
    })
});


export const addusertochatgroupcontroller=catchasyncerror(async(req,res,next)=>{
    const {chatid,userid}=req.body;

    const addusertogroupchat=await chatdata.findByIdAndUpdate(
        chatid,{
            $push:{users:userid},
        },{
            new:true,
            runValidators:true,
        }
    ).populate("users","-password")
    .populate("groupadmin","-password");

    if(!addusertogroupchat){
        return next(new Errorhandler("chat not found",400))
    };

    res.status(200).json({
        success:true,
        message:"new user added successfully"
    })
})
