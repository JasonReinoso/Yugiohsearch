import React, {useEffect, useState} from 'react'
import {auth, db} from "../Firebase";
import { dummy } from './dummy';
import {getDatabase,ref,set,push,child, update} from "firebase/database";


function Decklist(props) {

  const [formatteddeck,setformatteddeck] = useState([]);
  const [formatted_extra_deck,setformatted_extra_deck] = useState([]);


  const [normalsum,setnormalsum] = useState(0);
  const [extrasum,setextrasum] = useState(0);
  const [Sum,setSum] = useState(0);

  const [monsters,setMonster] = useState(0);
  const [Spell,setSpell] = useState(0);
  const [Traps,setTraps] = useState(0);

useEffect(()=>{


  var monstercount = 0;
  var spellcount =0;
  var trapcounter =0;
  if(props.decklist.length===0)
  {
    //
  }
  else
  {
    for(var i =0; i < props.decklist.length;i++)
    {
      if(props.decklist[i].type.includes("Monster"))
        monstercount++;
       else if(props.decklist[i].type.includes("Spell"))
        spellcount++;
      else if(props.decklist[i].type.includes("Trap"))
        trapcounter++;
    }
  }
  setMonster(monstercount);
  setSpell(spellcount);
  setTraps(trapcounter);

})







  useEffect(()=>{

    var sum =0;

    if(props.decklist.length ===0)
    {
      setformatteddeck([]);
      setnormalsum(0);
    }

    else if(props.decklist.length !==0  )
    {   
      var results = props.decklist.slice();
      const chunks =[];

      while(results.length)
        chunks.push(results.splice(0,10));

      setformatteddeck(chunks);

      // calculate sum
      for(var i=0;i < props.decklist.length; i++)
      {
        sum+= Number(props.decklist[i].card_prices[0].tcgplayer_price);
      }
        setnormalsum(sum);
        
    }

    
    
    

  },[props.decklist])


  useEffect(()=>{
    var sum =0;

    if(props.Extradeck.length ===0)
    {
      setformatted_extra_deck([]);
      setextrasum(0);
    }

    else if(props.Extradeck.length !==0)
    {
      var extraresults = props.Extradeck.slice();
      const extra =[];
      while (extraresults.length)
        extra.push(extraresults.splice(0,10));
      setformatted_extra_deck(extra);

      for(var i=0; i < props.Extradeck.length;i++)
      {
        sum+= Number(props.Extradeck[i].card_prices[0].tcgplayer_price);
      }
      setextrasum(sum);
    }

  },[props.Extradeck])




  return (
    <div className="formatmaster">
      
      <div id='formatmaster-btns'>
      <label style={{color:'white'}}>Total price: ${(normalsum+extrasum).toFixed(2)}</label>
      <label style={{color:'white'}}>Monster: [{monsters}] </label>
      <label style={{color:'#00BFFF'}}>Spells: [{Spell}] </label>
      <label style={{color:'red'}}>Traps: [{Traps}]  </label>
     
        <button
        onClick={()=>{

          var username = props.username.substring(0,props.username.indexOf("@"));
          const dechunk = formatteddeck.flat(1); // this is main deck chunk
          const extrachunk = props.Extradeck.slice();
          
          //its used to insert dummy data in case if its empty.
          dechunk.unshift(dummy);
          extrachunk.unshift(dummy);
          
          if(dechunk.length < 61 && extrachunk.length < 17  )
          {
              set(ref(db,'User/'+username+'/deck/'+props.currentdeck),
              {
                "Maindeck":dechunk
              })

              update(ref(db,'User/'+username+'/deck/'+props.currentdeck),
              {
                "Extradeck":extrachunk
              }) 
          }

          else
          {
            console.log(extrachunk);
            alert("To many cards");
          }
        }}
        >Save</button>

      </div>
      <div id='main-and-extra-decks'>
        {(formatteddeck.length===0)?
          (
            ""
          ):
          (
            <div id='main-deck'>
              {formatteddeck.map((item)=>(
                <div className="rowbanlist">
                  {item.map((folder)=>{
                    return(
                      <div className="decklist-columns">
                          <li
                            onClick={()=>{
                              props.setcard(folder);
                            }}
                          ><img src={folder.card_images[0].image_url} height={120} width={87}></img></li>
                        </div>  
                    )
                  })}
                </div>
              ))}
            </div>
          )
        }
        {/* END OF MAIN DECK */}


        {/* START OF EXTRA DECK */}
        {(formatted_extra_deck.length===0)?
          (
            ""
          ):
          (
            <div id='extra-deck'>
              <hr className="cardline"></hr>
              <div id='extra-deck-card'>
                {formatted_extra_deck.map((item)=>(
                  <div className="rowbanlist">
                    {item.map((folder)=>{
                      return(
                        <div className="decklist-columns">
                            <li
                              onClick={()=>{
                                props.setcard(folder);
                              }}
                            ><img src={folder.card_images[0].image_url} height={120} width={87}></img></li>
                          </div>  
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div>

      
      </div>
  )
}

export default Decklist