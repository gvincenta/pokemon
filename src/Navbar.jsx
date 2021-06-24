import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavigationButton } from './Components/Button';
import styled from '@emotion/styled';
const Nav = styled.nav`
    display: grid;
    grid-template-columns: auto auto;
`;

const Div = styled.div`
    text-align: center;
`;

export default function Navbar() {
    return (
        <Nav>
            <Div>
                {' '}
                <Link to="/pokemons">
                    {' '}
                    <NavigationButton> Pokemon List </NavigationButton>
                </Link>{' '}
            </Div>
            <Div>
                {' '}
                <Link to="/mypokemons">
                    {' '}
                    <NavigationButton> My Pokemon List </NavigationButton>{' '}
                </Link>{' '}
            </Div>
        </Nav>
    );
}
