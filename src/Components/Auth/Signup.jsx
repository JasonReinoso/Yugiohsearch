import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom';
import { Password } from "@mui/icons-material";
import React, {useState} from "react";


import { auth } from "../../Firebase";
import {getDatabase,ref,set,push,child, update} from "firebase/database";
import { db } from "../../Firebase";






const Signup = (props) => 
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [checkpassword,setCheckPassword]= useState('');

    const[Errormsg,setErrormsg] = useState('');


    const signup = (e) => 
    {
        e.preventDefault();


        if(checkpassword === password)
        {
            
            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                const username = email.substring(0,email.indexOf("@"));
                set(ref(db,'User/'+username),
                    {
                        "username":username,
                        "email":email
                    }
                    
                
                
                )
                setErrormsg('');
                props.changeform("login"); /// 
            
            })
            .catch((error)=>{
                console.log(error.message);
                var error = error.message.replace("Firebase:","");
                //setErrormsg("A user with that email exists");
                setErrormsg(error);
                
            });


        }
        else
        {
            setErrormsg('Passwords are not the same');
            setEmail("");
            setCheckPassword("");
            setPassword("");
        }
    }



    return(
        <div className ='sign-in-container'>
            <form className="signup" 
             onSubmit={signup}>

                {Errormsg===''?<></>:<h3 className="warning">{Errormsg}</h3>}

                <h2 className="Loginlabel2">Sign up</h2>

                <label className="Loginlabel">Email:</label>
                <input type="email" 
                className="InputLogin"
                placeholder='Enter Email' 
                value={email}
                onChange = {(e)=>setEmail(e.target.value)}
                
                ></input>


                <label className="Loginlabel">Password:</label>
                <input type="password" 
                 pattern=".{6,}"   required title="6 characters minimum"
                className="InputLogin"
                placeholder='Enter Password'value={password}
                 onChange = {(e)=>setPassword(e.target.value)}
                
                ></input>

                <label className="Loginlabel">Re-type Password:</label>
                <input type="password" 
                pattern=".{6,}"   required title="6 characters minimum"
                className="InputLogin"
                placeholder='Enter Password'value={checkpassword}
                 onChange = {(e)=>setCheckPassword(e.target.value)}
                
                ></input>




                <button type="submit" className="ButtonSignup">Sign up</button>
            </form>

            <label>
                <Link to ='/Signin'
                className="Link"
                onClick={()=>{
                    props.changeform("login");
                }}
                
                >
                        Have an account? Sign in
                </Link>
            </label>


           
           
        </div>
    )
}

export default Signup