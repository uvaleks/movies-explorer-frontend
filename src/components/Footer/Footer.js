import './Footer.css';

export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</div>
        <div className="footer__bar">
          <p className="footer__copyright">© 2024</p>
          <div className="footer__links">
            <p className="footer__link">Яндекс.Практикум</p>
            <p className="footer__link">Github</p>
          </div>
        </div>
      </footer>      
  );
}