import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import Center from '../components/Center';
import Button from '../components/Button';
import { CartContext } from '../components/CartContext';
import axios from 'axios';
import Table from '../components/Table';
import Input from '../components/Input';


const ColumnWrapper = styled.div`
display:grid;
grid-template-columns: 1.3fr .7fr;
gap:20px;
`;

const Box = styled.div`
background-color: #fff;
border-radius:12px;
margin-top:20px;
padding: 20px;
margin-bottom:20px;
`

const ProductInfoCell = styled.td`
padding: 10px 0;

`
const ProductImageBox=styled.div`
width: 120px;
height: 120px;
display:flex;
justify-content:center;
align-items:center;
padding:10px;
border:2px solid rgba(0,0,0, 0.2);
border-radius 10px;
img{
    max-width:100px;
    max-height:100px;
}
`
const QuantityLabel = styled.span`
padding:0 3px;
`

const CityHolder = styled.div`
display:flex;
gap:5px;

`
export default function CartPage() {
    const { cartProduct, addProduct, removeProduct } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => {
        if (cartProduct?.length > 0) {
            axios.post('/api/cart', { ids: cartProduct })
                .then(res => {
                    setProducts(res.data)
                })
        }else{
            setProducts([])
        }
    }, [cartProduct])

    function plusProduct (id){
        addProduct(id);
    }
    
    function minusProduct (id){
        removeProduct(id);
    }

    let total  = 0;

    for( const productId of cartProduct){
        const price = products.find(p=> p._id === productId)?.price || 0;
        total +=price;
    }

    async function goToPayment(){
      const response=  await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country, cartProduct
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }

    if(window.location.href.includes('success')){
        return(
            <>
            <Header/>
            <Center>
                <ColumnWrapper>
                <Box>
                    <h1>Thanks For Your Order</h1>
                    <p>Your Payement is Successful</p>
                </Box>
                </ColumnWrapper>
            </Center>
            </>
        )
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!products?.length && (
                            <div>
                                Cart is Empty
                            </div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                            
                                            <ProductImageBox>
                                            <img src={product.images[0]} alt=''/>
                                            </ProductImageBox>
                                           <div style={{marginLeft:10, marginTop: 10, fontWeight:600, fontSize:15}}>{product.title}</div> 
                                            </ProductInfoCell>
                                            
                                            <td>
                                            <Button onClick={()=>minusProduct(product._id)}>-</Button>
                                            <QuantityLabel>
                                            {cartProduct.filter(id => id === product._id).length}
                                            </QuantityLabel>
                                            <Button onClick={()=>plusProduct(product._id)}>+</Button>
                                            </td>

                                            <td>${cartProduct.filter(id => id === product._id).length * product.price}</td>
                                        </tr>
                                    ))}
                                    
                                    <tr>
                                        <td></td>        
                                        <td></td>        
                                        <td>${ total }</td>        
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!products?.length && (
                        <Box>
                            
                            <h2>Order Confirmation</h2>
                            <Input type='text' name='name' placeholder='Name' value={name}  onChange={ev=> setName(ev.target.value)} />
                            <Input type='text' name='email' placeholder='Email' value={email}  onChange={ev=> setEmail(ev.target.value)} />
                            <CityHolder>                                 
                            <Input type='text' name='city' placeholder='City' value={city}  onChange={ev=> setCity(ev.target.value)} />
                            <Input type='text' name='postalCode' placeholder='Postal Code' value={postalCode}  onChange={ev=> setPostalCode(ev.target.value)} />
                            </CityHolder>
                            <Input type='text' name='streetAddress' placeholder='Street Address' value={streetAddress}  onChange={ev=> setStreetAddress(ev.target.value)} />
                            <Input type='text' name='country' placeholder='Country' value={country}  onChange={ev=> setCountry(ev.target.value)} />
                            <Button primary  type='submit' onClick={goToPayment}>Continue To Payment</Button>
                        
                        </Box>
                    )}

                </ColumnWrapper>
            </Center>
        </>
    )
}
