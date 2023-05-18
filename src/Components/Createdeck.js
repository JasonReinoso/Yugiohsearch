import React, {useState,useEffect} from "react";
import { auth } from "../Firebase"
import {getDatabase,ref,set,push,child, update,onValue, remove} from "firebase/database";
import { db } from "../Firebase";
import Deck from './Deck';
import {Link} from 'react-router-dom';
import Home from './Home';

// LEN IS BUGGY WHICH MEANS
// CANT LIMIT DECKS SINCE LEN IS ASYNC
function Createdeck(props)
{
    const [len,setlen] = useState(0);
    const [deckname,setdeckname] = useState("");
    var regularusername = props.username.substring(0,props.username.indexOf("@"));

    
    const Deckcreation = (e) =>
    {
        e.preventDefault();
        if(deckname==="")
          alert("Please enter a name")
        else
        {

            console.log(props);
            var counter =0;
            let data=[];
            
            if(props.deckinfo ===null)
            {

            }
            else
            {
              Object.keys(props.deckinfo).map((item,index)=>{
                data.push(item);
              })
            }

            setlen(data.length);
            console.log(data.length);
            var flag =0;
            for(var i =0;i< data.length;i++)
            {
              if(data[i]===deckname)
                flag=1;
            }


          
          

          if(flag ===0)
          {
            if(data.length < 15)
            {
              const arr =[]
              const test ={
                  "id": 6983839,
                  "name": "Tornado Dragon",
                  "type": "XYZ Monster",
                  "frameType": "xyz",
                  "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
                  "atk": 2100,
                  "def": 2000,
                  "level": 4,
                  "race": "Wyrm",
                  "attribute": "WIND",
                  "card_sets": [
                    {
                      "set_name": "Battles of Legend: Relentless Revenge",
                      "set_code": "BLRR-EN084",
                      "set_rarity": "Secret Rare",
                      "set_rarity_code": "(ScR)",
                      "set_price": "4.08"
                    },
                    {
                      "set_name": "Duel Devastator",
                      "set_code": "DUDE-EN019",
                      "set_rarity": "Ultra Rare",
                      "set_rarity_code": "(UR)",
                      "set_price": "1.4"
                    },
                    {
                      "set_name": "Maximum Crisis",
                      "set_code": "MACR-EN081",
                      "set_rarity": "Secret Rare",
                      "set_rarity_code": "(ScR)",
                      "set_price": "4.32"
                    }
                  ],
                  "card_images": [
                    {
                      "id": 6983839,
                      "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
                      "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
                      "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
                    }
                  ],
                  "card_prices": [
                    {
                      "cardmarket_price": "0.42",
                      "tcgplayer_price": "0.48",
                      "ebay_price": "2.99",
                      "amazon_price": "0.77",
                      "coolstuffinc_price": "0.99"
                    }
                  ]
                }
                arr.push(test);
              
              
              set(ref(db,'User/'+regularusername+'/deck/'+deckname),
              {
                  "Maindeck":arr
              })
              update(ref(db,'User/'+regularusername+'/deck/'+deckname),
              {
                  "Extradeck":arr
              })
            }

            else
            {
              alert("Cannot Create more than 15 decks");
            }
          }
          else
          {
            alert("Cannot create deck with same name");
          }
        }
    }
    

    return(
        <div className='new-deck'>
        <form onSubmit={Deckcreation}>
        <h3>Make new deck</h3>
        <input type="text" 
        placeholder="Enter deck name"
        value={deckname}
        onChange = {(e)=>setdeckname(e.target.value)}
        ></input>
         
        <button type="submit" >Create Deck</button>
   

        </form>



        {(props.deckinfo!==null)?
        (

        <div id='deck-container'>
          <ul className="Alldecks" >
        
          {Object.keys(props.deckinfo).map((item,index)=>{

              return(
                  <li className="deck-name" key={index}>
                      <Link to= "/Deck" 
                      className="Createdeck"
                      onClick={()=>{
                        
                          props.currentdeck(item);
                      }}
                      
                      >
                      {item}
                      </Link>

                    <button
                    onClick={()=>{
                      console.log(props);
                      console.log(item);
                      var regularusername = props.username.substring(0,props.username.indexOf("@"));
                      remove(ref(db,'User/'+regularusername+'/deck/'+item))
                      .then(()=>{alert("Deck was deleted")})
                      .catch((error)=>{alert("There was an error")});
                    }}
                    
                    >Delete</button>
                      
                  </li>

                
                
              )
          })}

          </ul>
        </div>
        ):
        (
            <h3> </h3>
        )}










        </div>

      

    )

}


export default Createdeck