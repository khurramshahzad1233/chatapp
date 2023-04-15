import React,{Fragment,useEffect, useState} from 'react';
import "./Chatbox.css"
import {Chatestate} from "../../context/Chatprovider"
import {TiArrowBack,TiEyeOutline} from "react-icons/ti"
import {useDispatch, useSelector} from "react-redux";
import Userprofile from './Userprofile';
import Updategroupchat from './Updategroupchat';
import {newmessageaction,getallmessageaction} from "../action/messageaction";
import ScrollableFeed from 'react-scrollable-feed'

import { io } from "socket.io-client";

// const socket = io.connect("https://server-domain.com"); for development
const socket=io.connect("http://192.168.18.138:5000");

var selectedchatcompare;

// socket.on("connect", () => {
//   console.log("connected"); // x8WIv7-mJelg7on_ALbx
// });


const Chatbox = () => {

  const dispatch=useDispatch();

  

  const {selectedchat,setSelectedchat,messages,setMessages,notification,setNotification}=Chatestate();
  const [openusermodel,setOpenusermodel]=useState(false);
  const [openupdategroupchat,setUpdategroupchat]=useState(false)

  const [newmessage,setNewmessage]=useState("");
  const [typing,setTyping]=useState(false);
  const [istyping,setIstyping]=useState(false);
  // const [messages,setMessages]=useState([]);


  console.log(notification)
  const [socketconnected,setSocketconnected]=useState(false);

  const {user}=useSelector((state)=>state.userred)
  const {msg,success}=useSelector((state)=>state.newmessagered)
  const {allmessage}=useSelector((state)=>state.allmessagered)
  

  // console.log(socketconnected)
  let chatid=selectedchat._id;

  const closechathandler=(e)=>{
    setSelectedchat("")
  }


  const openuserprofilemodel=(e)=>{
    setOpenusermodel(!openusermodel)
  };

  const openupdategroupchatbtn=(e)=>{
    setUpdategroupchat(!openupdategroupchat)
  }

  // console.log(selectedchat)

  const sendmessage=async(event)=>{
    if(event.key==="Enter" && newmessage){
      socket.emit("stop typing",selectedchat)

      // await dispatch(getallmessageaction(chatid))
      // await setMessages(allmessage)
      setNewmessage("")
      await dispatch(newmessageaction(chatid,newmessage));
      // setMessages([...messages,msg])

      // socket.emit("join chat",chatid)
      

  }
          
  }

  // console.log(istyping)
 


  useEffect(()=>{
    // socket.on();
    socket.emit("setup",user);
    socket.on("connected",()=>setSocketconnected(true));

    socket.on("typing",()=>setIstyping(true));
    socket.on("stop typing",()=>setIstyping(false))
    selectedchatcompare=selectedchat

   


    if(success){
      setMessages([...messages,msg]);

      socket.emit("send message",msg )
    }
    dispatch({type:"NEW_MESSAGE_RESET"});

    // dispatch(getallmessageaction(chatid));
    // dispatch({type:"ALL_MESSAGE_RESET"})
    // setMessages(allmessage)

  },[messages,msg,success,dispatch,chatid,user,setMessages,selectedchat]);


  useEffect(()=>{
    socket.on("message received",(msg)=>{
      if(
        !selectedchatcompare|| selectedchatcompare._id!==msg.chat._id
      ){
        if(!notification.includes(msg)){
          setNotification([msg, ...notification]);

        }
      }else{
        setMessages([...messages,msg])
      }
    })
  },[selectedchat,messages,notification,setNotification,setMessages]);


  const typinghandler=(e)=>{
    setNewmessage(e.target.value);

    if(!socketconnected) return;
    if(!typing){
      setTyping(true);
      socket.emit("typing",selectedchat)
    };
    let lasttypingtime=new Date().getTime();
    let timerlength=3000;

    setTimeout(()=>{
      let timenow=new Date().getTime();
      let timedifference=timenow-lasttypingtime;
      if(timedifference>=timerlength && typing){
        socket.emit("stop typing",selectedchat);
        setTyping(false);
      }

    },timerlength)

  }

  
  return (
    <Fragment>
        <div className="chatboxcontainer">
          {selectedchat?(<Fragment>
            <div>
              <button
              onClick={()=>closechathandler()}
              ><TiArrowBack/></button>
              <div>{
                !selectedchat.isgroupchat?(<>
                {selectedchat.users[0]._id===user._id?selectedchat.users[1].name:selectedchat.users[0].name}
                <span 
                onClick={openuserprofilemodel}
                ><TiEyeOutline/></span>

                </>):<>
                ({selectedchat.chatname})
                <span
                onClick={openupdategroupchatbtn}
                ><TiEyeOutline/></span>
                </>
                
                }
                
                </div>
            </div>

            {/* chat box */}
            <div>
              <ScrollableFeed>{
                messages && 
                messages.map((msg,i)=>{
                  return (
                    <div key={msg._id}
                    className={msg.sender._id===user._id?"right":"neutral"}
                    >
                      {msg.content }
                    </div>
                  )
                })
                
                }</ScrollableFeed>
            </div>

            <div
            onKeyDown={sendmessage}
            >
              {istyping?(<div>Loading ...</div>):(<></>)}
              
                <input type="text"
                placeholder='enter a message to send'
                value={newmessage}
                // onChange={(e)=>setNewmessage(e.target.value)}
                onChange={typinghandler}
                />
                <input type="submit"
                value="submit"
                />
              
            </div>
          </Fragment>):(
            <div className="startchatmessage">
              Click user to start Chatting
            </div>
          )}
          
            
        </div>

{/* user profile model */}

        <div >{
          openusermodel &&(
            <Userprofile/>
          )
          }</div>
          <div>
            {openupdategroupchat &&(
              <Updategroupchat closebtn={openupdategroupchatbtn}/>
            )}

          </div>
    </Fragment>
  )
}

export default Chatbox