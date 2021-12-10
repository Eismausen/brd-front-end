import GameContainer from './GameContainer';

function Browse ({user, games, inventory, addToInventory, deleteFromInventory, wishlist, addToWishlist, deleteFromWishlist }) {

    return (
        <div id="Browse">
            <h2>Browsing all games as {user.name}</h2>
            <GameContainer user={user} deleteFromInventory={deleteFromInventory} addToInventory={addToInventory} inventory={inventory} games={games} wishlist={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} />
        </div>
    )
}

export default Browse;