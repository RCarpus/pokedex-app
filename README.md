# Simple Pokedex App

## Description
This app fetches data from the pokeAPI [https://pokeapi.co/](https://pokeapi.co/) and displays a list of Pokemon that have been fetched. This Pokedex fetches data for the first 151 Pokemon (Generation 1). When the name of a pokemon is clicked, some additional details for the pokemon, including height, type, and a picture will be fetched from the API and displayed in a modal on the screen. The user can navigate back and forth through the different pokemon using the left and right arrow keys on a keyboard. The modal can be exited by pressing escape, clicking outside the model box, or clicking the close button on the modal.

## How to run
The project is hosted on GitHub pages at [rcarpus.github.io/pokedex-app/](https://rcarpus.github.io/pokedex-app/).

To run locally, download and unzip the files, and open the index.html file using your preferred browser.

## Dependencies/libraries/technologies used
### IE11 Support
[Fetch polyfill](https://github.com/github/fetch)  
[Promise Polyfill](https://github.com/taylorhakes/promise-polyfill)  
### Modal overlay and navbar
[Bootstrap 4.3](https://getbootstrap.com/docs/4.3/getting-started/introduction/) (with jQuery and Popper dependencies)

### CSS processors
Postprocessor: [https://madlittlemods.github.io/postcss-css-variables/playground/](https://madlittlemods.github.io/postcss-css-variables/playground/)  
Autoprefixer: [https://autoprefixer.github.io/](https://autoprefixer.github.io/)  
### JavaScript minifier: 
[https://www.toptal.com/developers/javascript-minifier/](https://www.toptal.com/developers/javascript-minifier/)
### CSS minifier: 
[https://www.toptal.com/developers/cssminifier/](https://www.toptal.com/developers/cssminifier/)

## Browser support
This app has been tested on Chrome, Firefox, and Edge, and IE11. The keypress events do NOT function in IE11, but the basic functionally of the page still works.

## Credit
This project was built by Ryan Carpus following the general instructions and guidelines within [CareerFoundry](https://careerfoundry.com/)'s web development immersion course.
