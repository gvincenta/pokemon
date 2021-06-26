## Intro

-   This project is a response to Tokopedia's Web Project.
-   This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
-   This project is hosted with Netlify.

## Glossary

1. Pokedex - List of all pokemons as fetched from the api
2. My Pokedex - List of all pokemons that you own
3. [PokeBall](/public/pokemonLogo.png) - A ball to catch a pokemon

## Running This Project

1. `cd` to this project's root directory
2. Run `yarn` to install the necessary node modules
3. Run `yarn start` to view this project in your local browser

## Content disclaimer

-   I do not own any of the assets in this project.
-   Most of the images taken are taken from browsing through Google.
-   The Pokemon font can be found [here](https://www.dafont.com/pokemon.font).
-   The Pokemon API can be found [here](https://pokeapi.co).

## Project Structure

1. All Components are in /src/Components/
2. All Pages are in /src/pages
    1. Catch.jsx - displays the catch pokemon section
    2. Detail.jsx - displays a pokemon's detail, with the ability to catch a pokemon
    3. List.jsx - displays a (paginated) list of all pokemons as fetched from the api
    4. MyList.jsx - displays a (paginated) list of all pokemons that you own
3. /src/App.jsx serves the app with HashRouting.
4. /src/Navbar.jsx displays a Navbar.
5. /src/api.js contains all necessary (RESTful) API calls.
6. /src/pokemon.js contains all necessary CRUD actions and interfaces for pokemons, using localStorage.

## How to catch a Pokemon

1. Go to Pokedex
2. Select a pokemon, you will be redirected to another page
3. Click the big [PokeBall](/public/pokemonLogo.png) until there's a prompt to insert nickname and save.

## Optimisations

After running Lighthouse to inspect the website, these optimisations were made (mainly in /public/index.html) as suggested by Lighthouse :

-   `<link rel="preconnect" href="https://pokeapi.co" />` for preloading api connection
-   `<link rel="preload" as="image" href="%PUBLIC_URL%/pokemonLogo.png" />` for preloading the big pokemon image

## Hosting Related issues

-   Netlify has an issue with redirects with react-app.
-   One solution is to use `HashRouter` from react-router, thus this project uses `HashRouter` instead of the commonly used `BrowserRouter`.

## Project Stack

1. CSS-in-JS using Emotion
2. react-router for handling routing
