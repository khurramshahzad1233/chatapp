import React, { useState } from 'react';
import "./Updategroupchate.css"
import {Chatestate} from "../../context/Chatprovider"
import { useSelector,useDispatch } from 'react-redux';
import {RiCloseCircleLine} from "react-icons/ri";
import {searchuseraction} from "../action/useraction"
import Searchusercard from '../chatpage/Searchusercard';
import {updategroupnameaction,updategroupchataction,removeuseraction} from "../action/chataction";


const Updategroupchat = ({closebtn}) => {
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.userred)
    const {searchuser}=useSelector((state)=>state.searchuserred)

    const {selectedchat}=Chatestate();
    

    const [search,setSearch]=useState("")
    // const [searchresult,setSearchresult]=useState([])
    const [chatname,setChatname]=useState("");

    let guser=selectedchat.users.filter((item)=>item._id!==user._id)
    // console.log(guser)
    // console.log(searchresult)

    let chatid=selectedchat._id


    const updatechatnamehandler=(e)=>{

        dispatch(updategroupnameaction(chatid,chatname))
    }

    const handlesearch=(query)=>{
        setSearch(query)
        if(!query)return;
        dispatch(searchuseraction(search))
        // setSearchresult()

    }

    const selectsearchuser=(user)=>{
       if(selectedchat.users.find((item)=>item._id===user._id)) return;
       if(selectedchat.groupadmin._id===user._id) return;

       let userid=user._id;
       dispatch(updategroupchataction(chatid,userid))
        
    }

    
    const removeuserfromgroup=(ruser)=>{
        // if(selectedchat.groupadmin._id!==user._id || ruser._id===user._id) return;

        let userid=ruser._id
        dispatch(removeuseraction(chatid,userid))
    }
  return (
    <div
    className='updategroupchatcontainer'
    >
        <div>{selectedchat.chatname}</div>

        <input type="text"
        required
        placeholder='chatname'
        value={chatname}
        onChange={(e)=>setChatname(e.target.value)}
        />
        <span><button 
        onClick={updatechatnamehandler}
        >Update</button></span>
        <div>
            {selectedchat.users.map((ruser)=>{
                return(<div  key={ruser._id}>{ruser.name} 
                <span
                onClick={()=>removeuserfromgroup(ruser)}
                ><RiCloseCircleLine/></span>
                </div>)
            })
                
            }
        </div>

        <div>
            <input type="text"
            required
            placeholder='search and add'
            onChange={(e)=>handlesearch(e.target.value)}
            />
        </div>
        <div>{
            searchuser?.slice(0,4).map((user)=>(
                <Searchusercard user={user} key={user._id}
                selectuserhandler={()=>selectsearchuser(user)}
                />
               
            ))
            }</div>
        <div><button
        onClick={closebtn}
        >close</button></div>
    </div>
  )
}

export default Updategroupchat