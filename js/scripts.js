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
        searchByName: searchByName
    };
})();

let largeHeight = 48;
let smallHeight = 20;
//Write each pokemon's name and height to the page
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>');
    document.write(`<strong>${pokemon.name}</strong> \(height: ${pokemon.height} inches\)`);
    //Print "Wow, that's big!" if the pokemon is tall and mentions cuteness level of pokemon
    if (pokemon.height >= largeHeight) {
        document.write(` Wow, that\'s big, and ${pokemon.cutenessLevel}!`);
    //Print "Wow, that's small!" if the pokemon is short and mentions cuteness level of pokemon
    } else if (pokemon.height <= smallHeight) {
        document.write(` Wow, that\'s small, and ${pokemon.cutenessLevel}!`)
    }
    document.write('</p>');
});