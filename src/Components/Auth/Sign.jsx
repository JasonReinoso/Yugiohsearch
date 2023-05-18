
import { SignLanguage } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import Signup from "../Auth/Signup"
import SignIn from "../Auth/SignIn"


function Sign()
{
    return(
        <div>
        <Link to="/SignIn">
            <label>Sign In?</label>
        </Link>
        <br></br>
         <Link to="/Signup">
         <label>Sign Up?</label>
         </Link>
        </div>
    )

}

export default Sign;