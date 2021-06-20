import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/pokemons">Pokemon List</Link>
                </li>
                <li>
                    <Link to="/myPokemons">My Pokemon List</Link>
                </li>
            </ul>
        </nav>
    );
}
