import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../Components/Button';
import {
    createPokemon,
    CREATE_POKEMON_FAIL_ALREADY_EXISTS,
    CREATE_POKEMON_FAIL_EMPTY_NICKNAME,
    CREATE_POKEMON_SUCCESS,
    CREATE_POKEMON_INIT,
} from '../pokemon';
import PokeBall from '../pokeball.png';

const CATCH_SUCCESS = 'CATCH_SUCCESS';
const CATCH_FAIL = 'CATCH_FAIL';
const CATCH_INIT = 'CATCH_INIT';

const MainContainer = styled.div`
    margin: auto;
    text-align: center;
`;

const BackgroundContainer = styled.div`
    padding: 5%;
    display: grid;
    row-gap: 10px;
`;

const SuccessContainer = styled.div`
    color: #04aa6d;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
`;
const DangerContainer = styled.div`
    color: #f3110d;
    text-align: center;

    font-weight: bold;
    font-size: 20px;
`;
const Label = styled.label`
    font-family: PokemonSolid;
    color: #3366ff;
`;

const Input = styled.input`
    font-size: 20px;
    max-width: 50vw;
`;

const CatchButton = ({ children, onClick }) => {
    return <img src={PokeBall} width={300} onClick={onClick}></img>;
};
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
                    <CatchButton onClick={onCatchPokemon}>
                        {' '}
                        Catch Pokemon{' '}
                    </CatchButton>
                );
            case CATCH_SUCCESS:
                return (
                    <>
                        <MainContainer>
                            <Label> Nickname: </Label>
                            <Input
                                value={catchState.nickname}
                                onChange={(e) => {
                                    setCatchState({
                                        ...catchState,
                                        nickname: e.target.value,
                                    });
                                }}
                            />
                            <Button
                                onClick={onCreatePokemon}
                                style={{ marginTop: '10px' }}
                            >
                                {' '}
                                Save{' '}
                            </Button>
                        </MainContainer>
                    </>
                );
            case CATCH_FAIL:
                return (
                    <>
                        <CatchButton onClick={onCatchPokemon}>
                            {' '}
                            Catch Pokemon{' '}
                        </CatchButton>
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
