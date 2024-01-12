import Header from '../Header/Header';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import Footer from '../Footer/Footer';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import './Main.css';

export default function Main() {
    return (
        <>
          <Header/>
          <Promo/>
          <NavTab/>
          <AboutProject/>
          <Techs/>
          <AboutMe/>
          <Footer/>
        </>     
  );
}