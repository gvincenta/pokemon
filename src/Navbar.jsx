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

export default function Navbar() {
    return (
        <Nav>
            <Div>
                {' '}
                <Link to="/">
                    {' '}
                    <TextButton
                        active={
                            !window.location.pathname.startsWith('/mypokemons')
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
    );
}
