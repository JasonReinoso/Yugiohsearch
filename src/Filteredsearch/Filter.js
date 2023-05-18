import React, {useState} from 'react'

function Filter(props) {
    
const [Type,setType] = useState("Monster");

//redudant code zzz look for a way to make this
// cleaner.
const [Level,setLevel] = useState("");
const [Attribute, setAttribute] = useState("");
const [MonsterType,setMonsterType] = useState("");
const [Race,setRace] = useState("");
// spell/traps hooks to be passed in filter
const [Typeofmagic,setTypeofmagic] = useState("");


  return (
    <div>
        <h3>Filter</h3>

    <select 
    value={Type}
    onChange={(e)=>{
        setType(e.target.value);
        
    }}
    
    name="Super" id="Super">
        
        <option value="Monster">Monsters</option>
        <option value="Spells/Traps">Spells/Traps</option>
       
    </select>

    {(Type==="Monster")?
    (
        <div> 
    <label>Level/Rank</label>
    <select 
     value={Level}
     onChange={(e)=>{
         setLevel(e.target.value);
         
     }}
    
    name="Level" 
    id="Level"
    >
        <option value="">Any</option>
        <option value="&level=1">1</option>
        <option value="&level=2">2</option>
        <option value="&level=3">3</option>
        <option value="&level=4">4</option>
        <option value="&level=5">5</option>
        <option value="&level=6">6</option>
        <option value="&level=7">7</option>
        <option value="&level=8">8</option>
        <option value="&level=9">9</option>
        <option value="&level=10">10</option>
        <option value="&level=11">11</option>
        <option value="&level=12">12</option>
    </select>
    <br></br>
    <label>Attribute</label>
    <select 
     value={Attribute}
     onChange={(e)=>{
         setAttribute(e.target.value);
         
     }}
    name="Attribute" 
    id="Attribute">
        <option value="">Any</option>
        <option value="&attribute=Dark">Dark</option>
        <option value="&attribute=Divine">Divine</option>
        <option value="&attribute=Earth">Earth</option>
        <option value="&attribute=Fire">Fire</option>
        <option value="&attribute=Light">Light</option>
        <option value="&attribute=Water">Water</option>
        <option value="&attribute=Wind">Wind</option>
    </select>
    <br></br>
    <label>Monster Card Type</label>
    <select 
     value={MonsterType}
     onChange={(e)=>{
         setMonsterType(e.target.value);
         
     }}
    name="Card Type" 
    id="Card Type">
        <option value="">Any</option>
        <option value="&type=Normal Monster">Normal</option>
        <option value="&type=Effect Monster">Effect</option>
        <option value="&type=Fusion Monster">Fusion</option>
        <option value="&type=Ritual Monster">Ritual</option>
        <option value="&type=Synchro Monster">Synchro</option>
        <option value="&type=Xyz Monster">Xyz</option>
        <option value="&type=normal_pendulum Monster">Normal Pendulum</option>
        <option value="&type=effect_pendulum Monster">Effect Pendulum</option>
        <option value="&type=ritual_pendulum Monster">Ritual Pendulum</option>
        <option value="&type=fusion_pendulum Monster">Fusion Pendulum</option>
        <option value="&type=synchro_pendulum Monster">Synchro Pendulum</option>
        <option value="&type=xyz_pendulum Monster">Xyz Pendulum</option>
        <option value="&type=Link Monster">Link</option>

    </select>

    <br></br>

    <label>Type</label>
    <select 
     value={Race}
     onChange={(e)=>{
         setRace(e.target.value);
         
     }}
    name="race" id="race">
        <option value="">Any</option>
        <option value="&race=Spellcaster">Spellcaster</option>
        <option value="&race=Dragon">Dragon</option>
        <option value="&race=Zombie">Zombie</option>
        <option value="&race=Warrior">Warrior</option>
        <option value="&race=Beast-warrior">Beast-warrior</option>
        <option value="&race=Beast">Beast</option>
        <option value="&race=Machine">Machine</option>
        <option value="&race=Fiend">Fiend</option>
        <option value="&race=Fairy">Fairy</option>
        <option value="&race=Insect">Insect</option>
        <option value="&race=Dinosaur">Dinosaur</option>
        <option value="&race=Reptile">Reptile</option>
        <option value="&race=Sea Serpent">Sea Serpent</option>
        <option value="&race=Aqua">Aqua</option>
        <option value="&race=Pyro">Pyro</option>
        <option value="&race=Thunder">Thunder</option>
        <option value="&race=Rock">Rock</option>
        <option value="&race=Plant">Plant</option>
        <option value="&race=Psychic">Psychic</option>
        <option value="&race=Wyrm">Wyrm</option>
        <option value="&race=Cyberse">Cyberse</option>
        <option value="&race=Dinvine-Beast">Dinvine-Beast</option>
       
    </select>
    </div>
    )
    :(
        <div> 
    <label> Types of Spells/Traps </label>
    <select 
     value={Typeofmagic}
     onChange={(e)=>{
         setTypeofmagic(e.target.value);
         
     }}
    
    name="Type of spell/trap" id="Type of spell/trap">
        <option value="">Any</option>
        <option value="&race=Normal">Normal Spell</option>
        <option value="&race=Field">Field Spell</option>
        <option value="&race=Equip">Equip Spell</option>
        <option value="&race=Continuous">Continuous Spell</option>
        <option value="&race=Quick-Play">Quick-Play Spell</option>
        <option value="&race=Ritual">Ritual Spell"</option>
        <option value="&race=Normal">Normal Trap</option>
        <option value="&race=Continuous">Continuous Trap</option>
        <option value="&race=Counter">Counter Spell</option>
    </select>


    </div>
    )}
<br></br>
    <button
     onClick={()=>{
        props.setButtonPopup(false);
        if(Type==="Monster")
        {
            props.setLevel(Level)
            props.setAttribute(Attribute)
            props.setMonsterType(MonsterType)
            props.setRace(Race)
            props.setTypeofmagic("")
            
        }
        else
        {
            props.setLevel("")
            props.setAttribute("")
            props.setMonsterType("")
            props.setRace("")
            props.setTypeofmagic(Typeofmagic)
        }
        

        
     }}
    >
        Apply filter
    </button>  

    <br></br>
    <button
    onClick={()=>{
        props.setButtonPopup(false);
        props.setLevel("")
        props.setAttribute("")
        props.setMonsterType("")
        props.setRace("")
        props.setTypeofmagic("")
    }}
    >Clear filter</button>
    </div>
  )
}

export default Filter