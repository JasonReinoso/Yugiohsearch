import React from "react";

import {MenuItem} from './MenuItem.js'

import {Link} from 'react-router-dom';

import { auth } from "../Firebase";

import { signOut } from "firebase/auth";
import Output from '@mui/icons-material/Output';

export function menu(props)
{
   return(

    <div id='menu-container'>
        <ul className="Menu">
            <li className="Menuitem"><h2>Yu-Gi-Search!</h2></li>
            {MenuItem.map((item,index)=>{
                return(
                <li className="Menuitem" key={index}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>  
                </li>
                )
            })} 
            <li className="Menuitem">
                <Link to={"/"}
                style={{textDecoration:'none'}}
                    onClick={()=>{

                        signOut(auth).then(()=>{
                            props.signout(null);
                            props.killdeck(null);
                            props.killcurrentdeck(null);
                        })
                        // props.loginfun(null);

                    }}>
                        <Output />
                    Sign Out

                </Link>
            </li>
        </ul> 
    </div>
   )
  
}

export default menu