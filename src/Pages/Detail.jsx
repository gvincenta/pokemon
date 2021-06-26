import React, { useEffect, useState } from 'react';
import { getPokemonDetail } from '../api';
import Catch from './Catch';
import PokemonImages from '../Components/PokemonImages';
import styled from '@emotion/styled';
import Modal from '../Components/Modal';
import { PokemonDetailGrid } from '../Components/Grid';
import Button from '../Components/Button';
import { TextButton } from '../Components/Button';
import { DangerContainer } from '../Components/Alert';
import Loading from '../Components/Loading';

const MainContainer = styled.div`
    padding: 5%;
`;

const Name = styled.div`
    text-align: center;
    text-transform: uppercase;
    font-family: PokemonSolid;
    font-size: 30px;
    color: #3366ff;
`;

const FooterContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`;

const FooterItem = styled.div`
    text-align: center;
`;
export default function Detail({ url, onClose }) {
    const [data, setData] = useState({ moves: [], types: [], sprites: [] });
    const [modal, setModal] = useState({
        open: false,
        content: [],
    });
    const [fetchStatus, setFetchStatus] = useState({
        loading: true,
        error: false,
    });

    useEffect(() => {
        setFetchStatus({ loading: true, error: false });
        getPokemonDetail(url)
            .then((res) => {
                const { moves, types, forms, sprites } = res;
                console.log({ moves, types, forms, sprites });
                const movesList = moves
                    .map(({ move }) => move.name)
                    .sort((left, right) =>
                        String(left).localeCompare(String(right), 'en', {
                            sensitivity: 'base',
                        })
                    );
                const typesList = types //flatten types and sort by slot
                    .map(({ slot, type }) => type.name);
                setData({
                    ...data,
                    moves: movesList,
                    types: typesList,
                    forms,
                    sprites,
                });
                setFetchStatus({ loading: false, error: false });
            })
            .catch((e) => {
                setFetchStatus({ loading: false, error: true });
            });
    }, [url]);
    if (fetchStatus.loading)
        return (
            <>
                {' '}
                <Button onClick={onClose}>&lt;</Button>{' '}
                <Loading> Loading </Loading>{' '}
            </>
        );
    if (fetchStatus.error)
        return (
            <>
                {' '}
                <Button onClick={onClose}>&lt;</Button>{' '}
                <DangerContainer>
                    {' '}
                    Error occured. please try again later{' '}
                </DangerContainer>{' '}
            </>
        );

    return (
        <MainContainer>
            <Button onClick={onClose}>&lt;</Button>
            <Name> {data?.forms?.[0]?.name ?? '???'} </Name>
            <PokemonImages sprites={data.sprites} />

            <Catch name={data?.forms?.[0]?.name} url={url} />
            <FooterContainer>
                <FooterItem>
                    <TextButton
                        onClick={() => {
                            setModal({
                                content: (
                                    <PokemonDetailGrid data={data.moves} />
                                ),
                                open: true,
                            });
                        }}
                    >
                        {' '}
                        Moves{' '}
                    </TextButton>
                </FooterItem>
                <FooterItem>
                    <TextButton
                        onClick={() => {
                            setModal({
                                content: (
                                    <PokemonDetailGrid data={data.types} />
                                ),
                                open: true,
                            });
                        }}
                    >
                        {' '}
                        Types{' '}
                    </TextButton>
                </FooterItem>
            </FooterContainer>
            <Modal
                {...modal}
                onClose={() => {
                    setModal({
                        content: [],
                        open: false,
                    });
                }}
            />
        </MainContainer>
    );
}
