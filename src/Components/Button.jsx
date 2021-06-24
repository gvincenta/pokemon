import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
    text-align: center;
    background-color: #ef5350;
    padding: 6px 12px;
    color: white;
    border-radius: 4px;
    &:disabled {
        background-color: #faf0f0;
    }
`;

export const NavigationButton = styled.button`
    border-radius: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: white;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ef5350;
    border-color: #ef5350;
    box-shadow: 5px 5px 5px grey;
`;

export const ViewButton = styled.button`
    background-color: #faf0f0;
    z-index: 0;
    padding: 6px 12px;
    border: none;
    color: #337ab7;
    border-radius: 4px;
`;
export const PageButton = styled.button`
    text-align: center;
    background-color: #ef5350;
    padding: 6px 12px;
    color: white;
    border-radius: 100%;
    &:disabled {
        background-color: #faf0f0;
    }
`;

export default Button;
