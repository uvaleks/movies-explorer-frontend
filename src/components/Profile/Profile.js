import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Profile.css';

export default function Profile({ setAuthorized }) {
    const [name, setName] = useState('Виталий');
    const [email, setEmail] = useState('pochta@yandex.ru');

    const [isButtonInEditState, setButtonInEditState] = useState(true);
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    useEffect(() => {
        if (email === '' || name === '') {
            setSubmitButtonDisabled(true);
        } else {
            setSubmitButtonDisabled(false);
        }
    }, [name, email]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonInEditState(!isButtonInEditState)
    }

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
                            value={name}
                            onChange={handleNameChange}
                            type="text"
                            required
                        />
                    </div>
                    <div className="profile__input-container">E-mail
                        <input
                            className="profile__input"
                            value={email}
                            onChange={handleEmailChange}
                            type="text"
                            required
                        />
                    </div>
                    <p className="profile__error">{!isButtonInEditState ? "При обновлении профиля произошла ошибка." : ""}</p>
                    <button 
                        onClick={handleSubmit}
                        className={(isButtonInEditState ? "profile__edit-button" : "profile__submit-button") + ((!isButtonInEditState && isSubmitButtonDisabled) ? " profile__submit-button_disabled" : "")}
                        disabled={isSubmitButtonDisabled}
                        type="submit"
                    >{(isButtonInEditState ? "Редактировать" : "Сохранить")}</button>
                    {isButtonInEditState && 
                        <button onClick={onSignout} className="profile__quit-button" type="button">Выйти из аккаунта</button>
                    }
            </form>
        </div>
  );
}