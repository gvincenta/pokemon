import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import List from './Pages/List';
import MyList from './Pages/MyList';
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
