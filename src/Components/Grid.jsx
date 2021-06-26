import React from 'react';
import styled from '@emotion/styled';
import { DangerContainer } from './Alert';
import Loading from './Loading';

const Container = styled.div`
    grid-template-columns: auto auto;
    margin-top: 20px;
    display: grid;
    max-height: 100;
    overflow: scroll;
    gap: 25px;
    column-gap: 50px;
    justify-content: center;
    padding: 1%;
`;

const Item = styled.div`
    padding: 20px;
    background-color: ${(props) => props.backgroundColor ?? '#faf0f0'};
    border-radius: 20px;
    box-shadow: 2px 2px 2px grey;
`;

const CARD_COLORS = [
    '#4dceb2',
    '#fb6a6a',
    '#77bdfa',
    '#7d518e',
    '#b2736d',
    '#e37c30',
    '#e57373',
    '#b39ddb',
    '#9fa8da',
    '#82b1ff',
];
export const PokemonsGrid = ({ data, onClick, loading, error }) => {
    if (loading) return <Loading> Loading </Loading>;
    if (error)
        return (
            <DangerContainer>
                {' '}
                Error occured. please try again later{' '}
            </DangerContainer>
        );
    return (
        <Container>
            {data?.length > 0
                ? data.map((v, index) => (
                      <Item
                          key={v.name}
                          onClick={(e) => {
                              onClick(e, v);
                          }}
                          backgroundColor={CARD_COLORS[index]}
                      >
                          {' '}
                          <b> {v.name} </b> <br /> Owned: {v.ownedTotal}{' '}
                      </Item>
                  ))
                : 'Not Found.'}
        </Container>
    );
};
const DetailContainer = styled.div`
    grid-template-columns: auto auto;
    background-color: #b7ced6;
    display: grid;
    max-height: 60vh !important;
    overflow: scroll;
    padding-left: 5%;
    border-radius: 20px;
`;

const DetailItem = styled.div`
    padding: 2%;
`;
export const PokemonDetailGrid = ({ data }) => {
    return (
        <DetailContainer>
            {data?.length > 0
                ? data.map((v) => <DetailItem key={v}> {v} </DetailItem>)
                : 'Not Found.'}
        </DetailContainer>
    );
};
