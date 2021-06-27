import React, { useState } from 'react';
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
import Modal, { Label, Input } from '../Components/Modal';
import { SuccessContainer, DangerContainer } from '../Components/Alert';

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

//custom catch button with pokeball image
const CatchButton = ({ onClick }) => {
    return (
        <img
            src={PokeBall}
            width={300}
            onClick={onClick}
            alt="pokeball_catch_image"
        ></img>
    );
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
//display catch pokemon section
export default function Catch({ name, url }) {
    //catching status
    const [catchState, setCatchState] = useState({
        status: CATCH_INIT,
        nickname: '',
    });
    //creating status
    const [createStatus, setCreateStatus] = useState(CREATE_POKEMON_INIT);
    //when catch button is clicked
    const onCatchPokemon = () => {
        setCreateStatus(CREATE_POKEMON_INIT);
        const catchStatus = catchPokemon();
        setCatchState({ ...catchState, status: catchStatus });
    };
    //on form submission
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
    //displays creating status message inside modal
    const displayCreateStatusMessage = () => {
        switch (createStatus) {
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
    return (
        <BackgroundContainer>
            {/* displays big catch button */}
            <CatchButton onClick={onCatchPokemon}> Catch Pokemon </CatchButton>
            {/* if create succeed, display a message */}
            {createStatus === CREATE_POKEMON_SUCCESS && (
                <SuccessContainer> Succeed!</SuccessContainer>
            )}
            {/* if couldn't catch, display a messge */}
            {catchState.status === CATCH_FAIL && (
                <DangerContainer>
                    {' '}
                    Could not catch pokemon, please try again.
                </DangerContainer>
            )}
            {/* if allowed to catch, display a form in a modal */}
            <Modal
                open={catchState.status === CATCH_SUCCESS}
                onClose={() => {
                    setCreateStatus(CREATE_POKEMON_INIT);
                    setCatchState({
                        status: CATCH_INIT,
                        nickname: '',
                    });
                }}
                content={
                    <MainContainer>
                        <form onSubmit={onCreatePokemon}>
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
                            {displayCreateStatusMessage()}
                            <Button type="submit" style={{ marginTop: '10px' }}>
                                {' '}
                                Save{' '}
                            </Button>
                        </form>
                    </MainContainer>
                }
            />
        </BackgroundContainer>
    );
}
