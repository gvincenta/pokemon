import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPokemonDetail } from '../api';

export default function Detail() {
    const [data, setData] = useState({});
    let location = useLocation();
    console.log({ location });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const fetch = queryParams.get('fetch');
        console.log('I RUN DETEAILS', { fetch });

        getPokemonDetail(fetch).then((res) => {
            console.log({ res });
            const { moves, types, forms } = res;
            setData({ ...data, moves, types, forms });
        });
    }, []);

    return (
        <div>
            <p> Name: {data?.forms?.[0]?.name ?? '???'} </p>
            <p> Moves: </p>
            <p> Types: </p>
        </div>
    );
}
