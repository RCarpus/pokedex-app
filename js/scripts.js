let pokemonRepository = (function () {
    let pokemonList = [];

    function add(pokemon) {
        pokemonList.push(pokemon);
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