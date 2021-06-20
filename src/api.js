/**
 * contains all api calls required for pokemon.
 */
const BASE_URL = 'https://pokeapi.co/api/v2';
const GET_OPTIONS = {
    method: 'GET',
};

export const getAllPokemons = (offset = 0, limit = 20) => {
    return fetch(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
        GET_OPTIONS
    ).then((res) => res.json());
};

export const getPokemonDetail = (url) => {
    return fetch(url, GET_OPTIONS).then((res) => res.json());
};
