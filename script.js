//searchBox dom
var searchBox = document.getElementsByClassName('form-control');
var searchButton = document.getElementsByClassName('input-group-text');

//Array for local storage items
let favourites = [];
if (window.localStorage.getItem("favourites")) {
    favourites = JSON.parse(localStorage.getItem("favourites"));
}

//Event listeners for keypress and click
function eventListenerKeys(){
    //event listener for Enter key
    searchButton[0].addEventListener('click', function(e){
        searchByName(searchBox[0].value);
        //eventListenerMethod();
        e.stopPropagation();
    })
    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13)
            searchByName(searchBox[0].value);
        //eventListenerMethod();
        e.stopPropagation();
    });
}

//Event Listeners for buttons
function eventListenersButtons() {

    //event listeners for buttons
    var buttons = document.getElementsByClassName('btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (e) {
            e.preventDefault();
            console.log(buttons[i]);
            let id = buttons[i].id;
            let favourites = [];
            if (window.localStorage.getItem("favourites")) {
                favourites = JSON.parse(localStorage.getItem("favourites"));
            }
            //Handle add to favourites and remove favourites
            if (buttons[i].innerText == "Add to Favourites") {
                buttons[i].innerText = "Remove from Favourites";
                favourites.push(id);
                window.localStorage.setItem("favourites", JSON.stringify(favourites));
            }
            else {
                buttons[i].innerText = "Add to Favourites";
                let indextobeDeleted = favourites.indexOf(id);
                favourites.splice(indextobeDeleted, 1);
                window.localStorage.setItem("favourites", JSON.stringify(favourites));
            }
        })
    }
}

//fetch superheroes by name
async function searchByName(name) {
    try {
        if(name.length<=2){return;}
        const superhero = await fetch(`https://superheroapi.com/api.php/2320860311550541/search/${name}`);
        const data = await superhero.json();
        if (data.response === "success") {
            const results = data.results;
            console.log(results);
            renderSearch(results);
        }
    }
    catch (error) {
        console.log(error);
    }
}

function renderSearch(results) {
    let searchResultsContainer = "";
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    results.forEach(result => {
        //handles search result for superheroes already present in the favourites
        let status = "";
        if (favourites != null && favourites.includes(result.id)) {
            status = "Remove From Favourites"
        }
        else {
            status = "Add to Favourites"
        }
        searchResultsContainer += `<div class="card mb-3">
                                        <div class="row no-gutters">
                                            <div class="col-md-3">
                                                <img src="${result.image.url}" class="card-img" alt="...">
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <a href="superHero.html?id=${result.id}" ><h3 class="card-title">${result.name}</h3></a>
                                                    <h6 class="card-title">strength: ${result.powerstats.strength}</h6>
                                                    <h6 class="card-title">power: ${result.powerstats.power}</h6>
                                                    <div href="#" class="btn btn-primary" id="${result.id}">${status}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    });
    document.getElementsByClassName('search-results-container')[0].innerHTML = searchResultsContainer;
    eventListenersButtons();
}

eventListenerKeys();