import GameCard from "./GameCard";

function GameContainer({games=[], inventory=[], addToInventory, deleteFromInventory, wishlist=[], addToWishlist, deleteFromWishlist}) {
    let cardsToRender = [];
    if (games.length > 0) {
        cardsToRender = games.map(game => <GameCard key={game.id} game={game} wishlist={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} inventory={inventory} deleteFromInventory={deleteFromInventory} addToInventory={addToInventory}/>)
    }
    

    return (
        <div id="GameContainer">
            {cardsToRender}            
        </div>
    )
}

export default GameContainer;