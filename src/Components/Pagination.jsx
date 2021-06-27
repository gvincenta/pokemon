import React, { useState, useEffect, useMemo } from 'react';
import Modal, { CenteredContent, Label, Input } from '../Components/Modal';
import styled from '@emotion/styled';
import Button, { TextButton } from './Button';
export const PAGE_LIMIT = 10; //how many items shown in a page
//main container
const ToolbarContainer = styled.div`
    grid-template-columns: auto auto auto;
    bottom: 0;
    display: grid;
    padding: 5%;
    margin: auto;
`;
//for left justified item
const ToolbarItem = styled.div`
    padding: 2%;
    font-family: PokemonSolid;
`;
//for center-ed item
const ToolbarItemCenter = styled.div`
    padding: 2%;
    text-align: center;
    align-self: center;
`;
//for right-justified item
const ToolbarItemRight = styled.div`
    padding: 2%;
    text-align: right;
`;

const MY_POKEMONS_KEY = 'MY_POKEMONS_KEY';
const POKEMONS_KEY = 'POKEMONS_KEY';

//use sessionStorage to cache current page number based on url.
const getCachedPageNumber = (upperBound) => {
    const key = window.location.hash.toLowerCase().includes('/mypokemons')
        ? MY_POKEMONS_KEY
        : POKEMONS_KEY;

    const cachedPageNumber = sessionStorage.getItem(key);
    //return value: 0 <= value <= upperBound
    if (!Boolean(cachedPageNumber)) {
        return 0;
    }

    return Math.min(Number(cachedPageNumber), upperBound);
};

const setCachedPageNumber = (pageNumber, upperBound) => {
    const key = window.location.hash.toLowerCase().includes('/mypokemons')
        ? MY_POKEMONS_KEY
        : POKEMONS_KEY;
    //set value: 0 <= value <= upperBound
    sessionStorage.setItem(
        key,
        Math.min(upperBound, Math.max(0, pageNumber ?? 0))
    );
};

export default function Pagination({ total = 0, hasNextPage, onChangePage }) {
    const upperBound = useMemo(() => {
        return Math.ceil(total / PAGE_LIMIT);
    }, [total]);

    const [page, setPage] = useState(
        getCachedPageNumber(Math.ceil(total / PAGE_LIMIT)) ?? 0
    );
    const [jumpToPage, setJumpToPage] = useState(1);

    //modal for jumping to a page.
    const [openModal, setOpenModal] = useState(false);

    /**
     * button actions:
     * fast rewind to first page,
     * previous page,
     * next page,
     * fast forward to last page,
     * jump to a page (with modal)
     */
    const onFirstPage = () => {
        onChangePage && onChangePage(0, PAGE_LIMIT);
        setPage(0);
        setCachedPageNumber(0, upperBound);
    };
    const onPreviousPage = () => {
        onChangePage && onChangePage(page - 1, PAGE_LIMIT);
        setPage(page - 1);
        setCachedPageNumber(page - 1, upperBound);
    };
    const onNextPage = () => {
        onChangePage && onChangePage(page + 1, PAGE_LIMIT);
        setPage(page + 1);
        setCachedPageNumber(page + 1, upperBound);
    };
    const onLastPage = () => {
        onChangePage && onChangePage(upperBound, PAGE_LIMIT);
        setPage(upperBound);
        setCachedPageNumber(upperBound, upperBound);
    };
    const onJumpPage = (e, pageNumber) => {
        onChangePage && onChangePage(pageNumber, PAGE_LIMIT);
        setPage(pageNumber);
        setCachedPageNumber(pageNumber, upperBound);
    };
    //when page number is clicked, ask to jump to what page.
    const onOpenModal = () => {
        setJumpToPage(page + 1); //display starts from 1, not 0.
        setOpenModal(true);
    };

    useEffect(() => {
        //if total goes down and current page is no longer exist, go back previous page.
        const lowerBound = page * PAGE_LIMIT + 1;
        if (page !== 0 && lowerBound > total) {
            onPreviousPage();
        }
    }, [total, page]);
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
                Page{' '}
                <TextButton
                    active={true}
                    disabled={Math.max(upperBound, 1) === 1}
                    onClick={onOpenModal}
                >
                    {' '}
                    {page + 1}{' '}
                </TextButton>
                / {Math.max(upperBound, 1)}{' '}
            </ToolbarItemCenter>
            <ToolbarItemRight>
                {' '}
                <TextButton
                    active={true}
                    disabled={
                        hasNextPage ? !hasNextPage(page, PAGE_LIMIT) : true
                    }
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
                    disabled={
                        hasNextPage ? !hasNextPage(page, PAGE_LIMIT) : true
                    }
                    onClick={onLastPage}
                >
                    {' '}
                    &raquo;
                </TextButton>{' '}
            </ToolbarItemRight>
            <Modal
                open={openModal}
                content={
                    <CenteredContent>
                        <form
                            onSubmit={(e) => {
                                onJumpPage(
                                    e,
                                    Math.min(
                                        upperBound,
                                        Math.max(0, jumpToPage - 1)
                                    )
                                ); //display is from 1, actual paging is from 0
                                setOpenModal(false);
                            }}
                        >
                            <Label> Jump to page:</Label>
                            <Input
                                type="Number"
                                max={Math.max(upperBound, 1)}
                                min={1}
                                value={jumpToPage}
                                onChange={(e) => {
                                    if (
                                        e.target.value > Math.max(upperBound, 1)
                                    ) {
                                        setJumpToPage(Math.max(upperBound, 1));
                                    }
                                    setJumpToPage(e.target.value ?? 1);
                                }}
                            />
                            <br />
                            <Button style={{ marginTop: '10px' }} type="submit">
                                {' '}
                                Submit{' '}
                            </Button>{' '}
                        </form>
                    </CenteredContent>
                }
                onClose={() => {
                    setOpenModal(false);
                }}
            />
        </ToolbarContainer>
    );
}
