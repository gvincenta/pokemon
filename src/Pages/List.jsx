import React, { useState } from 'react';
import { getAllPokemons } from '../api';
import { getOwnedTotals } from '../pokemon';
import Grid from '../Components/Grid';
import Pagination from '../Components/Pagination';

import Detail from './Detail';
import Navbar from '../Navbar';

const LIST_VIEW = 'LIST_VIEW';
const DETAIL_VIEW = 'DETAIL_VIEW';

export default function List() {
    const [data, setData] = useState({
        count: 0,
        next: '',
        previous: null,
        results: [],
    });

    const [state, setState] = useState({
        view: LIST_VIEW,
        props: {},
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
        setState({
            view: DETAIL_VIEW,
            props: {
                url,
            },
        });
    };
    switch (state.view) {
        case DETAIL_VIEW:
            return (
                <Detail
                    {...state.props}
                    onClose={() => {
                        setState({
                            view: LIST_VIEW,
                            props: {},
                        });
                    }}
                />
            );
        default:
            return (
                <div>
                    <Navbar />
                    <Grid
                        data={data.results}
                        onClick={onClick}
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
                    />
                    <Pagination
                        total={data.count}
                        hasNextPage={() => data.next}
                        onChangePage={onChangePage}
                    />
                </div>
            );
    }
}
