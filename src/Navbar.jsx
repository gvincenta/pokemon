import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { TextButton } from './Components/Button';
import styled from '@emotion/styled';
import PokemonLogo from './pokemonLogo.png';

const Nav = styled.nav`
    display: grid;
    grid-template-rows: auto auto;
`;

const Div = styled.div`
    text-align: center;
`;
const Image = styled.img`
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 75%;
    margin-top: 7.5%;
    margin-bottom: 0px;
`;

export default function Navbar() {
    return (
        <>
            <Image src={PokemonLogo} />
            <Nav>
                <Div>
                    {' '}
                    <Link to="/pokemons">
                        {' '}
                        <TextButton
                            active={window.location.pathname.startsWith(
                                '/pokemons'
                            )}
                        >
                            {' '}
                            Pokedex{' '}
                        </TextButton>
                    </Link>{' '}
                </Div>
                <Div>
                    {' '}
                    <Link to="/mypokemons">
                        {' '}
                        <TextButton
                            active={window.location.pathname.startsWith(
                                '/mypokemons'
                            )}
                        >
                            {' '}
                            My Pokedex{' '}
                        </TextButton>{' '}
                    </Link>{' '}
                </Div>
            </Nav>
        </>
    );
}
