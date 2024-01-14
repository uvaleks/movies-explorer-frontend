import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './SavedMovies.css';

export default function SavedMovies() {
    return (
        <section className='saved-movies'>
          <MoviesCardList>
            <MoviesCard isInSearchResults={false} isSaved={true}/>
            <MoviesCard isInSearchResults={false} isSaved={true}/>
            <MoviesCard isInSearchResults={false} isSaved={true}/>
          </MoviesCardList>
        </section>     
  );
}