import {createReducer} from "@reduxjs/toolkit"

const singlechatinitialstate={
    singlechat:{}
};

export const singlechatreducer=createReducer(singlechatinitialstate,{
    SINGLE_CHAT_REQUEST:(state,action)=>{
        return{
            loading:true,
            singlechat:{}
        }
    },
    SINGLE_CHAT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            // singlechat:action.payload.newchat,
            singlechat:action.payload.chat,
            isAdded:true,
        }
    },
    SINGLE_CHAT_FAIL:(state,action)=>{
        return{
            loading:false,
            singlechat:{},
            error:action.payload,
            isAdded:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
            isAdded:false
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});


const mychatlistreducerinitialstate={
    mychatlist:[]
};

export const mychatlistreducer=createReducer(mychatlistreducerinitialstate,{
    MY_CHAT_LIST_REQUEST:(state,action)=>{
        return{
            loading:true,
            mychatlist:[]
        }
    },
    MY_CHAT_LIST_SUCCESS:(state,action)=>{
        return{
            loading:false,
            mychatlist:action.payload.allchat,
        }
    },
    MY_CHAT_LIST_FAIL:(state,action)=>{
        return{
            loading:false,
            mychatlist:[],
            error:action.payload,
        }
    },
    MY_CHAT_LIST_RESET:(state,action)=>{
        return{
            loading:false,
            ...state,

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


const groupchatinitialstate={
    groupchat:{}
};

export const groupchatcreatereducer=createReducer(groupchatinitialstate,{
    GROUP_CHAT_CREATE_REQUEST:(state,action)=>{
        return{
            loading:true,
            groupchat:{}
        }
    },
    GROUP_CHAT_CREATE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            groupchat:action.payload.fullgroupchat,
        }
    },
    GROUP_CHAT_CREATE_FAIL:(state,action)=>{
        return{
            loading:false,
            groupchat:{},
            error:action.paylaod,
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

const updatenameinitialstate={
    updatename:{}
};

export const updategroupnamereducer=createReducer(updatenameinitialstate,{
    UPDATE_GROUPNAME_REQUEST:(state,action)=>{
        return{
            loading:true,
            updatename:{}
        }
    },
    UPDATE_GROUPNAME_SUCCESS:(state,action)=>{
        return{
            loading:false,
            updatename:{}
        }
    },
    UPDATE_GROUPNAME_FAIL:(state,action)=>{
        return{
            loadign:false,
            updatename:{},
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
})


const addusertogroupinitialstate={
    addusertogroup:{}

};

export const updategroupreducer=createReducer(addusertogroupinitialstate,{
    UPDATE_CHATGROUP_REQUEST:(state,action)=>{
        return{
            loading:true,
            addusertogroup:{}
        }
    },
    UPDATE_CHATGROUP_SUCCESS:(state,action)=>{
        return{
            loading:false,
            addusertogroup:action.payload.success,
        }
    },
    UPDATE_CHATGROUP_FAIL:(state,action)=>{
        return{
            loading:false,
            addusertogroup:{},
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


const removeuserinitialstate={
    removeuser:{}
};
export const removeuserfromgroupreducer=createReducer(removeuserinitialstate,{
    REMOVE_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            removeuser:{}
        }
    },
    REMOVE_USER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            removeuser:action.payload.success,
        }
    },
    REMOVE_USER_FAIL:(state,action)=>{
        return{
            loading:false,
            removeuser:{},
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
})