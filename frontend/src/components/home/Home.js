import React,{Fragment,useEffect,useRef,useState} from 'react';
import "./Home.css"
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
// import {Mail,Lock,Face,LockOpen} from "@mui/icons-material";
import {FaLock,FaLockOpen,FaUserAlt,FaRegEnvelope} from "react-icons/fa"
import {registeruseraction,loginuseraction} from "../action/useraction"


const Home = () => {
  const navigate=useNavigate();
  
  const dispatch=useDispatch()

  const switchertab=useRef(null);
  const logintab=useRef(null)
  const registertab=useRef(null);

  const [loginemail,setLoginemail]=useState("");
    const [loginpassword,setLoginpassword]=useState("");

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    const {name,email,password}=user;

    const [avatar,setAvatar]=useState("");
    const [avatarpreview,setAvatarpreview]=useState("/profile.png")

    const {isAuthenticated}=useSelector((state)=>state.userred)

    const switchtab=(tab)=>{
        if(tab==="login"){
            switchertab.current.classList.remove("shifttoright")
            switchertab.current.classList.add("shifttoneutral")

            registertab.current.classList.remove("neutralform")
            logintab.current.classList.remove("shifttoleft")
            
        };
        if(tab==="register"){
            switchertab.current.classList.remove("shifttoneutral")
            switchertab.current.classList.add("shifttoright")

            registertab.current.classList.add("neutralform")
            logintab.current.classList.add("shifttoleft")


        };
    }

    const loginsubmithandler=(e)=>{
        e.preventDefault();
        dispatch(loginuseraction(loginemail,loginpassword))
        
    };

    const registersubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.set("name",name)
        myform.set("email",email)
        myform.set("password",password)
        myform.set("avatar",avatar)

        dispatch(registeruseraction(myform))
    }

    const registerhandler=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatar(reader.result);
                    setAvatarpreview(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }

  

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/chat")

    }
  },[navigate,isAuthenticated])
  return (
    <Fragment>
      <div className="loginsignupcontainer">
            <div className="loginsignupbox">
                <div className="loginsignuptoggle">
                    <p onClick={(e)=>switchtab("login")}>Login</p>
                    <p onClick={(e)=>switchtab("register")}>Register</p>
                </div>
                <div><button className='togglebtn' ref={switchertab}></button></div>

                <form
                ref={logintab}
                onSubmit={loginsubmithandler}
                className="loginform"
                >
                    <div>
                        <FaRegEnvelope/>
                        <input type="email" 
                        required
                        placeholder='plz enter your email address'
                        value={loginemail}
                        onChange={(e)=>setLoginemail(e.target.value)}
                        />

                    </div>
                    <div>
                        <FaLock/>
                        <input type="password"
                        required
                        placeholder='plz enter your password'
                        value={loginpassword}
                        onChange={(e)=>setLoginpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Login"
                        />
                    </div>
                </form>

                <form
                ref={registertab}
                encType="multipart/form-data"
                onSubmit={registersubmithandler}
                className="registerform"
                >
                    <div>
                        <FaUserAlt/>
                        <input type="text"
                        required
                        placeholder='plz enter your name'
                        value={name}
                        name="name"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <FaRegEnvelope/>
                        <input type="email"
                        required
                        placeholder='plz enter your email address'
                        value={email}
                        name="email"
                        onChange={registerhandler}
                         />
                    </div>
                    <div>
                        <FaLockOpen/>
                        <input type="password"
                        required
                        placeholder='plz enter your password'
                        value={password}
                        name="password"
                        onChange={registerhandler}
                        />
                    </div>

                    <div>
                        <img src={avatarpreview} alt="avatar preview" width="30px"/>

                        <input type="file"
                        required
                        accept='image/*'
                        name="avatar"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
      
    </Fragment>
  )
}

export default Home