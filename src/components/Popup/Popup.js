import popupErrorImg from '../../images/popup-error.svg';
import popupOkImg from '../../images/popup-ok.svg';
import { useEffect } from "react";
import './Popup.css';

const Popup = ({ isOpen, onClose, message, type }) => {

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)

    }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={`popup${isOpen ? " popup_opened" : ""}`}
      onClick={handleOverlay}
    >
        <div className="popup__container">
          <img className="popup__status-icon" src={type === 'error' ? popupErrorImg : popupOkImg} alt={type === 'error' ? 'Ошибка' : 'Успех'}/>
          <h2 className="popup__title">{message}</h2>
          <button
            className='popup__close-button'
            type='button'
            onClick={onClose}
            aria-label="Закрыть"
          />
      </div>
    </div>
  );
};

export default Popup;

