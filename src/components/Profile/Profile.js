import { useNavigate } from "react-router-dom";
import './Profile.css';

export default function Profile({ setAuthorized }) {
    const navigate = useNavigate();

    function onSignout() {
        navigate('/');
        setAuthorized(false);
    }

    return (
        <div className="profile">
            <form className="profile__form"> 
                    <h2 className="profile__greeting">Привет, Виталий!</h2>
                    <div className="profile__input-container">Имя
                        <input
                            className="profile__input"
                            value="Виталий"
                            id="name"
                            name="name"
                            type="text"
                            required
                        />
                    </div>
                    <div className="profile__input-container">E-mail
                        <input
                            className="profile__input"
                            value="pochta@yandex.ru"
                            id="name"
                            name="name"
                            type="text"
                            required
                        />
                    </div>
                    <button className="profile__submit-button profile__submit-button_edit" type="submit">Редактировать</button>
                    <button onClick={onSignout} className="profile__submit-button profile__submit-button_quit" type="submit">Выйти из аккаунта</button>
            </form>
        </div>
  );
}