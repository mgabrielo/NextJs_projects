import {FC} from 'react';
import footerClassNames from './footerClassNames';
interface IFooterProps {
}

const Footer: React.FC<IFooterProps> = () => {
    const {container, footer, section, 
            section1, section1Content, section1Heading,
            section2, section2Content, section2Heading, 
            section2ul, section3, section3Content,
            section3Heading,sectionLink
        } = footerClassNames
  return(
    <footer className={footer}>
    <div className={container}>
      <div className={section}>
        <div className={section1}>
          <h2 className={section1Heading}>LOGO</h2>
          <p className={section1Content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className={section2}>
          <h2 className={section2Heading}>About us</h2>
          <ul className={section2ul}>
            <li>
              <a href="#" className={sectionLink}>
                Careers
              </a>
            </li>
            <li>
              <a href="#" className={sectionLink}>
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className={section3}>
          <h2 className={section3Heading}>Contact us</h2>
          <p className={section3Content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </div>
  </footer>
  ) ;
};

export default Footer;