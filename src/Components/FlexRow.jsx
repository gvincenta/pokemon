import React from 'react';
import styled from '@emotion/styled';
const Container = styled.div`
    grid-template-columns: auto auto;
    background-color: #b7ced6;
    display: grid;
    max-height: 60vh !important;
    overflow: scroll;
    padding-left: 5%;
    border-radius: 20px;
`;

const Item = styled.div`
    padding: 2%;
`;
export default function FlexRow({ data }) {
    return (
        <Container>
            {data?.length > 0
                ? data.map((v) => <Item> {v} </Item>)
                : 'Not Found.'}
        </Container>
    );
}
