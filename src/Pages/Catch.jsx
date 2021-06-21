import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPokemonDetail } from '../api';
import Table from '../Components/Table';
import {
    createPokemon,
    CREATE_POKEMON_FAIL_ALREADY_EXISTS,
    CREATE_POKEMON_FAIL_EMPTY_NICKNAME,
    CREATE_POKEMON_SUCCESS,
    CREATE_POKEMON_INIT,
} from '../pokemon';

const CATCH_SUCCESS = 'CATCH_SUCCESS';
const CATCH_FAIL = 'CATCH_FAIL';
const CATCH_INIT = 'CATCH_INIT';

//catch pokemon with 50% chance. if value < 0.5, then succeed.
const catchPokemon = () => {
    const randomValue = Math.random();
    if (randomValue < 0.5) {
        //50% chance of getting a pokemon
        return CATCH_SUCCESS;
    }
    return CATCH_FAIL;
};

export default function Catch({ name, url }) {
    const [data, setData] = useState({ moves: [], types: [] });
    const [catchState, setCatchState] = useState({
        status: CATCH_INIT,
        nickname: '',
    });

    const [createStatus, setCreateStatus] = useState(CREATE_POKEMON_INIT);

    let location = useLocation();

    const onCatchPokemon = () => {
        setCreateStatus(CREATE_POKEMON_INIT);
        const catchStatus = catchPokemon();
        setCatchState({ ...catchState, status: catchStatus });
    };

    const onCreatePokemon = () => {
        const newCreateStatus = createPokemon({
            nickname: catchState.nickname,
            name,
            url,
        });
        if (newCreateStatus === CREATE_POKEMON_SUCCESS) {
            setCatchState({ ...catchState, status: CATCH_INIT, nickname: '' });
        }
        setCreateStatus(newCreateStatus);
    };
    const displayCreateStatusMessage = () => {
        switch (createStatus) {
            case CREATE_POKEMON_SUCCESS:
                return <p> Succeed!</p>;
            case CREATE_POKEMON_FAIL_EMPTY_NICKNAME:
                return <p> Nickname cannot be left empty</p>;
            case CREATE_POKEMON_FAIL_ALREADY_EXISTS:
                return (
                    <p>
                        {' '}
                        Nickname already exists, please choose another nickname
                    </p>
                );
            default:
                return null;
        }
    };
    const displayCatch = () => {
        switch (catchState.status) {
            case CATCH_INIT:
                return (
                    <button onClick={onCatchPokemon}> Catch Pokemon </button>
                );
            case CATCH_SUCCESS:
                return (
                    <>
                        <label> Nickname: </label>
                        <input
                            value={catchState.nickname}
                            onChange={(e) => {
                                setCatchState({
                                    ...catchState,
                                    nickname: e.target.value,
                                });
                            }}
                        />
                        <button onClick={onCreatePokemon}> Save </button>
                    </>
                );
            case CATCH_FAIL:
                return (
                    <>
                        <button onClick={onCatchPokemon}>
                            {' '}
                            Catch Pokemon{' '}
                        </button>
                        <p> Could not catch pokemon, please try again.</p>
                    </>
                );
            default:
                return;
        }
    };
    return (
        <div>
            {displayCatch()}
            {displayCreateStatusMessage()}
        </div>
    );
}
