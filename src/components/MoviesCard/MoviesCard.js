import './MoviesCard.css';

export default function MoviesCard({ isInSearchResults, isSaved, title, duration, poster, id }) {
    return (
        <article className="movies-card">
            <img className="movies-card__poster" src={'https://api.nomoreparties.co/' + poster} alt={title}/>
            {(isInSearchResults && isSaved)
            ? <button className="movies-card__action-button movies-card__action-button_unsave" type="button" aria-label="Сохранено"></button>
            : ( isInSearchResults
                ? <button className="movies-card__action-button movies-card__action-button_save" type="button" aria-label="Сохранить">Сохранить</button>
                : <button className="movies-card__action-button movies-card__action-button_delete" type="button" aria-label="Удалить"></button>)
            }
            <div className="movies-card__bar">
                <h2 className="movies-card__title">{title}</h2>
                <p className="movies-card__duration">{duration}</p>
            </div>
        </article>
  );
}