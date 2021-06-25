import React, { useEffect, useState, useMemo } from 'react';
import { PageButton } from '../Components/Button';
const extractSprites = ({ sprites = {} }) => {
    const {
        back_default,
        back_female,
        back_shiny,
        back_shiny_female,
        front_default,
        front_female,
        front_shiny,
        front_shiny_female,
    } = sprites;

    return [
        front_default,
        back_default,
        front_female,

        back_female,
        front_shiny,

        back_shiny,
        front_shiny_female,

        back_shiny_female,
    ].filter((v) => Boolean(v));
};
export default function PokemonImages({ sprites }) {
    const [page, setPage] = useState(0);
    const data = useMemo(() => extractSprites({ sprites }), [sprites]);
    const onPreviousPage = () => {
        setPage(page - 1);
    };
    const onNextPage = () => {
        setPage(page + 1);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            <PageButton
                disabled={page === 0}
                onClick={onPreviousPage}
                style={{ marginTop: 20 }}
            >
                {' '}
                &lt;{' '}
            </PageButton>
            <img src={data[page]} />
            <PageButton
                disabled={page === data.length - 1}
                onClick={onNextPage}
                style={{ marginTop: 20 }}
            >
                {' '}
                &gt;{' '}
            </PageButton>{' '}
        </div>
    );
}
