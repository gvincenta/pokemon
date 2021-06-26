import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { TextButton } from '../Components/Button';
export const PAGE_LIMIT = 10;

const ToolbarContainer = styled.div`
    grid-template-columns: auto auto auto;
    bottom: 0;
    display: grid;
    padding: 5%;
    margin: auto;
`;

const ToolbarItem = styled.div`
    padding: 2%;
    font-family: PokemonSolid;
`;
const ToolbarItemCenter = styled.div`
    padding: 2%;
    text-align: center;
    align-self: center;
`;
const ToolbarItemRight = styled.div`
    padding: 2%;
    text-align: right;
`;

export default function List({ total, hasNextPage, onChangePage }) {
    const [page, setPage] = useState(0);
    const [limit] = useState(PAGE_LIMIT);
    const onFirstPage = () => {
        onChangePage && onChangePage(0, limit);
        setPage(0);
    };
    const onPreviousPage = () => {
        onChangePage && onChangePage(page - 1, limit);
        setPage(page - 1);
    };
    const onNextPage = () => {
        onChangePage && onChangePage(page + 1, limit);
        setPage(page + 1);
    };
    const onLastPage = () => {
        onChangePage && onChangePage(Math.ceil(total / limit), limit);
        setPage(Math.ceil(total / limit));
    };

    useEffect(() => {
        //if total goes down and current page is no longer exist, go back previous page.
        const lowerBound = page * limit + 1;
        if (page !== 0 && lowerBound > total) {
            onPreviousPage();
        }
    }, [total, page, limit]);
    return (
        <ToolbarContainer>
            <ToolbarItem>
                {' '}
                <TextButton
                    active={true}
                    disabled={page === 0}
                    onClick={onPreviousPage}
                >
                    {' '}
                    &lt;{' '}
                </TextButton>{' '}
            </ToolbarItem>
            <ToolbarItemCenter>
                {' '}
                Page {page + 1} / {Math.ceil(total / limit)}{' '}
            </ToolbarItemCenter>
            <ToolbarItemRight>
                {' '}
                <TextButton
                    active={true}
                    disabled={hasNextPage ? !hasNextPage(page, limit) : true}
                    onClick={onNextPage}
                >
                    {' '}
                    &gt;{' '}
                </TextButton>{' '}
            </ToolbarItemRight>
            <ToolbarItem>
                {' '}
                <TextButton
                    active={true}
                    disabled={page === 0}
                    onClick={onFirstPage}
                >
                    {' '}
                    &laquo;
                </TextButton>{' '}
            </ToolbarItem>
            <ToolbarItemCenter> Total: {total} </ToolbarItemCenter>

            <ToolbarItemRight>
                <TextButton
                    active={true}
                    disabled={hasNextPage ? !hasNextPage(page, limit) : true}
                    onClick={onLastPage}
                >
                    {' '}
                    &raquo;
                </TextButton>{' '}
            </ToolbarItemRight>
        </ToolbarContainer>
    );
}
