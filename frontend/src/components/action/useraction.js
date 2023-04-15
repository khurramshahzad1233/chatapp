import axios from "axios"

export const registeruseraction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({type:"REGISTER_USER_REQUEST"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            }
        };
        const {data}=await axios.post(`/api/user/register`,userdata,config);
        dispatch({
            type:"REGISTER_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REGISTER_USER_FAIL",
            payload:error.response.data.message
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
};

export const loginuseraction=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"LOGIN_USER_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.post(`/api/user/login`,{email,password},config);
        dispatch({
            type:"LOGIN_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGIN_USER_FAIL",
            payload:error.response.data.message,
        })
    }
};


export const loaduseraction=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LOAD_USER_REQUEST"
        });
        const {data}=await axios.get(`/api/user/me`);
        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }

};



export const searchuseraction=(search)=>async(dispatch)=>{
    try {
        dispatch({type:"SEARCH_USER_REQUEST"});

        const {data}=await axios.get(`/api/users?search=${search}`);

        dispatch({
            type:"SEARCH_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"SEARCH_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}


