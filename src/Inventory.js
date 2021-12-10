import GameContainer from './GameContainer';
import {useState, useEffect} from "react";

function Inventory({user, inventory, addToInventory, deleteFromInventory, wishlist, addToWishlist, deleteFromWishlist}) {
    
    return(
        <>
        <h2>{user.name}'s Inventory</h2>
        {inventory.length > 0 ? <GameContainer games={inventory} wishlist={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} inventory={inventory} addToInventory={addToInventory} deleteFromInventory={deleteFromInventory}/> : <p>It looks like you don't have any games in your inventory, yet! Add some from the Browser :D</p>}
        </>
    )
}

export default Inventory;