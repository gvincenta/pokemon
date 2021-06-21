import React, { useState } from 'react';

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
        <div>
            {content.map(({ header, collapsible }, index) => (
                <>
                    <div
                        style={{ backgroundColor: 'grey' }}
                        onClick={() => {
                            changePanel(index);
                        }}
                    >
                        {' '}
                        {header}{' '}
                    </div>
                    {panel === index ? <> {collapsible} </> : null}
                </>
            ))}
        </div>
    );
}
