import { createGlobalStyle } from "styled-components"
import { CartContextProvider } from "../components/CartContext"

// import '../styles/globals.css'

const GlobalStyles = createGlobalStyle`


  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


body{
  background-color:#A9A9A9;
  padding:0;
  margin:0;
  font-family: 'Roboto', sans-serif; 
}
`
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
