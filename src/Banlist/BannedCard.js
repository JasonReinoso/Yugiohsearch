import React from 'react'

function BannedCard(props) {
  return (
    
    <div className="cardborder">
        {console.log(props.card)}

    {!props.card.type.includes("Monster")?
    (
        <div className='card-container'>
        <h4>{props.card.name}</h4>
        <hr className="cardline"></hr>
        <img src={props.card.card_images[0].image_url} height={274} width={199}></img>
        <hr className="cardline"></hr>
        <li>Card Type: {props.card.type}</li>
        <li>Type: {props.card.race} </li>
        <li className="CardDesc">Description: {props.card.desc}</li>
       
        </div>
    )
    :
    (
    <div className='card-container'>
        <h3>{props.card.name}</h3>
        <hr className="cardline"></hr>
        <img src={props.card.card_images[0].image_url} height={274} width={199}></img>
        <hr className="cardline"></hr>
        <ul>
        
            <li>Attribute: {props.card.attribute}</li>
            <li>Rank:{props.card.level}</li>
            <li>Type:{props.card.race}/{props.card.type}</li>
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
    )
}



</div>
  )
}

export default BannedCard