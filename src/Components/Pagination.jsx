import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { PageButton } from '../Components/Button';
const PAGE_LIMIT_OPTIONS = [5, 10, 15, 20];
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

export default function List({ total, hasNextPage, onChangePage }) {
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
    // const getData = () => {
    //     if (onChangePage) {
    //         return data;
    //     }
    //     const lowerBound = page * limit;
    //     const upperBound = (page + 1) * limit;

    //     return data.filter(
    //         (v, index) => index < upperBound && index >= lowerBound
    //     );
    // };

    useEffect(() => {
        if (onChangePage) {
            onChangePage(page, limit);
        }
    }, []);
    return (
        <ToolbarContainer>
            <ToolbarItem></ToolbarItem>
            <ToolbarItemCenter> Total: {total} </ToolbarItemCenter>
            <ToolbarItem></ToolbarItem>
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
                    disabled={hasNextPage ? !hasNextPage(page, limit) : true}
                    onClick={onNextPage}
                >
                    {' '}
                    &gt;{' '}
                </PageButton>{' '}
            </ToolbarItemRight>
        </ToolbarContainer>
    );
}