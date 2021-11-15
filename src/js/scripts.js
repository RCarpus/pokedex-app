let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    //Make the API call to load in the pokemon list
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            let pokeID = 0; //Each pokemon will get a unique pokeID
            json.results.forEach(function (item) {
                pokeID += 1;
                let pokemon = {
                name: item.name[0].toUpperCase() + item.name.substring(1),
                detailsUrl: item.url,
                pokeID: 'ID-' + pokeID //this is a string not starting with a number because it will be used as a css class
                };
            add(pokemon);
            });
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        })
    }

      //API call to load details when pokemon is clicked on
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
          // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = parseTypes(details.types);
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function parseTypes(types) {
        //pass in the types property of a pokemon object
        //return a list of types
        //assume a properly formatted types list is passed in
        let parsed = [];
        types.forEach(function(type) {
            parsed.push(type.type.name);
        });
        return parsed;
    }

    function add(pokemon) {        
        /*
        Adds the pokemon to the repository 
        Previously implemented validation is shut off right now because it will need reworking.
        */
        pokemonList.push( {
            name: pokemon.name,
            detailsUrl: pokemon.detailsUrl,
            pokeID: pokemon.pokeID
        });
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        //Adds a <li> with a child <button class="pokemon-button list-group-item"> to the parent <ul class="pokemon-list">
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add(pokemon.pokeID);
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container');        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        //Add an event listener to log pokemon info when button is clicked
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //loading message to be shown on page load and after clicking a pokemon name
    function showLoadingMessage() {
        let docBody = document.querySelector('body');
        let loadingMessage = document.createElement('h1');
        loadingMessage.innerText = 'Loading';
        loadingMessage.id = 'loading-message';
        docBody.appendChild(loadingMessage);
    }

    //loading message to be hidden after page load and after loading in pokemon details
    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('#loading-message');
        let docBody = document.querySelector('body');
        docBody.removeChild(loadingMessage);
    }

    //------Begin Modal implementation-------------------
    let currentPokeID; // used for left and right key options
    
    function showModal(pokemon) {
        currentPokeID = pokemon.pokeID.slice(3); //Need to parse the string to get the integer we really want

        //clear existing modal content
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        modalTitle.empty();
        modalBody.empty();
    
        //Pokemon Name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
    
        //Pokemon Types
        let typesUnorderedList = document.createElement('ul');
        typesUnorderedList.classList.add('types-list');
        pokemon.types.forEach(function(type) {
            let typesListElement = document.createElement('li');
            typesListElement.classList.add(type);
            typesListElement.classList.add('pokemon-type');
            typesListElement.innerText = type;
            typesUnorderedList.appendChild(typesListElement);
        });
    
        //Pokemon Height
        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height + ' in';
    
        //Pokemon Weight
        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ' + pokemon.weight + ' lbs';
    
        //Pokemon Image
        let imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-image');
        imageElement.src = pokemon.imageUrl;
        imageElement.setAttribute('alt', 'an image of ' + pokemon.name);
    
        //Add the modal elements to the modal
        //modalContent.appendChild(closeButtonElement);
        modalTitle.append(titleElement);
        modalBody.append(typesUnorderedList);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(imageElement);
    }   
    
    window.addEventListener('keydown', function(e) {
        /* The keydown event listener handles closing the window using the escape key and 
        turning the page to the next Pokemon using the left and right arrow keys */
        let modalContainer = document.querySelector('.modal');
        //Hide modal if Esc is pressed while modal is open
        // load pokemon 1 up on list when key press left
        if (e.key === 'ArrowLeft' && getComputedStyle(modalContainer).display != 'none' && currentPokeID > 1) {
            hideModal();
            previousPokemon();
        }
        // load pokemon 1 down on list when key press left
        if (e.key === 'ArrowRight' && getComputedStyle(modalContainer).display != 'none' && currentPokeID < 151) {
            hideModal();
            nextPokemon();
        }
    });

    function hideModal() {
        let closeButton = $('.close');
        closeButton.click();
    }
    
    //click the button for the previous pokemon
    function previousPokemon() {
        //need to reformat the currentPokeID into the appropriate css class string
        let previous = document.querySelector('.ID-' + (currentPokeID-1));
        previous.click();
    }
    
    //click the button for the next pokemon
    function nextPokemon() {
        //need to reformat the currentPokeID into the appropriate css class string
        let next = document.querySelector('.ID-' + (parseInt(currentPokeID)+1));
        next.click();
    }
        //--------End Modal implementation-------------------
    
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        //searchByName: searchByName,
        addListItem: addListItem
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});


