import React, { useEffect, useState } from 'react';
import Table from '../Components/Table';
import { getMyPokemons, removePokemon, isEqual } from '../pokemon';

export default function MyList() {
    const [data, setData] = useState(getMyPokemons());
    const onRemovePokemon = (e, pokemon) => {
        removePokemon(pokemon);
        setData(getMyPokemons());
    };
    return (
        <div>
            <Table
                data={data}
                total={data.length}
                hasNextPage={(page, limit) => page * limit + 1 < data.length}
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
                        title: 'Remove',
                        onClick: onRemovePokemon,
                    },
                ]}
            />
        </div>
    );
}
