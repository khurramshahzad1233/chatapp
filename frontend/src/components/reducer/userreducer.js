import {createReducer} from "@reduxjs/toolkit"


const userinitialstate={
    user:{}
};

export const userreducer=createReducer(userinitialstate,{
    REGISTER_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            user:{},
            isAuthenticated:false,
        }
    },
    REGISTER_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:action.payload.user,
            isAuthenticated:true,
        }
    },
    REGISTER_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            user:null,
            error:action.payload,
            isAuthenticated:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    },
    LOGIN_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            user:{},
            isAuthenticated:false,
        }
    },
    LOGIN_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:action.payload.user,
            isAuthenticated:true,
        }
    },
    LOGIN_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            user:{},
            isAuthenticated:false,
            error:action.payload,
        }
    },
    LOAD_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            isAuthenticated:false,
            user:{}
        }
    },
    LOAD_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:action.payload.user,
            isAuthenticated:true,
        }
    },
    LOAD_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            user:{},
            isAuthenticated:false,
            error:action.payload,
        }
    },
    LOGOUT_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            logout:false,

        }
    },
    LOGOUT_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            logout:action.payload.success,
            user:null,
            isAuthenticated:false,
        }
    },
    LOGOUT_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            ...state,
        }
    }
});




const searchuserinitialstate={
    searchuser:[]
};

export const searchuserreducer=createReducer(searchuserinitialstate,{
    SEARCH_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            searchuser:[]
        }
    },
    SEARCH_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            searchuser:action.payload.alluser,
        }
    },
    SEARCH_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            searchuser:[],
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});