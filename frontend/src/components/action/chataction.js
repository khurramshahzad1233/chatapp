import axios from "axios";


export const singlechataction=(userid)=>async(dispatch)=>{
    try {
        dispatch({type:"SINGLE_CHAT_REQUEST"});
        
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.post(`/api/singlechat`,{userid},config);

        dispatch({
            type:"SINGLE_CHAT_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"SINGLE_CHAT_FAIL",
            payload:error.response.data.message,
        })
        
    }
};



export const mychatlistaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"MY_CHAT_LIST_REQUEST"});
        const {data}=await axios.get("/api/chat/me");

        dispatch({
            type:"MY_CHAT_LIST_SUCCESS",
            payload:data,
        })

    } catch (error) {
        dispatch({
            type:"MY_CHAT_LIST_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const groupchatcreateaction=(chatname,users)=>async(dispatch)=>{
    try {
        dispatch({type:"GROUP_CHAT_CREATE_REQUEST"});

        const config={
            headers:{
                "content-type":"application/json"
            }
        };

        const {data}=await axios.post(`/api/chat/group/create`,{chatname,users},config)

        dispatch({
            type:"GROUP_CHAT_CREATE_SUCCESS",
            payload:data,
        })

        
    } catch (error) {
        dispatch({
            type:"GROUP_CHAT_CREATE_FAIL",
            payload:error.response.data.message,
        })
        
    }
}


export const updategroupnameaction=(chatid,chatname)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_GROUPNAME_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };

        // console.log(chatid)
        // console.log(chatname)
       
        const {data}=await axios.put(`/api/chat/name/update`,{chatid,chatname},config);

        dispatch({
            type:"UPDATE_GROUPNAME_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDTE_GROUPNAME_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const updategroupchataction=(chatid,userid)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_CHATGROUP_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
      
        const {data}=await axios.put(`/api/chat/user/add`,{chatid,userid},config);

        dispatch({
            type:"UPDATE_CHATGROUP_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_CHATGROUP_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const removeuseraction=(chatid,userid)=>async(dispatch)=>{
    try {
        dispatch({type:"REMOVE_USER_REQUEST"});

        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        
        console.log(chatid)
        console.log(userid)

        const {data}=await axios.put(`/api/chat/delete`,{chatid,userid},config);

        dispatch({
            type:"REMOVE_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REMOVE_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}