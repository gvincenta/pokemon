import React, { useState, useMemo } from 'react';
import { PageButton } from '../Components/Button';
import styled from '@emotion/styled';
//main container
const MainContainer = styled.div`
    display: 'flex';
    flex-direction: 'row';
    justify-content: 'center';
    align-content: 'center';
`;
//extracts sprites by looking up at certain properties only.
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
    //returns those that are not null as array.
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
//displays images of pokemons with previous / next button (as a small carousel).
export default function PokemonImages({ sprites }) {
    const [page, setPage] = useState(0);
    const data = useMemo(() => extractSprites({ sprites }), [sprites]);

    /**
     *  carousel action:
     * next
     * previous
     */
    const onPreviousPage = () => {
        setPage(page - 1);
    };
    const onNextPage = () => {
        setPage(page + 1);
    };

    return (
        <MainContainer>
            {data.length > 0 ? (
                <>
                    {' '}
                    <PageButton
                        disabled={page === 0}
                        onClick={onPreviousPage}
                        style={{ marginTop: 20 }}
                    >
                        {' '}
                        &lt;{' '}
                    </PageButton>
                    <img src={data[page]} alt={data[page]} />
                    <PageButton
                        disabled={page === data.length - 1}
                        onClick={onNextPage}
                        style={{ marginTop: 20 }}
                    >
                        {' '}
                        &gt;{' '}
                    </PageButton>{' '}
                </>
            ) : (
                'Not found.'
            )}
        </MainContainer>
    );
}
