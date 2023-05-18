import React from "react";
import {MenuItem} from './MenuItem.js'

export function Home(props){

    var username = props.username.substring(0,props.username.indexOf("@"));
    return(
        <div className="sweethome" style={{color:"black"}}>
            <h3>Hello {username}</h3>
            <h3>This is how to use Yu-gi-Search</h3>
            <p >The menu above will lead you to 3 places 
               Price History, Edit Deck, Ban list.   
            </p>
            <p> <b>Price history:</b> This page will let you search for cards based on your
                input. Then a collection of cards will appear based off that search.
                Clicking on a card will reveal a table. The table will have all the code numbers
                of the clicked card. Clicking on one of those tables will show you a graph of that specific 
                card's price history. Click one of the buttons above the graph to change intervals.
            </p>
            <p> <b>Create decks:</b> This page will let you create/delete decks. You can only create up to 15 decks. When selecting a deck you can also 
                edit it as well. You can search, add, and remove cards to that deck. To search, just give an input, you can also filter
                the results as well by clicking the filter button. You can only add up to 60 cards in the main deck, and 15 cards in the extra deck.
                Also you can add at most 3 copies of a card into the deck. The webpage will tell you the total price 
                of your deck.
            </p>
            <p> <b>Banlist:</b> This page will show you what cards are in the Forbidden/Limited/Semi-Limited list. You can switch between the two formats 
                of TCG, and OCG. Clicking on a card will give you a more detailed look of the card's informaiton.
            </p>
        </div>
    )
   
}

export default Home