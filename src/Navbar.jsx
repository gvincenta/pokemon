import React from 'react';
import { Link } from 'react-router-dom';
import { TextButton } from './Components/Button';
import styled from '@emotion/styled';
const Nav = styled.nav`
    display: grid;
    grid-template-rows: auto auto;
`;

const Div = styled.div`
    text-align: center;
`;
//navbar component to navigate between list of all pokemons and list of my pokemons.
export default function Navbar() {
    return (
        <Nav>
            <Div>
                {' '}
                <Link to="/">
                    {' '}
                    <TextButton
                        active={
                            !window.location.hash
                                .toLowerCase()
                                .includes('/mypokemons')
                        }
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
                        active={window.location.hash
                            .toLowerCase()
                            .includes('/mypokemons')}
                    >
                        {' '}
                        My Pokedex{' '}
                    </TextButton>{' '}
                </Link>{' '}
            </Div>
        </Nav>
    );
}
