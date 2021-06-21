const MY_POKEMON_LIST = 'MY_POKEMON_LIST';
export const CREATE_POKEMON_SUCCESS = 'CREATE_POKEMON_SUCCESS';
export const CREATE_POKEMON_INIT = 'CREATE_POKEMON_INIT';
export const REMOVE_POKEMON_SUCCESS = 'REMOVE_POKEMON_SUCCESS';
export const CREATE_POKEMON_FAIL_ALREADY_EXISTS =
    'CREATE_POKEMON_FAIL_ALREADY_EXISTS';
export const CREATE_POKEMON_FAIL_EMPTY_NICKNAME =
    'CREATE_POKEMON_FAIL_EMPTY_NICKNAME';
export const CREATE_POKEMON_NICKNAME_VALID = 'CREATE_POKEMON_NICKNAME_VALID';

/* data structure in local storage:
{
    MY_POKEMON_LIST: [
        {
            name : pokemon's name,
            nickname: pokemon's nickname,
            url: pokemon's url
        },
        {
            name : pokemon's name,
            nickname: pokemon's nickname,
            url: pokemon's url
        },
        ...
    ]
} */

/* local storage related interface */
export const getMyPokemons = () => {
    const currentStorage = JSON.parse(localStorage.getItem(MY_POKEMON_LIST));
    if (!Array.isArray(currentStorage)) {
        return [];
    }
    return currentStorage;
};

const addMyPokemon = ({ name, nickname, url }) => {
    const currentStorage = getMyPokemons();
    currentStorage.push({ name, nickname, url });
    localStorage.setItem(MY_POKEMON_LIST, JSON.stringify(currentStorage));
};

const removeMyPokemon = (pokemon) => {
    const currentStorage = getMyPokemons();
    const removeIndex = currentStorage.findIndex((currentPokemon) =>
        isEqual(currentPokemon, pokemon)
    );
    currentStorage.splice(removeIndex, 1);
    localStorage.setItem(MY_POKEMON_LIST, JSON.stringify(currentStorage));
};

/* CRUD interface to be used */
export const createPokemon = ({ nickname, name, url }) => {
    const nicknameIsValid = validateNickname({ nickname, name, url });
    if (nicknameIsValid === CREATE_POKEMON_NICKNAME_VALID) {
        addMyPokemon({ nickname, name, url });
        return CREATE_POKEMON_SUCCESS;
    }
    return nicknameIsValid;
};

export const removePokemon = ({ name, nickname, url }) => {
    removeMyPokemon({ name, nickname, url });
    return REMOVE_POKEMON_SUCCESS;
};

/* display owned total in format: 
[
    {
        name: pokemon's name,
        url: pokemon's url,
        ownedTotal: how many has been catched ,
    },
    {
        name: pokemon's name,
        url: pokemon's url,
        ownedTotal: how many has been catched ,
    }
] */
export const getOwnedTotals = (pokemonList) => {
    const currentPokemonList = pokemonList.map(({ name, url }) => ({
        name,
        url,
        ownedTotal: 0,
    }));
    const currentStorage = getMyPokemons();
    const existingCounter = currentStorage.reduce((result, currentPokemon) => {
        const index = result.findIndex((pokemon) =>
            isEqualSpecies(pokemon, currentPokemon)
        );
        if (index !== -1) {
            const pokemonData = result[index];
            result.splice(index, 1, {
                ...pokemonData,
                ownedTotal: pokemonData.ownedTotal + 1,
            });
        }
        return result;
    }, currentPokemonList);

    return existingCounter;
};
/* helper functions */
const isEqualNickname = (existingPokemon, newPokemon) => {
    return existingPokemon.nickname === newPokemon.nickname;
};

export const isEqual = (firstPokemon, secondPokemon) => {
    return (
        firstPokemon.nickname === secondPokemon.nickname &&
        firstPokemon.name === secondPokemon.name &&
        firstPokemon.url === secondPokemon.url
    );
};

export const isEqualSpecies = (firstPokemon, secondPokemon) => {
    return (
        firstPokemon.name === secondPokemon.name &&
        firstPokemon.url === secondPokemon.url
    );
};

const validateNickname = (newPokemon) => {
    if (newPokemon.nickname?.length > 0) {
        const existingPokemons = getMyPokemons();
        const hasDuplicate = existingPokemons.findIndex((existingPokemon) =>
            isEqualNickname(existingPokemon, newPokemon)
        );
        if (hasDuplicate !== -1) {
            return CREATE_POKEMON_FAIL_ALREADY_EXISTS;
        } else {
            return CREATE_POKEMON_NICKNAME_VALID;
        }
    }
    return CREATE_POKEMON_FAIL_EMPTY_NICKNAME;
};
