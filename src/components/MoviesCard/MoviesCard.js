import './MoviesCard.css';
import posterImage from '../../images/poster.png';

export default function MoviesCard({ isSaved, isInSearchResults }) {
    return (
        <article className="movies-card">
            <img className="movies-card__poster" src={posterImage} alt='Poster'/>
            {(isInSearchResults && isSaved)
            ? <button className="movies-card__action-button movies-card__action-button_unsave" type="button" aria-label="Сохранено"></button>
            : ( isInSearchResults
                ? <button className="movies-card__action-button movies-card__action-button_save" type="button" aria-label="Сохранить">Сохранить</button>
                : <button className="movies-card__action-button movies-card__action-button_delete" type="button" aria-label="Удалить"></button>)
            }
            <div className="movies-card__bar">
                <h2 className="movies-card__title">33 слова о дизайне</h2>
                <p className="movies-card__duration">1ч 17м</p>
            </div>
        </article>
  );
}