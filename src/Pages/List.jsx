import React, { useEffect, useState } from 'react';
import { getAllPokemons } from '../api';

const PAGE_LIMIT = 20;

const hasNextPage = (count, limit, currentPage) => {
    console.log({ count, limit, currentPage });
    return currentPage < count / limit;
};
export default function List() {
    const [data, setData] = useState({
        count: 0,
        next: '',
        previous: null,
        results: [],
        limit: PAGE_LIMIT,
    });

    const [page, setPage] = useState(0);

    const previousPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);

    useEffect(() => {
        //fetch a list of pokemons

        getAllPokemons(page * data.limit, data.limit)
            .then((res) => {
                const { count, next, previous, results } = res;
                setData({ ...data, count, next, previous, results });
            })
            .catch((e) => {
                console.log('ERROR', { e });
            });
    }, [page]);

    return (
        <div>
            <p> Total: {data.count} </p>
            {page > 0 && <button onClick={previousPage}> Previous </button>}
            {data.next && <button onClick={nextPage}> Next </button>}
            {/* dropdown for page limit */}
            <table>
                <thead>
                    <tr>
                        <td> Name </td>
                        <td> Owned Total </td>
                    </tr>
                </thead>
                <tbody>
                    {data.results?.length > 0
                        ? data.results.map(({ name, url }) => (
                              <tr>
                                  {' '}
                                  <td>
                                      {' '}
                                      <a href={`/pokemon/?fetch=${url}`}>
                                          {' '}
                                          {name}{' '}
                                      </a>{' '}
                                  </td>
                                  <td> insret counter </td>{' '}
                              </tr>
                          ))
                        : 'No Pokemon Found.'}
                </tbody>
            </table>
        </div>
    );
}
