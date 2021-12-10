import {Link} from "react-router-dom";
function NavBar({user}) {

    return (
        <div id="NavBar">
            <Link to="/inventory">+ Inventory</Link>
            <Link to="/wishlist">+ Wishlist</Link>
            <Link to="/home">+ Home</Link>
            <Link to="/browse">+ Browse</Link>
            {user?.id !== undefined ? null : <Link to="/">+ Login</Link>}
        </div>
    )
}

export default NavBar;