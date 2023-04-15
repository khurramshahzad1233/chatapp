import React,{createContext, useContext,useState} from 'react';
const Chatcontext=createContext();

const Chatprovider = ({children}) => {

    const [selectedchat,setSelectedchat]=useState("")
    const [messages,setMessages]=useState([]);
    const [notification,setNotification]=useState([])
  return (
    <Chatcontext.Provider value={{selectedchat,setSelectedchat,messages,setMessages,notification,setNotification
    }}>
        {children}
    </Chatcontext.Provider>
  )
};

export const Chatestate=()=>{
    return useContext(Chatcontext)
}

export default Chatprovider   