import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Popup from '../Filteredsearch/Popup';
import PriceGraph from './PriceGraph';
function Temp() {

    const [name,setName] = useState("");
    const [codes,setCodes] = useState(null);
    const [graphcode,setgraphcode] = useState("");



    const [buttonPopup, setButtonPopup] = useState(false);

    const [card,setcard] = useState("");

    const [row,setrow] = useState([]);

    const submitHandler = e => {

       if(name==="")
       alert("Please enter something");
       else
       {
            axios({
            method:"get",
            url:"https://db.ygoprodeck.com/api/v7/cardinfo.php?fname="+name})
            .then(data => {
            
            if(data.data.data.length!=0)
            {
                var results = data.data.data.slice();
                const chunks =[];
                while(results.length)
                chunks.push(results.splice(0,3));
                setrow(chunks);
            }
            
            
        // setCodes(data.data.data[0].card_sets)
            
        
            }) // from axios 
            .catch(error =>{
                alert("Search was unsuccessful");
            })

            
    }
}







  return (
    <div id="price-history">
        <div id="search-section">
            <label style={{color:'white'}}>Search</label>
            
            <input type="text" onChange={e=>setName(e.target.value)} />
            <button onClick={submitHandler}>Search</button>

        </div>

        <br></br>
        <br></br>

        {/* NEW CODE BELOW */}
        <div id="results-and-table">
            
            {(row.length===0)?
            (<h2> </h2>):
            (
                <div className="Search"> 
                <label style={{color:'white'}}>Results: </label>
                    <div className="rowscroll">
                        {row.map((item)=>
                            (
                                    <div className="Allrows"> 
                                    
                                        {item.map((folder)=>{
                                                
                                                return(
                                                    <div className="columns"> 
                                                    <li onClick={()=>{
                                                        setCodes(folder.card_sets);
                                                        setcard(folder.name);
                                                
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
                </div>
            )}

            {/* NEW CODE XD ABOVE */}










            {(codes==null)?
            (
                <h3></h3>
            ) 
            :
            (
                <div className="table4graph">
                    
                    <table>
                        <tr>
                            Name: {card}
                            
                        </tr>
                        <tr>
                            <td>Code</td>
                            <td>Sets</td>
                            <td>Rarity</td>
                        </tr>
                    {codes.map((item,index)=>{
                    return(
                    <tr onClick={()=>{
                        setButtonPopup(true);
                        setgraphcode(item.set_code);
                    }}
                    key ={index}>
                        <td>{item.set_code}</td>
                        <td>{item.set_name}</td>
                        <td>{item.set_rarity} {item.set_rarity_code}</td>
                    </tr>
                    )})}
                </table>
                <Popup trigger={buttonPopup} setButtonPopup={setButtonPopup}>

                    <PriceGraph graphcode ={graphcode}></PriceGraph>


                    </Popup>
                </div>
            )}

        </div>


    </div>
  )
}

export default Temp