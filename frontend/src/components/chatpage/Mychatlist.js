import React,{Fragment,useEffect,useState} from 'react'
import "./Mychatlist.css";
import {useSelector,useDispatch} from "react-redux";
import {FaPlus} from "react-icons/fa"
import Addusertogroupchat from "../groupchat/Addusertogroupchat";
import {Chatestate} from "../../context/Chatprovider"
import {getallmessageaction} from "../action/messageaction"

import { io } from "socket.io-client";
const socket=io.connect("http://192.168.18.138:5000");



const Mychatlist = () => {
    const dispatch=useDispatch()

    const {selectedchat,setSelectedchat,setMessages,messages}=Chatestate()
    // console.log(selectedchat)

    const {mychatlist}=useSelector((state)=>state.mychatlistred);
    const {user}=useSelector((state)=>state.userred);
    const {allmessage,getallmsg}=useSelector((state)=>state.allmessagered)

    // const [selectedchat,setSelectedchat]=useState("");
    const [opengroup,setOpengroup]=useState(false)
   
    
    console.log(messages)
   
    const openaddgroupmodel=(e)=>{
        setOpengroup(!opengroup)

    };
    
    const selectchat=async(e,chat)=>{
         setSelectedchat(chat);

         dispatch(getallmessageaction(chat._id));
        //  setMessages(allmessage)
        socket.emit("join chat",selectedchat._id)
        

    };

    useEffect(()=>{
        if(getallmsg===true){
            setMessages(allmessage)
        };
        dispatch({type:"ALL_MESSAGE_RESET"})

    },[allmessage,getallmsg,setMessages,dispatch])

   
    
   
  return (
    <Fragment>
        <div className="mychatlistcontainer">
            <div>
                <p>My Chats</p>
                <p><button onClick={openaddgroupmodel}>New group Chat</button>
                <span><FaPlus/></span>
                </p>
                </div>
                <div className="chatlist">{
                    mychatlist?.map((chat)=>{
                        return <div
                        onClick={(e)=>selectchat(e,chat)}
                        className={selectedchat===chat?"blue":"blue white"}
                        key={chat._id}
                        >{
                            !chat.isgroupchat?(<>{
                                chat.users[0]._id===user._id?chat.users[1].name:chat.users[0].name
                            }</>):(chat.chatname)
                            }
                            <div>{chat.latestmessage &&(
                                <p>
                                    <b>{chat.latestmessage.sender.name} :</b>
                                    <span>{chat.latestmessage.content.length>20?(<>
                                    chat.latestmessage.content.substring(0,30)+"..."
                                    </>):(
                                        <>{chat.latestmessage.content}</>
                                    )}</span>
                                </p>
                            )}</div>
                            </div>
                    })
                }</div>
        </div>
        {opengroup && <div><Addusertogroupchat openaddgroupmodel={openaddgroupmodel}/></div>}
        

        
    </Fragment>
  )
}

export default Mychatlist