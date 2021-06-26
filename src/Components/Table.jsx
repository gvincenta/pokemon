import React from 'react';

import styled from '@emotion/styled';
import { DangerContainer } from './Alert';
import Loading from './Loading';

const TableContainer = styled.table`
    padding: 3%;
    margin: auto;
    margin-top: 20px;
    border-radius: 40px;
    border: 5px solid #3366ff;
`;
const TableCell = styled.td`
    padding: 10px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 25vw;

    padding-left: 10px;
    padding-right: 20px;
    background-color: #eeeeaa;
    border-radius: 4px;
`;
const TableHeadingCell = styled.td`
    padding: 5px;
    padding-left: 10px;
    padding-right: 20px;
    font-family: PokemonSolid;
    text-transform: uppercase;
    text-align: left;
    background-color: #eeeeaa;
    border-radius: 4px;
`;

export default function Table({ data, columns, actions = [], loading, error }) {
    if (loading) return <Loading> Loading </Loading>;
    if (error)
        return (
            <DangerContainer>
                {' '}
                Error occured. please try again later{' '}
            </DangerContainer>
        );
    return (
        <TableContainer>
            <thead>
                <tr>
                    {columns.map(({ title }, index) => (
                        <TableHeadingCell key={`td-${index}-${title}`}>
                            {' '}
                            {title}{' '}
                        </TableHeadingCell>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.length > 0
                    ? data.map((value, index) => (
                          <tr key={index}>
                              {columns.map(({ accessor, onDisplay }) => {
                                  //   console.log({value, accessor})
                                  return (
                                      <TableCell
                                          key={`td-${index}-${accessor}`}
                                      >
                                          {' '}
                                          {onDisplay
                                              ? onDisplay(value)
                                              : value[accessor]}{' '}
                                      </TableCell>
                                  );
                              })}
                              <TableCell
                                  style={{
                                      //   backgroundColor: 'red',
                                      marginRight: 0,
                                      paddingRight: 0,
                                      paddingLeft: 0,
                                  }}
                              >
                                  {actions.map(({ title, onClick }) => (
                                      <button
                                          style={{
                                              fontFamily: 'PokemonSolid',
                                              color: '#f3110d',
                                              border: 'none',
                                              backgroundColor: '#eeeeaa',
                                              margin: 0,
                                              padding: 0,
                                              fontSize: '20px',
                                          }}
                                          key={`${title}-${index}`}
                                          onClick={(e) => {
                                              onClick(e, value);
                                          }}
                                      >
                                          {' '}
                                          {title}{' '}
                                      </button>
                                  ))}
                              </TableCell>
                          </tr>
                      ))
                    : 'Not Found.'}
            </tbody>
        </TableContainer>
    );
}
