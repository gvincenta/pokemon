import React, { useState, useEffect } from 'react';

const PAGE_LIMIT_OPTIONS = [1, 5, 10, 15, 20];
export const PAGE_LIMIT = 20;

export default function List({
    data,
    columns,
    actions = [],
    total,
    hasNextPage,
    onChangePage,
}) {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(PAGE_LIMIT);

    const onPreviousPage = () => {
        onChangePage && onChangePage(page - 1, limit);
        setPage(page - 1);
    };
    const onNextPage = () => {
        onChangePage && onChangePage(page + 1, limit);
        setPage(page + 1);
    };

    const onPageLimitChange = (e) => {
        const newLimit = Number(e.target.value);
        onChangePage && onChangePage(page, newLimit);
        setLimit(newLimit);
    };

    const getData = () => {
        if (onChangePage) {
            return data;
        }
        const lowerBound = page * limit;
        const upperBound = (page + 1) * limit;

        return data.filter(
            (v, index) => index < upperBound && index >= lowerBound
        );
    };

    useEffect(() => {
        if (onChangePage) {
            onChangePage(page, limit);
        }
    }, [onChangePage]);
    return (
        <>
            <p> Total: {total} </p>
            {page > 0 && <button onClick={onPreviousPage}> Previous </button>}
            {hasNextPage && hasNextPage(page, limit) && (
                <button onClick={onNextPage}> Next </button>
            )}
            <select
                name="pokemons per page"
                value={limit}
                onChange={onPageLimitChange}
            >
                {' '}
                {PAGE_LIMIT_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                        {' '}
                        {v}{' '}
                    </option>
                ))}{' '}
            </select>
            <table>
                <thead>
                    <tr>
                        {columns.map(({ title }, index) => (
                            <th key={`td-${index}-${title}`}> {title} </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0
                        ? getData().map((value, index) => (
                              <tr key={index}>
                                  {columns.map(({ accessor, onDisplay }) => {
                                      //   console.log({value, accessor})
                                      return (
                                          <td key={`td-${index}-${accessor}`}>
                                              {' '}
                                              {onDisplay
                                                  ? onDisplay(value)
                                                  : value[accessor]}{' '}
                                          </td>
                                      );
                                  })}
                                  <td>
                                      {actions.map(({ title, onClick }) => (
                                          <button
                                              key={`${title}-${index}`}
                                              onClick={(e) => {
                                                  onClick(e, value);
                                              }}
                                          >
                                              {' '}
                                              {title}{' '}
                                          </button>
                                      ))}
                                  </td>
                              </tr>
                          ))
                        : 'Not Found.'}
                </tbody>
            </table>
        </>
    );
}
