import fetch from 'node-fetch';

let mechanic_query = 'https://api.boardgameatlas.com/api/game/mechanics?client_id=NZQRPYlalg'
let database_to_dump_to = 'http://localhost:9292/mechanics'

function scraperHi() {
    fetch(mechanic_query)
    .then(res => res.json())
    .then(allMechanicsObj => responseHandler(allMechanicsObj))
    console.log('Scraper says hi! Scraping: all Mechanics')
    console.log("Breaking now");
}

function responseHandler(mechanicsObj) {
    let mechanicsArray = mechanicsObj.mechanics;
    for (const mechanic of mechanicsArray) {
        let mechanicSeed = {
            old_mech_ref: mechanic.id,
            mechanic_name: mechanic.name
        }
        let postConfig = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(mechanicSeed)
        }
        fetch(database_to_dump_to, postConfig)
        .then(() => console.log("POST successful!"))
    }
}

scraperHi();