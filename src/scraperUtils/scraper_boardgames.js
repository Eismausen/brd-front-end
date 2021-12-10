import fetch from 'node-fetch';
//The intention is to use this as a scraper utility
let all_games_url = 'https://api.boardgameatlas.com/api/search?name= &limit=100&skip='
let client_id = `&client_id=NZQRPYlalg`
let all_records = 130198
let database_to_dump_to = 'http://localhost:9292/boardgames'



//Going to need to generate a list of query seeds to the tune of 'aa', 'ab', 'ac'... 'za', 'zb', 'zc'
//26 letters, permutations of 2 letters = 26*26 combinations/queries = 676 queries
//130,000 records / 676 ~~ 192 results "on average" (assuming normal distribution... which typical naming conventions don't obey, but still - you understand the idea)

let querySeeds = [];
let allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let querySeedIndexTracker = 0;
let skipTracker = 0;

//generates querySeeds
/*for (const firstLetter of allLetters) {
    for (const secondLetter of [...allLetters, " "]) {
        for (const thirdLetter of [...allLetters, " "]) {
            let seed = `${firstLetter}${secondLetter}${thirdLetter}`;
            querySeeds.push(seed);
        }        
    }
}*/
for (const firstLetter of allLetters) {
    for (const secondLetter of allLetters) {
        let seed = `${firstLetter}${secondLetter}`;
        querySeeds.push(seed);
    }
}

function resultsHandler(resultsObj) {
    //This indexes the 'games' out of the response object, leaving us with the array of results
    let resultsArray = resultsObj.games;
    console.log(`Number of results from query: ${resultsArray.length}`)
    if (!resultsArray) {
        console.log("Something broke!");
        console.log("Here's the value of the results array:");
        console.log(resultsArray);
        querySeedIndexTracker += 1;
        skipTracker = 0;
        return null
    }    

    //if the resultsArray has less than 100 results, then all of the results will be POSTed
    //so we can reset the scraper trackers and advance to the next querySeed index
    if (resultsArray.length < 100) {
        skipTracker = 0;
        querySeedIndexTracker += 1;
    } else {
        //if the resultsArray is NOT less than 100 elements, then it will BE 100 elements
        //that is because the query limit is capped at 100; so we'll need to advance the 
        //skip tracker for the next query on the querySeed
        skipTracker += 100;
    }

    //For each result in the array, I'd like to create a new object that
    //conforms to the database schema for Boardgame objects
    for (const result of resultsArray) {
        //This instantiates the seed object, and wraps the boardgameatlas data
        let boardgameSeedData = {
            name: result?.name,
            url: result?.url,
            price_usd: result?.price,
            msrp: result?.msrp,
            year_published: result?.year_published,
            min_players: result?.min_players,
            max_players: result?.max_players,
            min_playtime: result?.min_playtime,
            max_playtime: result?.max_playtime,
            min_age: result?.min_age,
            description_preview: result?.description_preview,
            description:  result?.description,
            commentary: result?.commentary,
            faq: result?.faq,
            thumb_url:  result?.thumb_url,
            image_url: result?.image_url,
            publisher:  result?.primary_publisher?.name,
            designer:  result?.primary_designer?.name,
            artist: result?.artists[0],
            learning_complexity:  result?.average_learning_complexity,
            strategy_complexity: result?.average_strategy_complexity,
            bga_rating:  result?.average_user_rating,
            mechanics: result?.mechanics,
            categories: result?.categories
        }        
        //console.log(`'${result.name}' turned into Boardgame object. Preparing POST now.`);
        let post_config = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(boardgameSeedData)
        }
        //execute POST prepared post_config
        fetch(database_to_dump_to, post_config)
        .then(() => console.log("POST successful"))
    }
}

function scraperHi() {
    //sample fetch_url by partial string: 
    //https://api.boardgameatlas.com/api/search?name=a&limit=100&skip=0&client_id=NZQRPYlalg
    //name=${querySeed[querySeedIndexTracker]}
    //skip=${skipTracker}
    //stitched query with interpolation:
    //https://api.boardgameatlas.com/api/search?name=${querySeed[querySeedIndexTracker]}&limit=100&skip=${skipTracker}&client_id=NZQRPYlalg
    let full_fetch_url = `https://api.boardgameatlas.com/api/search?name=${querySeeds[querySeedIndexTracker]}&limit=100&skip=${skipTracker}&client_id=NZQRPYlalg`;
    fetch(full_fetch_url)
    .then(res => res.json())
    .then(hundredBoardGameResultsObj => resultsHandler(hundredBoardGameResultsObj))
    console.log(`Scraper says hi! Scraping: seed=${querySeeds[querySeedIndexTracker]} && skip#=${skipTracker}`);
}

let myScraper = setInterval(() => scraperHi(), 10000);