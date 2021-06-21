import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';

export default function Navbar() {
    const color = 'white';
    const Nav = styled.nav`
        background-color: #ff8f36;
        display: grid;
        grid-template-columns: auto auto;
    `;

    const Div = styled.div`
        text-align: center;
    `;

    return (
        <Nav>
            <Div>
                {' '}
                <Link to="/pokemons"> Pokemon List </Link>{' '}
            </Div>
            <Div>
                {' '}
                <Link to="/mypokemons"> My Pokemon List</Link>{' '}
            </Div>
        </Nav>
    );
}
