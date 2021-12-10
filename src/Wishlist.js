import GameContainer from './GameContainer';
import {useState, useEffect} from "react";

function Wishlist({user, inventory, addToInventory, deleteFromInventory, wishlist, addToWishlist, deleteFromWishlist}) {
    
    return(
        <>
        <h2>{user.name}'s Wishlist</h2>
        {wishlist.length > 0 ? <GameContainer games={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} inventory={inventory} addToInventory={addToInventory} deleteFromInventory={deleteFromInventory}/> : <p>It looks like you don't have any games in your wishlist, yet! Add some from the Browser :D</p>}
        </>
    )
}

export default Wishlist;