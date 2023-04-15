import React,{Fragment,useState,useEffect} from 'react'
import "./Chatpage.css"
import {FaRegBell,FaSearch,FaUserAlt} from "react-icons/fa";
import {searchuseraction} from "../action/useraction";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import Searchusercard from './Searchusercard';
import {singlechataction} from "../action/chataction"
import Mychatlist from './Mychatlist';
import {mychatlistaction} from "../action/chataction";
import {useAlert} from "react-alert"
import Chatbox from '../chatbox/Chatbox';
import {Chatestate} from "../../context/Chatprovider"

const Chatpage = () => {

  const {setSelectedchat,notification,setNotification}=Chatestate();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const alert=useAlert();

  const {isAuthenticated}=useSelector((state)=>state.userred);
  const {searchuser}=useSelector((state)=>state.searchuserred);
  const {singlechat,isAdded}=useSelector((state)=>state.singlechatred)
  const {mychatlist}=useSelector((state)=>state.mychatlistred)

  const [draweropen,setDraweropen]=useState(false);
  const [search,setSearch]=useState("");
  // const [selectchat,setSelectchat]=useState("");
  // const [chats,setChats]=useState([])

  // console.log(selectchat)


  const drawerhandler=(e)=>{
    setDraweropen(!draweropen)

  }

  const handlesearch=(e)=>{
    dispatch(searchuseraction(search))
    
  };

  const selectchathandler=(userid)=>{
    dispatch(singlechataction(userid));

    dispatch(mychatlistaction())
    setDraweropen(!draweropen)
    dispatch({type:"MY_CHAT_LIST_RESET"})
   
    // if(!chats.find((chat)=>chat._id===selectchat._id)) 
    // setChats([selectchat, ...chats]);
    


  }

  useEffect(()=>{

   if(!isAuthenticated){
    navigate('/');
  
   };

   if(isAdded){
    alert.success("added successfully")
    setSelectedchat(singlechat);
   }

   

   dispatch(mychatlistaction())
  },[isAuthenticated,navigate,dispatch,alert,isAdded,singlechat,setSelectedchat])
  return (
    <Fragment>
      <div className="navcontainer">
        <div className="searchuser"
        onClick={drawerhandler}
        >
          <span><FaSearch/></span>
          <span>Search User</span>
          </div>
        <div className="navheading">Talk a Tiv</div>
        <div className="notificationcontainer">
          <div className="belicon">
            <span><FaRegBell/></span>
            <span>{!notification.length && "no new messages"}
            {
              notification.map((not)=>(
                <div key={not._id}
                onClick={()=>{
                  setSelectedchat(not.chat);
                  setNotification(notification.filter((item)=>item!==not))
                }}
                >
                  {
                    not.chat.isgroupchat?`new message in ${not.chat.chatname}`:`
                    new message from 
                    `
                  }
                </div>
              ))
            }
            </span>

          </div>
          <div className="navavatar">
            <span><FaUserAlt/></span>
          </div>
        </div>
      </div>

      <div className={draweropen?"opendrawer":"opendrawer closedrawer"}
      
      >
        <div className="drawerheader">
          Search Users
        </div>
        <div className="drawersearch">
          <input type="text"
          required
          placeholder='Search by Name or Email'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
          <button onClick={handlesearch}>Go</button>
        </div>

        <div className="searchresult">
          {
            searchuser?.map((user)=>(
              <Searchusercard user={user} key={user._id} 
              selectuserhandler={()=>selectchathandler(user._id)}
          
              />
            ))
          }
        </div>
      </div>


      <div className="chatpage">
      <div className="mychatlist" >
        <Mychatlist/>
      </div>
      <div className="chatbox">
        <Chatbox/>
      </div>

      </div>

      
      
    </Fragment>
  )
}

export default Chatpage