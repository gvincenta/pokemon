import styled from '@emotion/styled';
//#ef5350
const Button = styled.button`
    text-align: center;
    background-color: #3366ff;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    &:disabled {
        background-color: #96a9e2;
    }
`;

export const TextButton = styled.button`
    border-radius: 20px;
    padding-top: 12px;
    font-family: ${(props) =>
        props.active ? 'PokemonSolid' : 'PokemonHollow'};
    text-transform: uppercase;
    font-size: 20px;
    padding-bottom: 12px;
    color: #3366ff;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #eeeeaa;
    border-color: #eeeeaa;
    border: 0px;
`;

export const PageButton = styled.button`
    text-align: center;
    background-color: #3366ff;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 100%;
    max-height: 40px;
    &:disabled {
        background-color: #96a9e2;
    }
`;
export const DangerButton = styled.button`
    text-align: center;
    background-color: #f3110d;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px;
`;

export const SecondaryButton = styled.button`
    text-align: center;
    background-color: #5a686f;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px;
`;
export default Button;
