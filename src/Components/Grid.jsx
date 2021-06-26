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
    background-color: ${(props) => props.backgroundColor ?? '#faf0f0'};
    border-radius: 20px;
    box-shadow: 2px 2px 2px grey;
`;

const CARD_COLORS = [
    '#42a5f5',
    '#00acc1',
    '#4db6ac',
    '#7cb342',
    '#9e9d24',
    '#ff6f00',
    '#9e9e9e',
    '#90a4ae',
    '#9fa8da',
    '#82b1ff',
];
/* '#4dceb2',
'#fb6a6a', 
'#77bdfa', 
'#7d518e', 
'#b2736d', 
'#e37c30', 
'#e57373', 
'#b39ddb',  */
/*    ]*/
export default function Grid({ columns, data, onClick }) {
    return (
        <>
            <Container>
                {data?.length > 0
                    ? data.map((v, index) => (
                          <Item
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
        </>
    );
}
