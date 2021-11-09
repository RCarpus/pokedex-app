let pokemonRepository = (function () {
    let pokemonList = [];
    let requiredKeys = ['name', 'height', 'type', 'cutenessLevel'];
    //let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let apiUrl = 'downloaded-api-data.json';//this is just to reduce real API calls with live reload extension

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

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

    function nameIsAvailable(passedInName) {
        let available = searchByName(passedInName) ? false : true;
        if (!available) console.error('A pokemon with the same name is already in the repository.');
        return available;
    }

    function typeIsValid(passedInType) {
        //Checks to see if each passed in type is a valid type.
        //This will also catch if a wrong data type altogether is passed in (ie: int).
        //This check will let pass an empty list.
        //That will not be a problem if it's just a blank search parameter
        //but is a potential problem if I am pulling bad data from an external source.
        if (!Array.isArray(passedInType))  {
            console.error('pokemon.type must be a list');
            return false; 
        }
        let validTypes = ['normal', 'fire', 'water', 
                        'grass', 'electric', 'ice', 
                        'fighting', 'poison', 'ground', 
                        'flying', 'psychic', 'bug', 
                        'rock', 'ghost', 'dark', 
                        'dragon', 'steel', 'fairy'];
        let foundInvalidType = false;
        passedInType.forEach(function(type) {
            if (!validTypes.includes(type)) {
                console.error('Invalid type');
                foundInvalidType = true;
            }
        });
        return foundInvalidType ? false : true;
    }

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
        if (!typeIsValid(pokemon.type)) {
            console.error('type is invalid');
            valid = false;
        }
        return valid ? true : false;
    }

    function add(pokemon) {        
        /*
        Adds the pokemon to the repository only if the necessary keys are included in the object.
        The added pokemon will exlude any keys that are not required.
        */
/*         if (pokemonIsValid(pokemon)) {
            pokemonList.push( {
                name: pokemon.name,
                height: pokemon.height,
                type: pokemon.type,
                cutenessLevel: pokemon.cutenessLevel
            });
        } else {
            console.error('Could not add Pokemon. One or more required keys are missing/invalid');
        } */
        pokemonList.push( {
            name: pokemon.name,
            detailsUrl: pokemon.detailsUrl
        });
    }

    function getAll() {
        return pokemonList;
    }

    function searchByName(name) {
        return pokemonList.filter(pokemon => pokemon.name === name)[0];
    }

    function addListItem(pokemon) {
        //Adds a <li> with a child <button class="pokemon-button"> to the parent <ul class="pokemon-list">
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        //Add an event listener to log pokemon info when button is clicked
        button.addEventListener('click', function(){showDetails(pokemon)});
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

/*     //example data to be replaced by real data later
    let minccino = {
        name : 'Minccino',
        height: 16,
        type: ['normal'],
        cutenessLevel: 'cuteness overload',
        asdf: 'd'
    };
    
    let dunsparce = {
        name: 'Dunsparce',
        height: 59,
        type: ['normal'],
        cutenessLevel: 'pretty uggo'
    };
    
    let cramorant = {
        name: 'Cramorant',
        height: 31,
        type: ['flying', 'water'],
        cutenessLevel: 'moderately cute'
    };
    
    let bidoof = {
        name: 'Bidoof',
        height: 20,
        type: ['normal'],
        cutenessLevel: 'simultaneously the ugliest and most beautiful creature I have ever seen'
    };
 */
/*     //load in example data
    add(minccino);
    add(dunsparce);
    add(cramorant);
    add(bidoof);
 */
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        searchByName: searchByName,
        addListItem: addListItem
    };
})();

/* //Write each pokemon's name and height to the page
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
}); */

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });