

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom';
import { Password } from "@mui/icons-material";
import React, {useState} from "react";
import { auth } from "../../Firebase";

import {getDatabase,ref,set,push,child, update, onValue} from "firebase/database";
import { db } from "../../Firebase";

import Signup from "../Auth/Signup"
const SignIn = (props) => 
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [errormsg,seterrormsg] = useState('');


    const signIn = (e) => 
    {
      



        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            
           props.loginfun(userCredential);

           onValue(ref(db,'User/'+userCredential.user.email.substring(0,userCredential.user.email.indexOf("@"))+'/deck'),(snapshot)=>{
           
            props.loaddeck(snapshot.val())
            seterrormsg('');
        })









        })
        .catch((error)=>{
            console.log(error);
           // alert("test"); // <-- deals with error handling user
            seterrormsg("Wrong Username/Password");
        });
    }



    return(
        <div className ='sign-in-container'>
            <form className='Signin'onSubmit={signIn}>
              
              
              
              {errormsg===''?<></>:<h3 className="warning">{errormsg}</h3>}
                

               
                <h2 className="Loginlabel2">Login</h2>
                   
                <label className="Loginlabel">Email:</label>
                <input className="InputLogin" type="email" 
                placeholder='Enter Email' 
                value={email}
                onChange = {(e)=>setEmail(e.target.value)}
                ></input>
                
                <label className="Loginlabel">Password:</label>
                <input className="InputLogin"  
                type="password" 
                placeholder='Enter Password'
                value={password}
                onChange = {(e)=>setPassword(e.target.value)}
                
                ></input>
             

                <button className='ButtonLogin'type="submit">Log in</button>
            </form>

            <label >
                <Link to ='/Signup'
                className="Link"
                onClick={()=>{
                    props.changeform("register");
                }}
                
                >
                        Don't have an Account? Sign up

                </Link>
            </label>

           
           
        </div>
    )
}

export default SignIn