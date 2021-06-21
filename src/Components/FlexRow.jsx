import React from 'react';

export default function FlexRow({ accessor, data }) {
    return (
        <div
            style={{
                gridTemplateColumns: 'auto auto auto',
                // alignContent:'center', justifyContent:'center',
                backgroundColor: 'red',
                display: 'grid',
            }}
        >
            {data?.length > 0
                ? data.map((v) => (
                      <div style={{ padding: 5 }}> {v[accessor]} </div>
                  ))
                : 'Not Found.'}
        </div>
    );
}
