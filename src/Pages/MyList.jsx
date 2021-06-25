import React, { useEffect, useState } from 'react';
import Table from '../Components/Table';
import { getMyPokemons, removePokemon, isEqual } from '../pokemon';
import Navbar from '../Navbar';
import Pagination from '../Components/Pagination';

export default function MyList() {
    const [data, setData] = useState(getMyPokemons());
    const onRemovePokemon = (e, pokemon) => {
        removePokemon(pokemon);
        setData(getMyPokemons());
    };

    const getData = () => {
        // const lowerBound = page * limit; //todo after useCOntext
        // const upperBound = (page + 1) * limit;

        return data;
        // .filter(
        //     (v, index) => index < upperBound && index >= lowerBound
        // );
    };
    return (
        <div>
            <Navbar />
            <Table
                data={getData()}
                columns={[
                    {
                        title: 'Name',
                        accessor: 'name',
                    },
                    {
                        title: 'Nickname',
                        accessor: 'nickname',
                    },
                ]}
                actions={[
                    {
                        title: 'x',
                        onClick: onRemovePokemon,
                    },
                ]}
            />
            <Pagination
                total={data.length}
                hasNextPage={(page, limit) => (page + 1) * limit < data.length}
            />
        </div>
    );
}
