import React, { useState, useMemo } from 'react';
import Table from '../Components/Table';
import { getMyPokemons, removePokemon } from '../pokemon';
import Navbar from '../Navbar';
import Pagination, { PAGE_LIMIT } from '../Components/Pagination';
import { DangerButton } from '../Components/Button';
import Modal from '../Components/Modal';

export default function MyList() {
    const [data, setData] = useState(getMyPokemons());
    const [paginationState, setPaginationState] = useState({
        page: 0,
        limit: PAGE_LIMIT,
    });
    const [modal, setModal] = useState({
        open: false,
        content: [],
    });

    const onRemovePokemon = (e, pokemon) => {
        removePokemon(pokemon);
        setData(getMyPokemons());
        setModal({
            open: false,
            content: [],
        });
    };

    const onOpenModal = (e, pokemon) => {
        setModal({
            open: true,
            content: (
                <div style={{ textAlign: 'center' }}>
                    {' '}
                    Would you like to delete: <br /> {pokemon.name} -{' '}
                    {pokemon.nickname} ? <br /> This action cannot be undone.
                    <br />{' '}
                    <DangerButton onClick={() => onRemovePokemon(e, pokemon)}>
                        {' '}
                        Yes{' '}
                    </DangerButton>{' '}
                </div>
            ),
        });
    };

    const displayData = useMemo(() => {
        const lowerBound = paginationState.page * paginationState.limit;
        const upperBound = (paginationState.page + 1) * paginationState.limit;

        return data.slice(lowerBound, upperBound);
    }, [data, paginationState.page, paginationState.limit]);
    return (
        <div>
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
