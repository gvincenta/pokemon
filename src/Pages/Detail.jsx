import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getPokemonDetail } from '../api';
import Table from '../Components/Table';
import Catch from './Catch';
import Accordion from '../Components/Accordion';
import FlexRow from '../Components/FlexRow';

export default function Detail() {
    const [data, setData] = useState({ moves: [], types: [] });
    let location = useLocation();

    const url = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('fetch');
    }, [location.search]);

    useEffect(() => {
        getPokemonDetail(url).then((res) => {
            console.log({ res });
            const { moves, types, forms } = res;
            const movesList = moves.map(({ move }) => ({
                //flatten moves
                move: move.name,
            }));
            const typesList = types //flatten types and sort by slot
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
            <p>Name: {data?.forms?.[0]?.name ?? '???'} </p>

            <Accordion
                content={[
                    {
                        header: <div> Moves: </div>,
                        collapsible: (
                            <FlexRow data={data.moves} accessor="move" />
                        ),
                    },
                    {
                        header: <div> Types: </div>,
                        collapsible: (
                            <FlexRow data={data.types} accessor="type" />
                        ),
                    },
                ]}
            />
            <div> Catch! </div>
            <Catch name={data?.forms?.[0]?.name} url={url} />
        </div>
    );
}
