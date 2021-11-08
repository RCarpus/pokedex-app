let pokemonRepository = (function () {
    let pokemonList = [];

    function add(pokemon) {        
        let requiredKeys = ['name', 'height', 'type', 'cutenessLevel'];
        let passedInKeys = Object.keys(pokemon);
        //console.log(`Attempting to add pokemon with the following keys: ${passedInKeys}`);
        let missingKeys = [];
        //Check to make sure each required key is present
        requiredKeys.forEach(function(key) {
            //console.log(`validating key: ${key}`);
            if (!passedInKeys.includes(key)) {
                console.error(`Error: Missing key - ${key}`);
                missingKeys.push(key);
            } 
        });
        //return a list of missing keys without pushing pokemon to list if there is a key missing
        if (missingKeys.length) return;
        //push the pokemon to the pokemonList if all keys are present
        //ignores any extra keys that may have been added
        pokemonList.push( {
            name: pokemon.name,
            height: pokemon.height,
            type: pokemon.type,
            cutenessLevel: pokemon.cutenessLevel
        });
    }

    function getAll() {
        return pokemonList;
    }

    //example data to be replaced by real data later
    let minccino = {
        name : 'Minccino',
        height: 16,
        type: ['normal'],
        cutenessLevel: 'cuteness overload'
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
        getAll: getAll
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