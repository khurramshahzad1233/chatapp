import React,{Fragment,useState} from 'react';
import "./Addusertogroupchat.css";
import {searchuseraction} from "../action/useraction";
import {useDispatch,useSelector} from "react-redux"
import Searchusercard from '../chatpage/Searchusercard';
import {RiCloseCircleLine} from "react-icons/ri"
import {groupchatcreateaction} from "../action/chataction"


const Addusertogroupchat = ({openaddgroupmodel}) => {
  const dispatch=useDispatch();

  const {searchuser}=useSelector((state)=>state.searchuserred);
  const {groupchat}=useSelector((state)=>state.groupchatcreatered)

  const [groupchatname,setGroupchatname]=useState("");
  const [search,setSearch]=useState("");

  const [searchresult,setSearchresult]=useState([]);

  


  const handlesearh=(query)=>{
    setSearch(query);
    if(!query) return;
    dispatch(searchuseraction(search))

    setSearchresult(searchresult)


  }

  const selectsearchuser=(user)=>{
    if(searchresult.includes(user)) return;
    setSearchresult([...searchresult,user])

  }

  const deletefromselectedsearchresult=(user)=>{
    setSearchresult(searchresult.filter((item)=>item._id!==user._id))
    
  }

  const createchatgrouphandler=(e)=>{
    let users=JSON.stringify(searchresult.map((user)=>user._id))
    dispatch(groupchatcreateaction(groupchatname,users))
    

  };

  
  return (
    <Fragment>
      <div className="groupchatcontainer">
        <div className="groupchatdialogbox">
          <div className="goupchatmodel">
            Create Group Chat
            </div>

            <div>
              <div>
                <input type="text"
                required
                placeholder='group chat name'
                value={groupchatname}
                onChange={(e)=>setGroupchatname(e.target.value)}
                />
              </div>

              <div>
                <input type="text"
                required
                placeholder='Search user and add them'
                // value={searchuser}
                onChange={(e)=>handlesearh(e.target.value)}
                />
              </div>

              <div>
                {
                  searchresult?.map((user)=>{
                    return (<div
                    onClick={()=>deletefromselectedsearchresult(user)}
                    key={user._id}
                    >
                      {user.name}
                      {}
                      <RiCloseCircleLine/>
                    </div>)
                  })
                }
              </div>

              <div>{
                searchuser?.slice(0,4).map((user)=>(
                  <Searchusercard user={user} key={user._id}
                  selectuserhandler={()=>selectsearchuser(user)}
                  />
                )
                  
                  
                )
                }</div>

              <div><button
              onClick={createchatgrouphandler}
              >Create chat group</button></div>
            </div>

          <div className="btn"><button onClick={openaddgroupmodel}>Close</button></div>
        </div>
      </div>
    </Fragment>
  )
}

export default Addusertogroupchat