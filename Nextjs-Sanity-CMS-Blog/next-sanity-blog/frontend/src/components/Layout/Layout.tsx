import {FC, ReactNode} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface ILayoutProps {
    children:ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {

  return(
    <>
    <Header/>
    <main className='bg-primary-gradient min-h-screen'>
        {children}
    </main>
    <Footer/>
    </>
  ) ;
};

export default Layout;
