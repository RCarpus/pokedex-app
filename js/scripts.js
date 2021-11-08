let pokemonList = [];
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

pokemonList.push(minccino);
pokemonList.push(dunsparce);
pokemonList.push(cramorant);
pokemonList.push(bidoof);

let largeHeight = 48;
let smallHeight = 20;
//Write each pokemon's name and height to the page
for (let i=0; i<pokemonList.length; i++) {
    document.write('<p>');
    document.write(`<strong>${pokemonList[i].name}</strong> \(height: ${pokemonList[i].height} inches\)`);
    //Print "Wow, that's big!" if the pokemon is tall and mentions cuteness level of pokemon
    if (pokemonList[i].height >= largeHeight) {
        document.write(` Wow, that\'s big, and ${pokemonList[i].cutenessLevel}!`);
    //Print "Wow, that's small!" if the pokemon is short and mentions cuteness level of pokemon
    } else if (pokemonList[i].height <= smallHeight) {
        document.write(` Wow, that\'s small, and ${pokemonList[i].cutenessLevel}!`)
    }
    document.write('</p>');
}