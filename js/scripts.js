let pokemonRepository = (function () {
    let pokemonList = [];
    let requiredKeys = ['name', 'height', 'types', 'cutenessLevel'];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    //let apiUrl = 'downloaded-api-data.json';//this is just to reduce real API calls with live reload extension in development

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

/*     //Unused function right now. May be reused/modified later when search is added
    function passedInKeysAreValid(passedInKeys) {
        let missingKeys = [];
        //Check to make sure each required key is present
        requiredKeys.forEach(function(key) {
            if (!passedInKeys.includes(key)) {
                console.error(`Error: Missing key - ${key}`);
                missingKeys.push(key);
            } 
        });
        return missingKeys.length ? false : true;
    }
 */

    function nameIsAvailable(passedInName) {
        let available = searchByName(passedInName) ? false : true;
        if (!available) console.error('A pokemon with the same name is already in the repository.');
        return available;
    }

    function typeIsValid(passedInTypes) {
        //Checks to see if each passed in type is a valid type.
        //This will also catch if a wrong data type altogether is passed in (ie: int).
        //This check will let pass an empty list.
        //That will not be a problem if it's just a blank search parameter
        //but is a potential problem if I am pulling bad data from an external source.
        if (!Array.isArray(passedInTypes))  {
            console.error('pokemon.types must be a list');
            return false; 
        }
        let validTypes = ['normal', 'fire', 'water', 
                        'grass', 'electric', 'ice', 
                        'fighting', 'poison', 'ground', 
                        'flying', 'psychic', 'bug', 
                        'rock', 'ghost', 'dark', 
                        'dragon', 'steel', 'fairy'];
        let foundInvalidType = false;
        passedInTypes.forEach(function(type) {
            if (!validTypes.includes(type)) {
                console.error('Invalid type');
                foundInvalidType = true;
            }
        });
        return foundInvalidType ? false : true;
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

/*     //Validation is not currently used, keeping function to reuse/retool later
    function pokemonIsValid(pokemon) {
        //runs all validations for a pokemon
        //returns true if all checks pass, false if one or more checks fail
        let valid = true;
        if (!passedInKeysAreValid(Object.keys(pokemon))) {
            console.error('invalid keys');
            valid = false;
        }
        if (!nameIsAvailable(pokemon.name)) {
            console.error('name invalid');
            valid = false;
        }
        if (!typeIsValid(pokemon.types)) {
            console.error('types is invalid');
            valid = false;
        }
        return valid ? true : false;
    }
 */

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

/*     function searchByName(name) {
        return pokemonList.filter(pokemon => pokemon.name === name)[0];
    }
 */
    function addListItem(pokemon) {
        //Adds a <li> with a child <button class="pokemon-button list-group-item"> to the parent <ul class="pokemon-list">
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add(pokemon.pokeID);        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        //Add an event listener to log pokemon info when button is clicked
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
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
    let modalContainer = document.querySelector('#modal-container');
    let currentPokeID; // used for left and right key options
    
    function showModal(pokemon) {
        //console.log(`displaying pokemon with pokeID: ${pokemon.pokeID}`);
        currentPokeID = pokemon.pokeID.slice(3); //Need to parse the string to get the integer we really want
        //console.log(`currentPokeID: ${currentPokeID}`);
        //clear existing modal content
        modalContainer.innerHTML = '';
    
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        //close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        //Pokemon Name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
    
        //Pokemon Types
        let typesUnorderedList = document.createElement('ul');
        typesUnorderedList.classList.add('types-list');
        pokemon.types.forEach(function(type) {
            console.log(type);
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
    
        //Add the modal elements to the modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(typesUnorderedList);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
    
        //Makes modal visible
        modalContainer.classList.add('is-visible');
    }
    
    function hideModal() {
        let modal = document.querySelector('#modal-container');
        modal.classList.remove('is-visible');
    }
    
    
    window.addEventListener('keydown', function(e) {
        /* The keydown event listener handles closing the window using the escape key and 
        turning the page to the next Pokemon using the left and right arrow keys */
        let modalContainer = document.querySelector('#modal-container');
        //Hide modal if Esc is pressed while modal is open
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
        }
        // load pokemon 1 up on list when key press left
        if (e.key === 'ArrowLeft' && modalContainer.classList.contains('is-visible') && currentPokeID > 1) {
            console.log('ArrowLeft');
            hideModal();
            previousPokemon();
        }
        // load pokemon 1 down on list when key press left
        if (e.key === 'ArrowRight' && modalContainer.classList.contains('is-visible') && currentPokeID < 151) {
            console.log('ArrowRight');
            hideModal();
            nextPokemon();
        }
        // Prevent default behavior for enter.
        // If this not here, pressing enter will reload the first pokemon that was clicked on.
        if (e.key ==='Enter') {
            e.preventDefault();
        }
    });
    
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
    
    //Hide modal if user clicks outside the modal
    modalContainer.addEventListener('click', function(e) {
        let target = e.target;
        if (target === modalContainer) {
        hideModal();
        }
    });
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


