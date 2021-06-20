import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPokemonDetail } from '../api';
import Table from '../Components/Table';

const CATCH_SUCCESS = 'CATCH_SUCCESS';
const CATCH_FAIL = 'CATCH_FAIL';
const CATCH_INIT = 'CATCH_INIT';

//catch pokemon with 50% chance. if value < 0.5, then succeed.
const catchPokemon = () => {
    const randomValue = Math.random();
    if (randomValue < 0.5) {
        //50% chance of getting a pokemon
        return CATCH_SUCCESS;
    }
    return CATCH_FAIL;
};

export default function Detail() {
    const [data, setData] = useState({ moves: [], types: [] });
    const [catchState, setCatchState] = useState({
        status: CATCH_INIT,
        name: '',
        nickname: '',
    });

    let location = useLocation();
    console.log({ location });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const fetch = queryParams.get('fetch');
        console.log('I RUN DETEAILS', { fetch });

        getPokemonDetail(fetch).then((res) => {
            console.log({ res });
            const { moves, types, forms } = res;
            const movesList = moves.map(({ move }) => ({
                move: move.name,
            }));
            const typesList = types
                .map(({ slot, type }) => ({
                    type: type.name,
                    slot,
                }))
                .sort((a, b) => {
                    return a.slot - b.slot;
                });
            setData({ ...data, moves: movesList, types: typesList, forms });
        });
    }, []);

    return (
        <div>
            <p> Name: {data?.forms?.[0]?.name ?? '???'} </p>
            {/* <p> Moves: </p> */}
            {/* <Table 
                data={data.moves} 
                columns={[{
                    title: 'Name',
                    accessor: 'move'
                }]}
            /> */}

            <p> Types: </p>
            <Table
                data={data.types}
                columns={[
                    {
                        title: 'Slot',
                        accessor: 'slot',
                    },
                    {
                        title: 'Name',
                        accessor: 'type',
                    },
                ]}
            />

            <button onClick={catchPokemon()}> Catch Pokemon </button>
        </div>
    );
}
