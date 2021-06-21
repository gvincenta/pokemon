import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
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

const MainContainer = styled.div`
    padding: auto;
    display: grid;
    row-gap: 10px;
    margin-top: 15px;
    grid-template-columns: auto auto;
    margin-bottom: 15px;
`;

const BackgroundContainer = styled.div`
    background-color: grey;
    padding: 5%;
    display: grid;
    row-gap: 10px;
`;

const SuccessContainer = styled.div`
    background-color: #04aa6d;
    color: white;
`;
const DangerContainer = styled.div`
    background-color: #bb0f0f;
    color: white;
`;
const Button = styled.button`
    text-align: center;
    background-color: #337ab7;
    padding: 6px 12px;
    color: white;
    width: 100%;
    border-radius: 4px;
    &:disabled {
        background-color: #b7ced6;
    }
`;
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
                return <SuccessContainer> Succeed!</SuccessContainer>;
            case CREATE_POKEMON_FAIL_EMPTY_NICKNAME:
                return (
                    <DangerContainer>
                        {' '}
                        Nickname cannot be left empty
                    </DangerContainer>
                );
            case CREATE_POKEMON_FAIL_ALREADY_EXISTS:
                return (
                    <DangerContainer>
                        {' '}
                        Nickname already exists, please choose another nickname
                    </DangerContainer>
                );
            default:
                return null;
        }
    };
    const displayCatch = () => {
        switch (catchState.status) {
            case CATCH_INIT:
                return (
                    <Button onClick={onCatchPokemon}> Catch Pokemon </Button>
                );
            case CATCH_SUCCESS:
                return (
                    <>
                        <MainContainer>
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
                        </MainContainer>
                        <Button onClick={onCreatePokemon}> Save </Button>
                    </>
                );
            case CATCH_FAIL:
                return (
                    <>
                        <Button onClick={onCatchPokemon}>
                            {' '}
                            Catch Pokemon{' '}
                        </Button>
                        <DangerContainer>
                            {' '}
                            Could not catch pokemon, please try again.
                        </DangerContainer>
                    </>
                );
            default:
                return;
        }
    };
    return (
        <BackgroundContainer>
            {displayCatch()}
            {displayCreateStatusMessage()}
        </BackgroundContainer>
    );
}
