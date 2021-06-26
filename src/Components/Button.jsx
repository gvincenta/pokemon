import styled from '@emotion/styled';
//Default / Primary Button
const Button = styled.button`
    text-align: center;
    background-color: #3366ff;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    min-height: 50px;
    font-size: 16px;
    min-width: 120px;
    border-radius: 20px;
    &:disabled {
        background-color: #96a9e2;
    }
`;
//Button with texts only (no outline)
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
    min-height: 50px;
    min-width: 50px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #eeeeaa;
    border-color: #eeeeaa;
    border: 0px;
    &:disabled {
        color: #96a9e2;
    }
`;
//Rounded Page Button
export const PageButton = styled.button`
    text-align: center;
    background-color: #3366ff;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 100%;
    min-height: 50px;
    min-width: 50px;
    max-height: 40px;
    &:disabled {
        background-color: #96a9e2;
    }
    font-size: 16px;
`;
//Danger Action Button
export const DangerButton = styled.button`
    text-align: center;
    background-color: #f3110d;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    border: none;
    min-height: 50px;
    min-width: 120px;
    border-radius: 20px;
    font-size: 16px;
    margin-top: 10px;
`;
//Secondary Action Button
export const SecondaryButton = styled.button`
    text-align: center;
    background-color: #5a686f;
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    min-height: 50px;
    min-width: 120px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
`;
//table action button
export const ActionButton = styled.button`
    font-family: PokemonSolid;

    font-size: 20px;
    color: #f3110d;
    background-color: #eeeeaa;
    border: none;
`;
export default Button;
