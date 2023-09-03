import {FC} from 'react';
import headerClassNames from './headerClassNames';
import Link from 'next/link';

interface IHeaderProps {
}

const Header: React.FC<IHeaderProps> = () => {
    const {contactUs, container, header, link, li, logo, logoContainer, nav, ul}= headerClassNames

  return(
    <header className={header}>
        <div className={container}>
            <Link href='/' className={logoContainer}><h3>Logo</h3></Link>
            <nav className={nav}>
                <ul className={ul}>
                    <li className={li}>
                        <Link href={'/'} className={link}>Home</Link>
                    </li>
                    <li className={li}>
                        <Link href={'/about'} className={link}>About Us</Link>
                    </li>
                    <li className={li}>
                        <Link href={'/shop'} className={link}>Shop</Link>
                    </li>
                    <li className={li}>
                        <Link href={'/blog'} className={link}>Blog</Link>
                    </li>
                    <li className={li}>
                        <Link href={'/contact'} className={contactUs}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  ) ;
};

export default Header;