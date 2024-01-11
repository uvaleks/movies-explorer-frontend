import './AboutMe.css';
import '../Main.css';
import profilePic from '../../../images/profile-pic.png';

export default function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="main__section-heading">Студент</h2>
            <div className="about-me__profile-wrapper">
                <div className="about-me__profile">
                    <h3 className="about-me__name">Алексей</h3>
                    <p className="about-me__description">Веб-разработчик, 34 года</p>
                    <p className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="about-me__link" href="https://github.com/uvaleks" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__profile-pic" src={profilePic} alt="Profile"/>
            </div>
        </section>
  );
}