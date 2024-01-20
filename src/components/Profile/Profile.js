import './Profile.css';

export default function Profile({ onMainClick, setAuthorized }) {
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
                    <button onClick={ () => { onMainClick(); setAuthorized(false) } } className="profile__submit-button profile__submit-button_quit" type="submit">Выйти из аккаунта</button>
            </form>
        </div>
  );
}