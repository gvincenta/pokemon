import React, { useEffect, useState } from 'react';
import { getAllPokemons } from '../api';
import { getOwnedTotals } from '../pokemon';
import Table from '../Components/Table';

export default function List() {
    const [data, setData] = useState({
        count: 0,
        next: '',
        previous: null,
        results: [],
    });

    const onChangePage = (page, limit) => {
        getAllPokemons(page * limit, limit)
            .then((res) => {
                const { count, next, previous, results } = res;
                setData({
                    ...data,
                    count,
                    next,
                    previous,
                    results: getOwnedTotals(results),
                });
            })
            .catch((e) => {
                console.log('ERROR', { e });
            });
    };

    const onClick = (e, { name, url }) => {
        window.location.href = `/pokemon/?fetch=${url}`;
    };

    return (
        <div>
            <Table
                data={data.results}
                total={data.count}
                hasNextPage={() => data.next}
                onChangePage={onChangePage}
                columns={[
                    {
                        title: 'Name',
                        accessor: 'name',
                    },
                    {
                        title: 'Owned',
                        accessor: 'ownedTotal',
                    },
                ]}
                actions={[
                    {
                        title: 'View',
                        onClick: onClick,
                    },
                ]}
            />
        </div>
    );
}
