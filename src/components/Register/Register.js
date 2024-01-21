import { Link, useNavigate} from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';

export default function Register() {
    const navigate = useNavigate();

    function onLoginClick() {
        navigate('/signin');
    }

    return (
        <div className="register">
            <div className="register__container">
                <Logo/>
                <form className="register__form"> 
                    <h2 className="register__greeting">Добро пожаловать!</h2>
                    <p className="register__input-title">Имя</p>
                    <input
                        className="register__input"
                        value="Виталий"
                        id="name"
                        name="name"
                        type="text"
                        required
                    />
                    <span className="register__input-error"></span>
                    <p className="register__input-title ">E-mail</p>
                    <input
                        className="register__input"
                        value="pochta@yandex.ru|"
                        id="email"
                        name="email"
                        type="email"
                        required
                    />
                    <span className="register__input-error"></span>
                    <p className="register__input-title">Пароль</p>
                    <input className="register__input register__input_wrong"
                        value="••••••••••••••"
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                    <span className="register__input-error">Что-то пошло не так...</span>
                    <button onClick={onLoginClick} className="register__submit-button" type="submit">Зарегистрироваться</button>
                </form>
                <div className="register__hint-container">
                    <p className="register__hint">Уже зарегистрированы?</p>
                    <Link to='/signin' className="register__link">Войти</Link>
                </div>
            </div>
        </div>
  );
}