import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import Button from '../Components/Button';
const PAGE_LIMIT_OPTIONS = [5, 10, 15, 20];
export const PAGE_LIMIT = 10;
const MainContainer = styled.div`
    margin-top: 20px;
`;

const ToolbarContainer = styled.div`
    grid-template-columns: auto auto auto;
    background-color: #ff8f36;
    display: grid;
    padding: auto;
    margin: auto;
`;

const ToolbarItem = styled.div`
    padding: 2%;
`;
const ToolbarItemCenter = styled.div`
    padding: 2%;
    text-align: center;
`;
const ToolbarItemRight = styled.div`
    padding: 2%;
    text-align: right;
`;
const Select = styled.select`
    padding: 6px 12px;
    border-radius: 4px;
`;

const Table = styled.table`
    background-color: #b7ced6;
    padding: 5%;
    margin: auto;
    border: 1px solid black;
    border-radius: 4px;
`;
const TableCell = styled.td`
    padding: auto;
    text-align: center;
`;
const TableHeadingCell = styled.th`
    padding: 5px;
    text-align: center;
`;
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
        <MainContainer>
            <ToolbarContainer>
                <ToolbarItem>
                    {' '}
                    <Button disabled={page === 0} onClick={onPreviousPage}>
                        {' '}
                        &lt;{' '}
                    </Button>{' '}
                </ToolbarItem>
                <ToolbarItemCenter>
                    {' '}
                    Page {page + 1} / {Math.ceil(total / limit)}{' '}
                </ToolbarItemCenter>
                <ToolbarItemRight>
                    {' '}
                    <Button
                        disabled={
                            hasNextPage ? !hasNextPage(page, limit) : true
                        }
                        onClick={onNextPage}
                    >
                        {' '}
                        &gt;{' '}
                    </Button>{' '}
                </ToolbarItemRight>
                <ToolbarItem>
                    {' '}
                    <Select
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
                    </Select>{' '}
                </ToolbarItem>
                <ToolbarItemCenter> Total: {total} </ToolbarItemCenter>
            </ToolbarContainer>

            <Table>
                <thead>
                    <tr>
                        {columns.map(({ title }, index) => (
                            <TableHeadingCell key={`td-${index}-${title}`}>
                                {' '}
                                {title}{' '}
                            </TableHeadingCell>
                        ))}
                        <TableHeadingCell> Actions </TableHeadingCell>
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0
                        ? getData().map((value, index) => (
                              <tr key={index}>
                                  {columns.map(({ accessor, onDisplay }) => {
                                      //   console.log({value, accessor})
                                      return (
                                          <TableCell
                                              key={`td-${index}-${accessor}`}
                                          >
                                              {' '}
                                              {onDisplay
                                                  ? onDisplay(value)
                                                  : value[accessor]}{' '}
                                          </TableCell>
                                      );
                                  })}
                                  <TableCell>
                                      {actions.map(({ title, onClick }) => (
                                          <Button
                                              key={`${title}-${index}`}
                                              onClick={(e) => {
                                                  onClick(e, value);
                                              }}
                                          >
                                              {' '}
                                              {title}{' '}
                                          </Button>
                                      ))}
                                  </TableCell>
                              </tr>
                          ))
                        : 'Not Found.'}
                </tbody>
            </Table>
        </MainContainer>
    );
}
