import fetch from 'node-fetch';

let category_query = 'https://api.boardgameatlas.com/api/game/categories?client_id=NZQRPYlalg'
let database_to_dump_to = 'http://localhost:9292/categories'

function scraperHi() {
    fetch(category_query)
    .then(res => res.json())
    .then(allCategoriesObj => responseHandler(allCategoriesObj))
    console.log('Scraper says hi! Scraping: all Categories')
    console.log("Breaking now");
}

function responseHandler(categoriesObj) {
    let categoriesArray = categoriesObj.categories;
    for (const category of categoriesArray) {
        let categorySeed = {
            old_cat_ref: category.id,
            category_name: category.name
        }
        let postConfig = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(categorySeed)
        }
        fetch(database_to_dump_to, postConfig)
        .then(() => console.log("POST successful!"))
    }
}

scraperHi();