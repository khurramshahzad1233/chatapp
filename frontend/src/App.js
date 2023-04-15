import React,{useEffect} from 'react';
import "./App.css";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader";
import Home from './components/home/Home';
import Chatpage from "./components/chatpage/Chatpage"
import {useDispatch} from "react-redux";
import {loaduseraction} from "./components/action/useraction"


const App = () => {
  const dispatch=useDispatch()

  useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto","Montserrat","Droid Sans","Chilanka"]
      }
    });

    dispatch(loaduseraction())
  },[dispatch])
  return (
    <Router>

      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chatpage/>}/>
      </Routes>
    </Router>
  )
}

export default App