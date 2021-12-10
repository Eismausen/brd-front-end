import logo from './logo.svg';
import './App.css';
import react from "react";
import {useEffect, useState} from "react";
import NavBar from './NavBar';
import GameContainer from './GameContainer';
import { Switch, Route } from 'react-router-dom';
import Browse from './Browse';
import Inventory from './Inventory';
import Landing from './Landing';
import Home from './Home';
import Wishlist from "./Wishlist";

function App() {
  const gameDB = 'http://localhost:9292/boardgames';
  const userDB = 'http://localhost:9292/users';

  const [allGames, setAllGames] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({name: "Guest"});
  const [isLoaded, setIsLoaded] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  //on page load, grab all boardgames from DB
  useEffect(() => {
    fetch(gameDB)
    .then(res => res.json())
    .then(allBoardGames => {
      setAllGames(allBoardGames)
      setIsLoaded(true)
    })
    fetch(userDB)
    .then(res => res.json())
    .then(allUsers => setAllUsers(allUsers))
  }, [])

  //authentication helper
  // - sets active user
  // - sets inventory
  // - sets wishlist
  function activeUserSetter(userObj) {
    setActiveUser(userObj);
    
    let inventoryURL = `http://localhost:9292/inventory/${userObj.id}`;
    fetch(inventoryURL)
      .then(res => res.json())
      .then(boardgames => setInventory(boardgames))
    let wishlistURL = `http://localhost:9292/wishlist/${userObj.id}`;
    fetch(wishlistURL)
      .then(res => res.json())
      .then(boardgames => setWishlist(boardgames))
  }

  //inventory & wishlist helpers
  function addToInventory (gameObj) {
    let postObj = {user_id: activeUser.id, boardgame_id: gameObj.id};
    let postURL = 'http://localhost:9292/inventory';
    let postConfig = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(postObj)
    };
    fetch(postURL, postConfig)
    .catch(() => console.log("It looks like that record already exists in inventory!"))
    .then(res => res.json())
    .then(boardgame => setInventory([...inventory, boardgame]));
  }

  function deleteFromInventory(gameObj) {
    let deleteURL = `http://localhost:9292/inventory/${activeUser.id}/${gameObj.id}`;
    let deleteConfig = {
      method: 'DELETE',
      accept: 'applicaiton/json'
    }
    fetch(deleteURL, deleteConfig)
    .then(res => res.json())
    .then(confirmation => console.log(confirmation.message))
    .then(() => setInventory(inventory => inventory.filter(g => g.id !== gameObj.id)))
  }

  function addToWishlist(gameObj) {
    let postObj = {user_id: activeUser.id, boardgame_id: gameObj.id};
    let postURL = 'http://localhost:9292/wishlist';
    let postConfig = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(postObj)
    };
    fetch(postURL, postConfig)
    .catch(() => console.log("It looks like that record already exists in the wishlist!"))
    .then(res => res.json())
    .then(boardgame => setWishlist([...wishlist, boardgame]));
  }

  function deleteFromWishlist(gameObj) {
    let deleteURL = `http://localhost:9292/wishlist/${activeUser.id}/${gameObj.id}`;
    let deleteConfig = {
      method: 'DELETE',
      accept: 'application/json'
    }
    fetch(deleteURL, deleteConfig)
    .then(res => res.json())
    .then(confirmation => console.log(confirmation.message))
    .then(() => setWishlist(wishlist => wishlist.filter(g => g.id !== gameObj.id)))
  }

  

  if (!isLoaded) {
    return (
      <p>Well this is awkward - we're still loading!</p>
    )
  } else {  
    return (
      <div className="App">
        <h1>BRD & GM</h1>
        <NavBar user={activeUser}/>
        <Switch>
          <Route exact path="/">
            <Landing users={allUsers} activeUserSetter={activeUserSetter}/>
          </Route>
          <Route exact path="/home">
            <Home user={activeUser}/>
          </Route>
          <Route exact path="/browse">
            <Browse wishlist={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} inventory={inventory} addToInventory={addToInventory} deleteFromInventory={deleteFromInventory} games={allGames} user={activeUser}/>
          </Route>
          <Route exact path="/inventory">
            <Inventory wishlist={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist} user={activeUser} inventory={inventory} deleteFromInventory={deleteFromInventory}/>
          </Route>
          <Route exact path="/wishlist">
            <Wishlist inventory={inventory} addToInventory={addToInventory} deleteFromInventory={deleteFromInventory} user={activeUser} wishlist={wishlist} addToWishlist={addToWishlist} deleteFromWishlist={deleteFromWishlist}/>
          </Route>
          <Route path="*">
            <hi>404: Something broke!</hi>
          </Route>
        </Switch>        
      </div>
    )
  }
}

export default App;
