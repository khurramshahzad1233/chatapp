import axios from "axios";

export const newmessageaction=(chatid,content)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_MESSAGE_REQUEST"});

        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        
        const {data}=await axios.post(`/api/message/create`,{chatid,content},config);

        dispatch({
            type:"NEW_MESSAGE_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"NEW_MESSAGE_FAILE",
            payload:error.response.data.message,
        })
        
    }
}



export const getallmessageaction=(chatid)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_MESSAGE_REQUEST"});

        const {data}=await axios.get(`/api/message/all/${chatid}`);

        dispatch({
            type:"ALL_MESSAGE_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_MESSAGE_FAIL",
            payload:error.response.data.message,
        })
        
    }
}