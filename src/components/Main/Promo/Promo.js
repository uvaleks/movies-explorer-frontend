import './Promo.css';
import heroImage from '../../../images/hero-image.svg';

export default function Promo() {
    return (
        <section className="promo">
            <img className="promo__hero-image" src={heroImage} alt="Логотип Практикума"/>
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </section>     
  );
}