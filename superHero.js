async function searchById(id) {
    console.log("called searchbyId");
    try {
        const superhero = await fetch(`https://superheroapi.com/api.php/2320860311550541/${id}`);
        const data = await superhero.json();
        if (data.response === "success") {
            const results = data;
            renderSearch(results);
        }
    }
    catch (error) {
        console.log(error);
    }
}

function renderSearch(results) {
        let superHero=results;
        let searchResultsContainer="";
        
        searchResultsContainer += `<div class="card mb-3">
                                                <img src="${superHero.image.url}" class="card-img-top" alt="...">
                                            
                                            
                                                <div class="card-body text-center text-primary">
                                                    <h3 class="card-title">${superHero.name}</h3>
                                                </div>
                                                <div class="card-body text-center text-primary">
                                                    <h3 class="card-title">PowerStats</h3>
                                                </div>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item"><div>Combat</div><div>${superHero.powerstats.combat}</div></li>
                                                    <li class="list-group-item"><div>Intelligence</div><div>${superHero.powerstats.intelligence}</div></li>
                                                    <li class="list-group-item"><div>Durability</div><div>${superHero.powerstats.durability}</div></li>
                                                    <li class="list-group-item"><div>Strength</div><div>${superHero.powerstats.strength}</div></li>
                                                    <li class="list-group-item"><div>speed</div><div>${superHero.powerstats.speed}</div></li>
                                                </ul>
                                                <div class="card-body text-center text-primary">
                                                    <h3 class="card-title">Biography</h3>
                                                </div>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item"><div>alignment</div><div>${superHero.biography["alignment"]}</div></li>
                                                    <li class="list-group-item"><div>first-appearance</div><div>${superHero.biography["first-appearance"]}</div></li>
                                                    <li class="list-group-item"><div>full-name</div><div>${superHero.biography["full-name"]}</div></li>
                                                    <li class="list-group-item"><div>place-of-birth</div><div>${superHero.biography["place-of-birth"]}</div></li>
                                                </ul>
                                            
                                    </div>`
    document.getElementsByClassName('superHero-details')[0].innerHTML = searchResultsContainer;
}

function getQueryParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    searchById(id);
}

getQueryParameter();