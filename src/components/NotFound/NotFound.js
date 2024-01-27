import { useNavigate } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1, { replace: true });
    }

    return (
        <div className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
            </div>
            <button onClick={goBack} className="not-found__back-button">Назад</button>
        </div>
  );
}