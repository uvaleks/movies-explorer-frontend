import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import './Main.css';

export default function Main() {
    return (
        <main>
          <Promo/>
          <NavTab/>
          <AboutProject/>
          <Techs/>
          <AboutMe/>
          <Portfolio/>
        </main>     
  );
}