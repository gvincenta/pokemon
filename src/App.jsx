import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import List from './Pages/List';
import Detail from './Pages/Detail';
import MyList from './Pages/MyList';
export default function App() {
    return (
        <Router>
            <div>
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
