import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import List from './Pages/List';
import Detail from './Pages/Detail';
import MyList from './Pages/MyList';
import BacgkroundImage from './background.jpg';
import PokemonLogo from './pokemonLogo.png';
import styled from '@emotion/styled';

export default function App() {
    return (
        <Router>
            <div style={{ height: '100vh', width: '100wh' }}>
                <Switch>
                    <Route path="/mypokemons/" component={MyList} />
                    <Route path="/" component={List} />
                </Switch>
            </div>
        </Router>
    );
}
