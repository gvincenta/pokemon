import React, { useState } from 'react';
import styled from '@emotion/styled';
const Header = styled.div`
    text-transform: uppercase;
    text-decoration: underline;
    justify-content: center;
    padding: 5%;
    background-color: grey;
    cursor: pointer;
`;
const MainContainer = styled.div`
    padding: auto;
    display: grid;
    row-gap: 10px;
    margin-top: 15px;
    grid-template-rows: auto auto;
`;

export default function Accordion({ content }) {
    const [panel, setPanel] = useState(null);
    const changePanel = (name) => {
        if (panel === name) {
            setPanel(null);
            return;
        }
        setPanel(name);
    };
    return (
        <MainContainer>
            {content.map(({ header, collapsible }, index) => (
                <>
                    <Header
                        onClick={() => {
                            changePanel(index);
                        }}
                    >
                        {' '}
                        {header}{' '}
                    </Header>
                    {panel === index ? <> {collapsible} </> : null}
                </>
            ))}
        </MainContainer>
    );
}
