import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getPokemonDetail } from '../api';
import Table from '../Components/Table';
import Catch from './Catch';

export default function Detail() {
    const [data, setData] = useState({ moves: [], types: [] });
    let location = useLocation();

    const url = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('fetch');
    }, [location.search]);

    useEffect(() => {
        console.log('I RUN DETEAILS', { url });

        getPokemonDetail(url).then((res) => {
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

            <Catch name={data?.forms?.[0]?.name} url={url} />
        </div>
    );
}
