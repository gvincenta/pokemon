import React from 'react';
import styled from '@emotion/styled';
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
    background-color: #faf0f0;
    border-radius: 20px;
    box-shadow: 2px 2px 2px grey;
`;
//color randomise wwarna warni
export default function Grid({ columns, data, onClick }) {
    return (
        <>
            <Container>
                {data?.length > 0
                    ? data.map((v) => (
                          <Item
                              onClick={(e) => {
                                  onClick(e, v);
                              }}
                          >
                              {' '}
                              <b> {v.name} </b> <br /> Owned: {v.ownedTotal}{' '}
                          </Item>
                      ))
                    : 'Not Found.'}
            </Container>
        </>
    );
}
