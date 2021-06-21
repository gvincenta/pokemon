import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
    text-align: center;
    background-color: #337ab7;
    padding: 6px 12px;
    color: white;
    border-radius: 4px;
    &:disabled {
        background-color: #b7ced6;
    }
`;
export default Button;
