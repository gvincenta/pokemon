import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import List from './Pages/List';
import Detail from './Pages/Detail';
import MyList from './Pages/MyList';
import BacgkroundImage from './background.jpg';
import PokemonLogo from './pokemonLogo.png';
import styled from '@emotion/styled';

const Image = styled.img`
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 90%;
`;

export default function App() {
    return (
        <Router>
            <div>
                <Image src={PokemonLogo} />

                <Navbar />

                <Switch>
                    <Route path="/pokemons/" component={List} />
                    <Route path="/pokemon/" component={Detail} />
                    <Route path="/mypokemons/" component={MyList} />
                </Switch>
            </div>
        </Router>
    );
}
