
            //main function for favourites
            function favouritesFunction() {
                let favourites = JSON.parse(localStorage.getItem("favourites"));
                if(favourites.length==0){
                    document.getElementsByClassName('row')[0].innerHTML = '<h5>NO FAVOURITES ADDED</h5>';
                    return;
                }
                document.getElementsByClassName('row')[0].innerHTML = "";
                for (let i = 0; i < favourites.length; i++) {
                    searchById(favourites[i]);
                }
            }

            //handle event listeners
            function eventListenerMethod() {
                var buttons = document.getElementsByClassName('btn');
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        let id = buttons[i].id;
                        favourites = JSON.parse(localStorage.getItem("favourites"));
                        var indextobeDeleted = favourites.indexOf(id);
                        favourites.splice(indextobeDeleted, 1);
                        window.localStorage.setItem("favourites", JSON.stringify(favourites));
                        favouritesFunction();
                    })
                }
            }

            //search element by Id
            async function searchById(id) {
                try {
                    const superhero = await fetch(`https://superheroapi.com/api.php/2320860311550541/${id}`);
                    const data = await superhero.json();
                    console.log(data);
                    if (data.response === "success") {
                        renderFavourites(data);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
    
    //render favourites
    function renderFavourites(favouriteHero) {
        let favouritesResults=document.getElementsByClassName('row')[0].innerHTML;
            favouritesResults+=`<div class="card bg-dark text-white">
                                    <div class="col mb-4">
                                        <img src="${favouriteHero.image.url}" class="card-img-top" alt="...">                                        
                                        <div class="card-img-overlay">
                                            <ul class="list-group list-group-flush">
                                            <h1 class="card-title text-center bg-info">${favouriteHero.name}</h1>
                                            <a href="#" class="btn btn-primary" id="${favouriteHero.id}">Remove from Favourites</div></a>
                                            </ul>
                                        </div>        
                                    </div>                                       
                                </div>`
        document.getElementsByClassName('row')[0].innerHTML = favouritesResults;
        eventListenerMethod();
    }


    favouritesFunction();