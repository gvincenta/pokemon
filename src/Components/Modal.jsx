import React from 'react';
import styled from '@emotion/styled';
import { SecondaryButton } from './Button';
//modal adapted from https://www.w3schools.com/howto/howto_css_modals.asp
const ModalContainer = styled.div`
    display: ${(props) =>
        props.open ? 'block' : 'none'}; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    max-height: 100vh !important;
    border-radius: 20px;
    width: 80%; /* Could be more or less, depending on screen size */
`;

export const CenteredContent = styled.div`
    text-align: center;
`;

export const Label = styled.label`
    font-family: PokemonSolid;
    color: #3366ff;
`;

export const Input = styled.input`
    font-size: 20px;
    max-width: 50vw;
`;

export default function Modal({ open, onClose, content }) {
    return (
        <ModalContainer open={open}>
            <ModalContent>
                {content}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    {' '}
                    <SecondaryButton onClick={onClose}>
                        {' '}
                        Close{' '}
                    </SecondaryButton>{' '}
                </div>
            </ModalContent>
        </ModalContainer>
    );
}
