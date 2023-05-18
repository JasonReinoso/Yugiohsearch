import React,{useState} from "react";
import {getDatabase,ref,set,push,child} from "firebase/database";
import { db } from "../Firebase";


function Addcard(props)
{
  
    const regularmonster = ()=> 
    {
        let deckholder = props.decklist.slice();
        var counter =0;
        
            for(var i =0; i < deckholder.length;i++)
            {
                if(props.card.name === props.decklist[i].name)
                {
                    counter++;
                    
                }
            }
            if(counter < 3)
            {
                deckholder.push(props.card);
                
                props.setDecklist(deckholder);
            }
            else
            {
                alert("exceed the 3 copy rules of a single card");
            }
        
    }


    const extramonster = () =>{
        let Extradeckholder = props.Extradeck.slice();
        var counter =0;
        
        
            for(var i =0; i < Extradeckholder.length;i++)
            {
                if(props.card.name === props.Extradeck[i].name)
                {
                    counter++;
                    
                }
            }
            if(counter < 3)
            {
                if(Extradeckholder.length < 15)
                {
                    Extradeckholder.push(props.card);
                    
                    props.setExtraDecklist(Extradeckholder);
                }
                else
                {
                    alert("Reach max cards in extra deck");
                }
            }
            else
            {
                alert("exceed the 3 copy rules of a single card");
            }
        

    }


    const removemain=()=>{

        let deckholder = props.decklist.slice();
      
        for(var i=0;i<deckholder.length;i++)
        {
            if(props.card.name === props.decklist[i].name)
            {
                deckholder.splice(i,1);
                break;
            }
        }
        props.setDecklist(deckholder);

    }


    const removeextra = () => {
       
        let extra = props.Extradeck.slice();
        for(var i=0;i < extra.length;i++)
        {
            if(props.card.name === props.Extradeck[i].name)
            {
                extra.splice(i,1);
                break;
            }
        }
        props.setExtraDecklist(extra);


    }
    
    


    return(
        <div id='card-buttons'>
            <button
                onClick={()=>{ 
                    if(props.card.type.includes("Synchro") || props.card.type.includes("Fusion") || props.card.type.includes("XYZ") || props.card.type.includes("Link"))
                    {
                        extramonster();
                    }
                    else
                    regularmonster();
                    
                    }}>ADD</button>

            <button
                onClick={()=>{
                    
                    if(props.card.type.includes("Synchro") || props.card.type.includes("Fusion") || props.card.type.includes("XYZ") || props.card.type.includes("Link"))
                    {
                      removeextra();
                    }

                    else
                    {
                       removemain();
                    }
                }}
            
            
            >Remove</button>


        
        

        </div>
    )
}


export default Addcard