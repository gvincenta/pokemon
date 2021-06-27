import React, { useState, useMemo } from 'react';
import Table from '../Components/Table';
import { getMyPokemons, removePokemon } from '../pokemon';
import Navbar from '../Navbar';
import Pagination, { PAGE_LIMIT } from '../Components/Pagination';
import { DangerButton } from '../Components/Button';
import Modal, { CenteredContent } from '../Components/Modal';
//displays all pokemons that you own.
export default function MyList() {
    //data is from localstorage.
    const [data, setData] = useState(getMyPokemons());
    //keeps track of pagination state.
    const [paginationState, setPaginationState] = useState({
        page: 0,
        limit: PAGE_LIMIT,
    });
    //confirmation modal state for deleting a pokemon.
    const [modal, setModal] = useState({
        open: false,
        content: [],
    });
    //once delete has been confirmed, delete the pokemon.
    const onRemovePokemon = (e, pokemon) => {
        removePokemon(pokemon);
        setData(getMyPokemons());
        setModal({
            open: false,
            content: [],
        });
    };
    //when X button is clicked, display a confirmation modal.
    const onOpenModal = (e, pokemon) => {
        setModal({
            open: true,
            content: (
                <CenteredContent>
                    {' '}
                    Would you like to delete: <br /> {pokemon.name} -{' '}
                    {pokemon.nickname} ? <br /> This action cannot be undone.
                    <br />{' '}
                    <DangerButton onClick={() => onRemovePokemon(e, pokemon)}>
                        {' '}
                        Yes{' '}
                    </DangerButton>{' '}
                </CenteredContent>
            ),
        });
    };
    //data display is paginated.
    const displayData = useMemo(() => {
        const lowerBound = paginationState.page * paginationState.limit;
        const upperBound = (paginationState.page + 1) * paginationState.limit;

        return data.slice(lowerBound, upperBound);
    }, [data, paginationState.page, paginationState.limit]);
    return (
        <div>
            {/*  displays a list of pokemons that you own with a paginated table and a modal confirmation. */}
            <Navbar />
            <Table
                data={displayData}
                columns={[
                    {
                        title: 'Name',
                        accessor: 'name',
                    },
                    {
                        title: 'Nickname',
                        accessor: 'nickname',
                    },
                ]}
                actions={[
                    {
                        title: 'x',
                        onClick: onOpenModal,
                    },
                ]}
            />
            <Pagination
                total={data.length}
                hasNextPage={(page, limit) => (page + 1) * limit < data.length}
                onChangePage={(page, limit) => {
                    setPaginationState({ page, limit });
                }}
            />
            <Modal
                {...modal}
                onClose={() => {
                    setModal({
                        open: false,
                        content: [],
                    });
                }}
            />
        </div>
    );
}
