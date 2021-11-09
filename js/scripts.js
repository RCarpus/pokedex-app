let pokemonRepository = (function () {
    let pokemonList = [];

    function passedInKeysAreValid(requiredKeys, passedInKeys) {
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

    function add(pokemon) {        
        /*
        Adds the pokemon to the repository only if the necessary keys are included in the object.
        The added pokemon will exlude any keys that are not required.
        */
        let requiredKeys = ['name', 'height', 'type', 'cutenessLevel'];
        let passedInKeys = Object.keys(pokemon);
        if (passedInKeysAreValid(requiredKeys, passedInKeys) && nameIsAvailable(pokemon.name)) {
            pokemonList.push( {
                name: pokemon.name,
                height: pokemon.height,
                type: pokemon.type,
                cutenessLevel: pokemon.cutenessLevel
            });
        } else {
            console.error('Could not add Pokemon. One or more required keys are missing/invalid');
        }
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
        console.log(pokemon.name);
    }

    //example data to be replaced by real data later
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

    //load in example data
    add(minccino);
    add(dunsparce);
    add(cramorant);
    add(bidoof);

    return {
        add: add,
        getAll: getAll,
        searchByName: searchByName,
        addListItem: addListItem
    };
})();

//Write each pokemon's name and height to the page
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});