import './AboutMe.css';
import profilePic from '../../../images/profile-pic.png';

export default function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__section-heading">Студент</h2>
            <div className="about-me__profile-wrapper">
                <div className="about-me__profile">
                    <h3 className="about-me__name">Алексей</h3>
                    <p className="about-me__description">Веб-разработчик, 34 года</p>
                    <p className="about-me__bio">Я родился в небольшом городке под Минском в Беларуси. Рос и учился уже в России, в литературной столице — городе Орле. С 2011 года работаю в Москве аналитиком информационной безопасности. Увлекаюсь дизайном, архитектурой, люблю бег и много путешествую по России. С 2021 года погрузился в веб-разработку</p>
                    <a className="about-me__link" href="https://github.com/uvaleks" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__profile-pic" src={profilePic} alt="Фотография Алексея"/>
            </div>
        </section>
  );
}