import React, {useEffect, useState} from "react";
import axios from "axios";
import Addcard from "../Components/Addcard";
import Popup from "../Filteredsearch/Popup";
import Filter from "../Filteredsearch/Filter";
import Specificcard from "./Specificcard";
import Decklist from "../Deck/Decklist";

import {auth,db} from "../Firebase";
import { getDatabase,ref,set,push,child,update,onValue } from "firebase/database";


export function Deck(props){
    
    const [test,setTest] = useState([]); // hook that recieves the search
    const[name,setName] = useState(""); // name of card to search for
    const [language, setLanguage] = useState("");    // used to setup langauge
    const [buttonPopup, setButtonPopup] = useState(false); //used for popup


    // monster hooks  to be passed in filter
    const [Level,setLevel] = useState("");
    const [Attribute, setAttribute] = useState("");
    const [MonsterType,setMonsterType] = useState("");
    const [Race,setRace] = useState("");
  // spell/traps hooks to be passed in filter
    const [Typeofmagic,setTypeofmagic] = useState("");


    const [row,setrow] = useState([]); // TESTING ATM


    const[specificcard,setcard] = useState(null);


    const[decklist, setDecklist] = useState([]);
    const[Extradeck,setExtraDecklist] = useState([]);
   

   
    useEffect(()=>{

        if(test.length !==0)
        {
            var results = test.slice();
            const chunks = [];
            while(results.length)
            chunks.push(results.splice(0,3));

            setrow(chunks);
        }
    },[test])

 // set decklist here
    useEffect(()=>{

        var username = props.username.substring(0,props.username.indexOf("@"));
        onValue(ref(db,'User/'+username+'/deck/'+props.currentdeck+"/Maindeck"),
        (snapshot)=>{
            const chunks = snapshot.val().slice();
            chunks.splice(0,1);
            setDecklist(chunks);
        })

        // implemntaiton of extra deck 
        onValue(ref(db,'User/'+username+'/deck/'+props.currentdeck+"/Extradeck"),
        (snapshot)=>{
            const chunks2 = snapshot.val().slice();
          
            chunks2.splice(0,1);
            setExtraDecklist(chunks2);
        })
       
    },[])



    

   

    const submitHandler = e => {

       if(name==="")
       alert("Please enter something");
       else
       {
            axios({
            method:"get",
            url:"https://db.ygoprodeck.com/api/v7/cardinfo.php?fname="+name+Level+Attribute+MonsterType+Race+Typeofmagic+language})
            .then(data => {
        
            
            setTest(data.data.data);

      
            // setPrice(data.data.data[0].card_prices[0]);
            // setImage(data.data.data[0].card_images[0].image_url);
           

            
          //  chunkarray(); //TESTING ATM
            


            // console.log(typeof(Object.values(data.data.data[0])));
            }) // from axios 
            .catch(error =>{
                alert("Search was unsuccessful");
            })
       }
     
    }









    return(
        

       <div id="edit-deck">
       
        <Specificcard card={specificcard} username={props.username} currentdeck ={props.currentdeck} setDecklist={setDecklist} decklist={decklist} Extradeck ={Extradeck} setExtraDecklist ={setExtraDecklist}></Specificcard>



        <Decklist decklist={decklist} Extradeck ={Extradeck} username={props.username} currentdeck = {props.currentdeck} setcard ={setcard}></Decklist>



        <div className="Search" >
            <div id='search-btns'>
                <label>Search</label>
                <br></br>
                <input type="text" onChange={e=>setName(e.target.value)} />
                <br></br>
                <select value={language} onChange={e=>setLanguage(e.target.value)}>
                    <option value="">English</option>
                    <option value="&language=de">German</option>
                    <option value="&language=it">Italian</option>
                    <option value="&language=pt">Portuguese</option>
                    <option value="&language=fr">French</option>
                </select>
                <button onClick={submitHandler}>Search</button>


                {/* Filtered search ish */}
                <button
                onClick={()=>{
                    setButtonPopup(true);
                }}
                >Filter</button>
                <Popup trigger={buttonPopup} setButtonPopup={setButtonPopup}>
                    <Filter setButtonPopup={setButtonPopup}
                        setLevel ={setLevel}
                        setAttribute ={setAttribute}
                        setMonsterType ={setMonsterType}
                        setRace = {setRace}
                        setTypeofmagic = {setTypeofmagic}
                    ></Filter>
                </Popup>
            </div>

       



        {(test.length===0)?  // to hide the search stuff if nothing has been searched
        (
            <h2> </h2>
        ):
        (
            <div className="rowscroll">
                      {row.map((item)=>
                            (
                                    <div className="Allrows"> 
                                    
                                        {item.map((folder)=>{
                                                
                                                return(
                                                    <div className="columns"> 
                                                     <li onClick={()=>{
                                                        setcard(folder);
                                                     }} 
                                                     ><img src={folder.card_images[0].image_url} height={180} width={130} /></li>

                                                    {/* <li>{folder.name}</li> */}
                                                    </div>
                                                )
                                            
                                        })}
                                        
                                </div>
                            )
                        )}

        </div>



        ) // end of render else

        } 
        {/* // end of if  */}

         </div> {/* end of search div */}
        </div>
    )

}

export default Deck