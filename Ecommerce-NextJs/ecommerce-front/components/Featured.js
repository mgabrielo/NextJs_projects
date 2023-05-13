import React, { useContext } from 'react'
import Center from './Center'
import styled from 'styled-components'
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { CartContext } from './CartContext';

const Bg = styled.div`
background-color:#222;
color:#fff;
padding: 50px 0;
`;


const Title = styled.h1`
margin:0;
font-weight:normal;
font-size:2rem;
`;

const Desc = styled.p`
color:#aaa;
font-size:.9rem;
`;

const ColumnWrapper = styled.div`
display:grid;
grid-template-columns: 1.1fr 0.9fr;
gap:40px;
img{
    max-width:100%;
}
`;

const Column = styled.div`
display:flex;
align-items:center;
`;

const ButtonWrapper = styled.div`
display:flex;
gap:8px;
margin-top:25px;
`;


export default function Featured({ product }) {

    const { setCartProduct, addProduct } = useContext(CartContext)

    function addFeaturedToCart() {
        addProduct(prev => [...prev, product._id])
    }

    return (
        <Bg>
            <Center>
                <ColumnWrapper>
                    <Column>
                        <div>
                            <Title>
                                {product.title}
                            </Title>
                            <Desc>
                                {product.description}
                            </Desc>
                            <ButtonWrapper>
                                <ButtonLink outline={1} white={1} href={'/products/' + product._id} >Read more</ButtonLink>
                                <Button white onClick={addFeaturedToCart} >
                                    <CartIcon />
                                    Add to Cart
                                </Button>
                            </ButtonWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src='https://t3.ftcdn.net/jpg/02/07/50/74/360_F_207507423_sfpQVUko9IViDJKmU4ZHcwOqUulqbDIK.jpg' alt='' />
                    </Column>
                </ColumnWrapper>
            </Center>
        </Bg>
    )
}
