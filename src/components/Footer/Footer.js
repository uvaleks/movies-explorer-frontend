import './Footer.css';

export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</div>
        <div className="footer__bar">
          <p className="footer__copyright">© 2024</p>
          <div className="footer__links">
            <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className="footer__link" href="https://github.com/uvaleks" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
      </footer>      
  );
}