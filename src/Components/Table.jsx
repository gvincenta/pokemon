import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { ViewButton, PageButton } from '../Components/Button';
const PAGE_LIMIT_OPTIONS = [5, 10, 15, 20];
export const PAGE_LIMIT = 10;
const MainContainer = styled.div`
    margin-top: 20px;
`;

const ToolbarContainer = styled.div`
    grid-template-columns: auto auto auto;
    bottom: 0;
    display: grid;
    padding: 5%;
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
    padding: 5%;
    margin: auto;
    border-radius: 4px;
    box-shadow: 5px 5px 5px grey;
`;
const TableCell = styled.td`
    padding: 5px;
    padding-left: 10px;
    padding-right: 20px;
    text-align: left;
    background-color: #faf0f0;
    border-radius: 4px;
`;
const TableHeadingCell = styled.td`
    padding: 5px;
    padding-left: 10px;
    padding-right: 20px;
    text-align: left;
    background-color: #ef5350;
    border-radius: 4px;
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
    }, []);
    return (
        <MainContainer>
            <Table>
                <thead>
                    <tr>
                        {columns.map(({ title }, index) => (
                            <TableHeadingCell key={`td-${index}-${title}`}>
                                {' '}
                                {title}{' '}
                            </TableHeadingCell>
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
                                          <ViewButton
                                              key={`${title}-${index}`}
                                              onClick={(e) => {
                                                  onClick(e, value);
                                              }}
                                          >
                                              {' '}
                                              {title}{' '}
                                          </ViewButton>
                                      ))}
                                  </TableCell>
                              </tr>
                          ))
                        : 'Not Found.'}
                </tbody>
            </Table>
            <ToolbarContainer>
                <ToolbarItem>
                    {' '}
                    <PageButton disabled={page === 0} onClick={onPreviousPage}>
                        {' '}
                        &lt;{' '}
                    </PageButton>{' '}
                </ToolbarItem>
                <ToolbarItemCenter>
                    {' '}
                    Page {page + 1} / {Math.ceil(total / limit)}{' '}
                </ToolbarItemCenter>
                <ToolbarItemRight>
                    {' '}
                    <PageButton
                        disabled={
                            hasNextPage ? !hasNextPage(page, limit) : true
                        }
                        onClick={onNextPage}
                    >
                        {' '}
                        &gt;{' '}
                    </PageButton>{' '}
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
        </MainContainer>
    );
}
