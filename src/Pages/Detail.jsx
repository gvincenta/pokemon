import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getPokemonDetail } from '../api';
import Table from '../Components/Table';
import Catch from './Catch';
import Accordion from '../Components/Accordion';
import FlexRow from '../Components/FlexRow';
import styled from '@emotion/styled';
const MainContainer = styled.div`
    padding: 5%;
`;

const Name = styled.div`
    text-align: center;
    text-transform: uppercase;
`;

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
        <MainContainer>
            <Name> {data?.forms?.[0]?.name ?? '???'} </Name>
            <Catch name={data?.forms?.[0]?.name} url={url} />
            <Accordion
                content={[
                    {
                        header: <Name> Moves </Name>,
                        collapsible: (
                            <FlexRow data={data.moves} accessor="move" />
                        ),
                    },
                    {
                        header: <Name> Types </Name>,
                        collapsible: (
                            <FlexRow data={data.types} accessor="type" />
                        ),
                    },
                ]}
            />
        </MainContainer>
    );
}
