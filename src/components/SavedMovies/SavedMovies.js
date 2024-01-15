import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchFrom/SearchFrom';
import './SavedMovies.css';

export default function SavedMovies() {
    return (
        <section className='saved-movies'>
          <SearchForm/>
          <MoviesCardList>
            <MoviesCard isInSearchResults={false} isSaved={true}/>
            <MoviesCard isInSearchResults={false} isSaved={true}/>
            <MoviesCard isInSearchResults={false} isSaved={true}/>
          </MoviesCardList>
        </section>     
  );
}