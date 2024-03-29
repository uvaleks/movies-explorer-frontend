import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__heading">Портфолио</h3>
            <ul className="portfolio__projects">
                <li><a className="portfolio__link" href="https://uvaleks.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт<span className="portfolio__arrow">↗</span></a></li>
                <li><a className="portfolio__link" href="https://uvaleks.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт<span className="portfolio__arrow">↗</span></a></li>
                <li><a className="portfolio__link" href="https://madburatino.nomoredomainsmonster.ru" target="_blank" rel="noreferrer">Одностраничное приложение<span className="portfolio__arrow">↗</span></a></li>
            </ul>
        </section>    
  );
}