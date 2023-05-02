import React, { useContext } from 'react'
import Head from 'next/head';
import {AppBar,ThemeProvider,Switch, CssBaseline, Toolbar,Link,createTheme, Typography,Container, Foot} from '@material-ui/core'
import useStyles from '../utils/styles';
import NextLink from 'next/link'
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({title, children, description}) {
    const {state, dispatch} = useContext(Store);
    const {darkMode} =state
    const theme = createTheme({
        typography: {
            h1:{
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2:{
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
        },
        palette:{
            type: darkMode ? 'dark' : 'light',
            primary:{
                main: '#f0c000'
            },
            secondary:{
                main:'#208080'
            }
        }
    })
    const classes = useStyles();
    const darkModeChangeHandler =()=>{
        dispatch({type: darkMode ?  'DARK_MODE_OFF' : 'DARK_MODE_ON'})
        const newDarkMode =!darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' :'OFF')
    }
  return (
    <div>
        <Head>
            <title>{title ? `${title}-Next Shop` : `Next Shop`}</title>
            {description && <meta name='description' content={description}></meta>}
        </Head>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>
                <Link href='/' className={classes.brand}> All Shop Next</Link>
                <div className={classes.grow}> </div>
                <div >
                    <Switch value={darkMode} defaultChecked onChange={darkModeChangeHandler}/>
                <Link href={'/cart'}>Cart</Link>
                <Link href={'/login'}>LogIn</Link>
                </div>
            </Toolbar>
        </AppBar>
        <Container className={classes.main}>
            {children}
        </Container>
        <footer className={classes.footer}>
            <Typography>
                All Rights Reserved @ Next Shop - 2023.
            </Typography>
        </footer>
        </ThemeProvider>
    </div>
  )
}
