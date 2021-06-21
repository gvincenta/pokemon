import React from 'react';
import styled from '@emotion/styled';
const Container = styled.div`
    grid-template-columns: auto auto auto;
    background-color: #b7ced6;
    display: grid;
    padding-left: 5%;
`;

const Item = styled.div`
    padding: 2%;
`;
export default function FlexRow({ accessor, data }) {
    return (
        <Container>
            {data?.length > 0
                ? data.map((v) => <Item> {v[accessor]} </Item>)
                : 'Not Found.'}
        </Container>
    );
}
