import React, { useState, useEffect } from 'react';
import { getAllPokemons } from '../api';
import { getOwnedTotals } from '../pokemon';
import { PokemonsGrid } from '../Components/Grid';
import Pagination, { PAGE_LIMIT } from '../Components/Pagination';

import Detail from './Detail';
import Navbar from '../Navbar';

const LIST_VIEW = 'LIST_VIEW';
const DETAIL_VIEW = 'DETAIL_VIEW';

export default function List() {
    //api data
    const [data, setData] = useState({
        count: 0,
        next: '',
        previous: null,
        results: [],
    });
    //view state
    const [viewState, setViewState] = useState({
        view: LIST_VIEW,
        props: { loading: true, error: false },
    });
    //onChangePage callback : get more data
    const onChangePage = (page, limit) => {
        setViewState({
            ...viewState,
            props: {
                loading: true,
                error: false,
            },
        });
        getAllPokemons(page * limit, limit)
            .then((res) => {
                const { count, next, previous, results } = res;
                setData({
                    ...data,
                    count,
                    next,
                    previous,
                    //transform results with what we've owned
                    results: getOwnedTotals(results),
                });
                setViewState({
                    ...viewState,
                    props: {
                        loading: false,
                        error: false,
                    },
                });
            })
            .catch((e) => {
                console.log('ERROR', { e });
                setViewState({
                    ...viewState,
                    props: {
                        loading: false,
                        error: true,
                    },
                });
            });
    };
    //view pokemon's detail
    const onClick = (e, { name, url }) => {
        setViewState({
            view: DETAIL_VIEW,
            props: {
                url,
            },
        });
    };
    //initial load
    useEffect(() => {
        onChangePage(0, PAGE_LIMIT);
    }, []);

    switch (viewState.view) {
        //view pokemon's detail
        case DETAIL_VIEW:
            return (
                <Detail
                    {...viewState.props}
                    onClose={() => {
                        setViewState({
                            view: LIST_VIEW,
                            props: {},
                        });
                    }}
                />
            );
        //view all pokemons from pokeapi
        default:
            return (
                <div>
                    <Navbar />
                    <PokemonsGrid
                        error={viewState.props.error}
                        loading={viewState.props.loading}
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
