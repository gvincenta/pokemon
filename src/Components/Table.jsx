import React, { useState } from 'react';

export default function List({ data, columns }) {
    console.log({ data });
    return (
        <table>
            <thead>
                <tr>
                    {columns.map(({ title }, index) => (
                        <th key={`td-${index}-${title}`}> {title} </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.length > 0
                    ? data.map((value, index) => (
                          <tr key={index}>
                              {columns.map(({ accessor }) => {
                                  //   console.log({value, accessor})
                                  return (
                                      <td key={`td-${index}-${accessor}`}>
                                          {' '}
                                          {value[accessor]}{' '}
                                      </td>
                                  );
                              })}
                          </tr>
                      ))
                    : 'Not Found.'}
            </tbody>
        </table>
    );
}
