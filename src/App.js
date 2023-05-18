// This iteration is where extradeck is just being implemented so createdeckjs in update and deckjs in useeffect
import './App.css';
import Menu from './Components/Menu.js';
import Deck from './Components/Deck.js';
import Createdeck from './Components/Createdeck.js';
import Home from './Components/Home'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import SignIn from './Components/Auth/SignIn';
import Signup from './Components/Auth/Signup';
import Sign from './Components/Auth/Sign';
import Banlist from './Banlist/Banlist';
import React, {useState} from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Temp from './PriceHistory/Temp';
import PriceHistory from './PriceHistory/PriceHistory';

function App() {

  const [ User,setUser] = useState(null); // var that holds 
  //user info to pass as prop
  const [Deckinfo, setDeckinfo] = useState(null); // var that holds
  // ALL decks from the user.


  const [currentDeck,setcurrentdeck] = useState(""); // one deck that
  //when users get to search cards and add it this var will be responsible for 
  // it


  
const loginfun = details => // log in
{
  setUser(details);

}

const loaddeck = deckdetails => //upon log in
{
setDeckinfo(deckdetails);

}

const currentdeck = details => // upon selecting a deck 
{
  setcurrentdeck(details);
}

const [currentform,setCurrentform]= useState("login");// variable
// that sets up if its in log in or register

const changeform = details =>
{
  setCurrentform(details);  // function that helps change the state of login and 
  //register. This helps with 
  //SIGN IN and SIGNOUT always appearing.
  //finally a solution to that problem if i only have known sooner.
}








  return (
    <div className='App'>
   
   
    {(User===null)?
    (
      <div id='sign-in-page'>

      {currentform=== "login"?  <SignIn loginfun ={loginfun} loaddeck ={loaddeck} changeform ={changeform} />:  <Signup changeform ={changeform} /> }
  
      </div>
    )
  
  :(
    <div id="app-container">
      
    
            <Menu signout ={loginfun} killdeck ={loaddeck} killcurrentdeck ={currentdeck} />
            <h1 className="title">Yu-Gi-Search!</h1>
            <Routes>

                                                  {/* Deckinfo = holds all decks from user
                                                  currentDeck = holds the current deck the user wants to modify
                                                  currentdeck = function that loads one deck to var currentDeck */}

           <Route  path="/Createdeck" element={<Createdeck username = {User.user.email} deckinfo ={Deckinfo} currentdeck = {currentdeck}  />} />
            <Route path="/Deck" element={<Deck username={User.user.email} currentdeck = {currentDeck}   />} />
            <Route exact path="/" element={<Home username={User.user.email} />} />
            <Route path="/Banlist" element={<Banlist />} />
            <Route path="/PriceHistory" element={<PriceHistory />} />
            <Route path="/Temp" element={<Temp />} />
            {/* <Route path="./Components/Auth/Signout" element={<Signout />} /> */}
          </Routes>
          </div>
  )}
    </div>
     
      
  );
}

export default App;
