import './MoviesCard.css';

export default function MoviesCard({ isInSearchResults, isSaved, title, duration, poster, trailerLink, movieId, onSave, onDelete }) {

    return (
        <a key={movieId.toString()} className="movies-card" href={trailerLink} target="_blank" rel="noreferrer">
            <img className="movies-card__poster" src={poster} alt={title}/>
            {(isInSearchResults && isSaved)
            ? <button onClick={(e) => {e.preventDefault(); onDelete(movieId)}} className="movies-card__action-button movies-card__action-button_unsave" type="button" aria-label="Удалить"></button>
            : ( isInSearchResults
                ? <button onClick={(e) => {e.preventDefault(); onSave(movieId)}} className="movies-card__action-button movies-card__action-button_save" type="button" aria-label="Сохранить">Сохранить</button>
                : <button onClick={(e) => {e.preventDefault(); onDelete(movieId)}} className="movies-card__action-button movies-card__action-button_delete" type="button" aria-label="Удалить"></button>)
            }
            <div className="movies-card__bar">
                <h2 className="movies-card__title">{title}</h2>
                <p className="movies-card__duration">{duration}</p>
            </div>
        </a>
  );
}