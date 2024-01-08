import './Navigation.css';
//import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="navigation__bar">
                <p className="navigation__link navigation__link_current" href="#">Фильмы</p>
                <p className="navigation__link" href="#">Сохранённые фильмы</p>
            </div>
            <div className="navigation__button">
                <p className="navigation__link" href="#">Аккаунт</p>
                <div className="navigation__profile-icon" title="Профиль"></div>
            </div>
        </nav>     
    );
}