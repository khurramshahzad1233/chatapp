import React,{Fragment} from 'react';


const Searchusercard = ({user,selectuserhandler}) => {
    
  
   
  return (
    <Fragment>
        <div className="searchcardcontainer" onClick={selectuserhandler}>
            <div className="avatar">
                <img src={user.avatar.url} alt={"avatar"} width="30px"/>
            </div>
            <div className="searchinfo">
                <p>{user.name}</p>
                <p><b>Email:</b><span>{user.email}</span></p>
            </div>
        </div>
    </Fragment>
  )
}

export default Searchusercard