import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== 'undefined' ? window.localStorage : null;
    const [cartProduct, setCartProduct] = useState([])

    useEffect(() => {
        if (cartProduct?.length > 0) {
            ls.setItem('cart', JSON.stringify(cartProduct));
        }
    }, [cartProduct])
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProduct(JSON.parse(ls.getItem('cart')))
        }
    }, [])

    function addProduct(productId) {
        setCartProduct(prev => [...prev, productId])
    }

    function removeProduct(productId) {
        setCartProduct(prev => {

            const productPosition = prev.indexOf(productId);

            if (productPosition !== -1) {
                return prev.filter((value, index) => index !== productPosition)
            }
            return prev;
        })
    }


    return (
        <CartContext.Provider value={{ cartProduct, setCartProduct, addProduct, removeProduct }}>
            {children}
        </CartContext.Provider>
    )
}
