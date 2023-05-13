import React from 'react'
import styled from 'styled-components'
import Center from './Center';
import ProductBox from './ProductBox';

const ProductGrid = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
gap:20px;
padding-top:20px;
margin-bottom:20px;
`;

const Title = styled.h2`
font-size:1.7rem;
margin:30px 0 20px 0;
font-weighr:normal;
`

export default function NewProducts({ products }) {
    return (

        <Center>
            <Title>New Products Available</Title>
            <ProductGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBox key={product._id} {...product} />
                ))}
            </ProductGrid>
        </Center>
    )
}
