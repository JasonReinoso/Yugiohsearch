import React from 'react'
import axios from 'axios'
import Popup from '../Filteredsearch/Popup';
import { useState, useEffect } from 'react'
import BannedCard from './BannedCard';



function Banlist(props) {

    const [banlist,setbanlist] = useState(); //tcg, ocg

    const [Official,setOfficial] = useState("tcg");
    const [section,setSection] = useState(""); // if user clicks either tcg or ocg buttons it should change to  the section of forbidden
    // limited or semi-limited

    const[forbidden,setforbidden] = useState();
    const [limited, setlimited] = useState();
    const [semilimited, setsemilimited] = useState();

    const[master,setMaster]= useState([]);

    const [card,setCard] = useState([]);
    const [buttonPopup,setButtonPopup] = useState(false);
    

    useEffect(()=>{
      
        
        axios({
            method:"get",
            url:"https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg"
        }).then(data=>{

            const chunks =[];
            const chunks2 = [];
            const chunks3 = [];



            var resultsban = [];
            var resultlimit =[];
            var resultsemilimit = [];
           // var results = data.data.data.slice();
            for(var i=0;i<data.data.data.length;i++)
            {
                if(data.data.data[i].banlist_info.ban_tcg==="Banned")
                {
                    resultsban.push(data.data.data[i]);
                }
                if(data.data.data[i].banlist_info.ban_tcg==="Limited")
                    resultlimit.push(data.data.data[i]);

                if(data.data.data[i].banlist_info.ban_tcg==="Semi-Limited")
                    resultsemilimit.push(data.data.data[i]);
            }
           

            while(resultsban.length)
            chunks.push(resultsban.splice(0,7));

            while(resultlimit.length)
            chunks2.push(resultlimit.splice(0,7));

            while(resultsemilimit.length)
            chunks3.push(resultsemilimit.splice(0,7));

            setbanlist(chunks);
            setlimited(chunks2);
            setsemilimited(chunks3);
        })
    },[])

   
  const bantcg = () =>
    {
        setOfficial("tcg");
        axios({
            method:"get",
            url:"https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg"
        }).then(data=>{

            const chunks =[];
            const chunks2 = [];
            const chunks3 = [];



            var resultsban = [];
            var resultlimit =[];
            var resultsemilimit = [];
        // var results = data.data.data.slice();
            for(var i=0;i<data.data.data.length;i++)
            {
                if(data.data.data[i].banlist_info.ban_tcg==="Banned")
                {
                    resultsban.push(data.data.data[i]);
                }
                if(data.data.data[i].banlist_info.ban_tcg==="Limited")
                    resultlimit.push(data.data.data[i]);

                if(data.data.data[i].banlist_info.ban_tcg==="Semi-Limited")
                    resultsemilimit.push(data.data.data[i]);
            }
        

            while(resultsban.length)
            chunks.push(resultsban.splice(0,7));

            while(resultlimit.length)
            chunks2.push(resultlimit.splice(0,7));

            while(resultsemilimit.length)
            chunks3.push(resultsemilimit.splice(0,7));

            setbanlist(chunks);
            setlimited(chunks2);
            setsemilimited(chunks3);

            if(section==="Forbidden")
            {
                setMaster(chunks);
            }
            else if(section ==="Limited")
            {
                setMaster(chunks2);
            }
            else if(section==="Semi-Limited")
            {
                setMaster(chunks3);
            }


            
        })
    }

    const banOCG = () =>
    {
        setOfficial("ocg");
        axios({
            method:"get",
            url:"https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=ocg"
        }).then(data=>{

            const chunks =[];
            const chunks2 = [];
            const chunks3 = [];



            var resultsban = [];
            var resultlimit =[];
            var resultsemilimit = [];
        // var results = data.data.data.slice();
            for(var i=0;i<data.data.data.length;i++)
            {
                if(data.data.data[i].banlist_info.ban_ocg==="Banned")
                {
                    resultsban.push(data.data.data[i]);
                }
                if(data.data.data[i].banlist_info.ban_ocg==="Limited")
                    resultlimit.push(data.data.data[i]);

                if(data.data.data[i].banlist_info.ban_ocg==="Semi-Limited")
                    resultsemilimit.push(data.data.data[i]);
            }
        

            while(resultsban.length)
            chunks.push(resultsban.splice(0,7));

            while(resultlimit.length)
            chunks2.push(resultlimit.splice(0,7));

            while(resultsemilimit.length)
            chunks3.push(resultsemilimit.splice(0,7));

            setbanlist(chunks);
            setlimited(chunks2);
            setsemilimited(chunks3);

            if(section==="Forbidden")
                {
                    setMaster(chunks);
                }
            else if(section ==="Limited")
                {
                    setMaster(chunks2);
                }
            else if(section==="Semi-Limited")
                {
                    setMaster(chunks3);
                }


        })
    }











    


  return (
    <div className="masterban">
        <div className="Banlistbuttons">
            <h2>Banlist: </h2>
            
        
            <button className={Official==="tcg"? "ban-btn-pressed":"ban-btn"} onClick={bantcg}>TCG</button>
            <button className={Official==="ocg"? "ban-btn-pressed":"ban-btn"} onClick={banOCG}>OCG</button>   
            <br></br>
            
            <button className={section==="Forbidden"? "ban-btn-pressed":"ban-btn"} onClick={()=>{setMaster(banlist); setSection("Forbidden");}}>Forbidden</button>
            <button className={section==="Limited"? "ban-btn-pressed":"ban-btn"} onClick={()=>{setMaster(limited); setSection("Limited");}}>Limited</button>
            <button className={section==="Semi-Limited"? "ban-btn-pressed":"ban-btn"} onClick={()=>{setMaster(semilimited); setSection("Semi-Limited")}}>Semi-Limited</button>
            <br></br>
            <br></br>
        </div>
        {(master.length===0)?
            (<div className="banlistgrid"></div>): 
            (  
                <div className="banlistgrid">
                    {master.map((item)=>(
                        <div className="rowbanlist">
                            {item.map((folder)=>{
                                return(
                                    <div className="columns">
                                        <li
                                        onClick={()=>{
                                            setCard(folder);
                                            setButtonPopup(true);
                                        }}
                                        ><img src={folder.card_images[0].image_url} height={180} width={130}></img></li>
                                    </div>
                                )
                            })}                        
                        </div>
                    ))}
                </div>
            )}

            <Popup trigger={buttonPopup} setButtonPopup={setButtonPopup}>
                <BannedCard card={card}>
                    
                </BannedCard>
            </Popup>


    </div>
  )
}

export default Banlist
