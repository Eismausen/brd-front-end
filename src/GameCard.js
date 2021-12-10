import {useState} from "react";
function GameCard({game, inventory, addToInventory, deleteFromInventory, wishlist, addToWishlist, deleteFromWishlist}) {
    /*Debugging & flow logging
    console.log("You're building a game card right now!");
    console.log(game.name);*/

    const [expandedInfo, setExpandedInfo] = useState(false);
    
    let checkInventory = inventory.filter(g => g.name === game.name).length > 0;
    let checkWishlist = wishlist.filter(g => g.name === game.name).length > 0;

    function expandCard() {
        setExpandedInfo(expandedInfo => !expandedInfo);
    }



    if (!expandedInfo) {
        return (
            <div id="GameCard">
                <p onClick={expandCard}>{game.name}</p>
                <img src={game.image_url} alt={game.name}  onClick={expandCard}/>
                {checkInventory ? <button onClick={() => deleteFromInventory(game)} id="deleteFromInventory">Delete from Inventory</button> : <button onClick={() => addToInventory(game)} id="addToInventory">Add to Inventory</button>}
                {checkWishlist ? <button onClick={() => deleteFromWishlist(game)} id="deleteFromWishlist">Delete from Wishlist</button> : <button onClick={() => addToWishlist(game)} id="addToWishlist">Add to Wishlist</button>}
            </div>
        )
    } else {
        return (
            <div id="ExpandedCard" >
                <p onClick={expandCard}>{game.name}</p>
                <img src={game.thumb_url} alt={game.name} onClick={expandCard}/>
                <p onClick={expandCard}>Recommended for: {game.min_age}yrs+</p> 
                <p onClick={expandCard}># players: {game.min_players} - {game.max_players}</p>
                <p onClick={expandCard}>Play time: {game.min_playtime} - {game.max_playtime}</p>
                <p onClick={expandCard}>MSRP: ${game.msrp}</p>
                <p onClick={expandCard}>Learning complexity: {game.learning_complexity}</p>
                <p onClick={expandCard}>Strategy complexity: {game.strategy_complexity}</p>
                <p onClick={expandCard}>Average rating: {game.bga_rating.toFixed(2)}</p>
                {checkInventory ? <button onClick={() => deleteFromInventory(game)} id="deleteFromInventory">Delete from Inventory</button> : <button onClick={() => addToInventory(game)} id="addToInventory">Add to Inventory</button>}
                {checkWishlist ? null : <button id="addToWishlist">Add to Wishlist</button>}
            </div>
        )
    }
}

export default GameCard;