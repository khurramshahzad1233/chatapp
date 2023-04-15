import {createReducer} from "@reduxjs/toolkit"

const newmessageinitialstate={
    msg:{}
};
export const newmessagereducer=createReducer(newmessageinitialstate,{
    NEW_MESSAGE_REQUEST:(state,action)=>{
        return{
            loading:true,
            msg:{}
        }
    },
    NEW_MESSAGE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            msg:action.payload.sendmessage,
            success:true,
        }
    },
    NEW_MESSAGE_FAIL:(state,action)=>{
        return{
            loading:false,
            msg:{},
            error:action.payload,
            success:false,
        }
    },
    NEW_MESSAGE_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
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


const allmessageinitialstate={
    allmessage:[]
};
export const allmessagereducer=createReducer(allmessageinitialstate,{
    ALL_MESSAGE_REQUEST:(state,action)=>{
        return{
            loading:true,
            allmessage:[]
        }
    },
    ALL_MESSAGE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allmessage:action.payload.allmessage,
            getallmsg:true,
            
        }
    },
    ALL_MESSAGE_FAIL:(state,action)=>{
        return{
            loading:false,
            allmessage:[],
            error:action.payload,
            getallmsg:false,
            
        }
    },
    ALL_MESSAGE_RESET:(state,action)=>{
        return{
            loading:false,
            getallmsg:false,
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
})