import React, { useContext } from 'react'
import styled from 'styled-components'
import Button from './Button';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { CartContext } from './CartContext';

const ProductWrapper = styled.div`


`;

const WhiteBox = styled(Link)`
background-color: #fff;
padding:20px;
height:150px;
text-align:center;
align-items:center;
display:flex;
justify-content:center;
border-radius:1rem;
img{
    max-width:100%;
    max-height:150px;
}
`;

const Title = styled(Link)`
font-weight: normal;
font-size: 1rem;
margin:0;
color:inherit;
text-decoration:none;
`;

const ProductInfo = styled.div`
margin-top: 5px;
`;

const PriceRow = styled.div`
display: flex;
align-items:center;
justify-content:space-between; 
margin-top:5px;
`;


const Price = styled.div`
font-size:1.5rem;
font-weight:500;
`;
export default function ProductBox({ _id, title, images, description, price }) {
    const { addProduct } = useContext(CartContext);
    const url = '/product/' + _id;

    return (

        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images[0]} />
                </div>
            </WhiteBox>
            <ProductInfo>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button primary outline onClick={() => addProduct(_id)}>
                        <CartIcon />
                        Add To Cart
                    </Button>
                </PriceRow>
            </ProductInfo>
        </ProductWrapper>
    )
}
