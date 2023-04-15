import React,{Fragment} from 'react';
import {Chatestate} from "../../context/Chatprovider";
import { useSelector } from 'react-redux';
import "./Userprofile.css"

const Userprofile = () => {

    const {user}=useSelector((state)=>state.userred)
    const {selectedchat}=Chatestate()

    let userprofile=selectedchat.users[0]._id===user._id?selectedchat.users[1]:selectedchat.users[0];
    console.log(userprofile)

    
  return (
    <Fragment>
        <div className="userprofilecontainer">
            <div>{userprofile.name}</div>
            <div>
                <img src={userprofile.avatar.url} alt="avatar" width="30px" />
            </div>
            <div>
                {userprofile.email}
            </div>
        </div>
    </Fragment>
  )
}

export default Userprofile