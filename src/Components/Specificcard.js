import React from 'react'
import Addcard from './Addcard'
export default function Specificcard(props) {
  return (
    <div className="Cardinfo" >


   
     {(props.card===null)?
     (
        <div className="cardborder">
            <div className='card-container'>
                <h3>Click a card to view it here</h3>
                <hr className="cardline"></hr>
                <div id="empty-card"></div>
                <hr className="cardline2"></hr>
            </div>
        </div>
     )
    :(

        <div className="cardborder">

            {!props.card.type.includes("Monster")?
                <div className='card-container'>
                <h4>{props.card.name}</h4>
                <hr className="cardline"></hr>
                <img src={props.card.card_images[0].image_url} height={274} width={199}></img>
                <hr className="cardline"></hr>
                <div id='card-data'>
                    <ul id='card-data-list'> 
                        <li>Card Type: {props.card.type}</li>
                        <li>Type: {props.card.race} </li>
                        <li className="CardDesc">Description: {props.card.desc}</li>
                    </ul>
                </div>
                <Addcard username={props.username} card ={props.card} currentdeck ={props.currentdeck} setDecklist={props.setDecklist} decklist={props.decklist} />
                </div>
            :
        <div className='card-container'>
            <h3>{props.card.name}</h3>
            <hr className="cardline"></hr>
            <img src={props.card.card_images[0].image_url} height={274} width={199}></img>
            <hr className="cardline"></hr>
            <div id='card-data'>
                <ul id='card-data-list'>           
                    <li>Attribute: {props.card.attribute}</li>
                    <li>Rank:{props.card.level}</li>
                    <li>Type:{props.card.race}</li>
                    <li>Atk: {props.card.atk}</li>
                    {props.card.type.includes("Link")? 
                    (<li>Link Value: {props.card.linkval}</li>)
                    :
                    (<li>Def:  {props.card.def}</li>)
                    }
                    {props.card.scale === undefined?
                    ("")
                    :
                    (<li>Pendulum Scale: {props.card.scale}</li>)
                    }

                    <li className="CardDesc">Description: {props.card.desc}</li>
                </ul>
            </div>

        

            <Addcard username={props.username} card ={props.card} currentdeck ={props.currentdeck} setDecklist={props.setDecklist} setExtraDecklist={props.setExtraDecklist} decklist={props.decklist} Extradeck={props.Extradeck} />
        </div>
        }
       

       
        </div>





    ) // if else render
    }  {/*end of render if */}
        
        </div>    // end of cardinfo div
  ) //  end of  return
} // end of function 


