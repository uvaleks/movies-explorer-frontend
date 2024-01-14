import SearchForm from './SearchFrom/SearchFrom';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './Movies.css';

export default function Movies() {
    return (
        <section className='movies'>
          {/* <SearchForm/>
          <Preloader/> */}
          <MoviesCardList>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={true}/>
            <MoviesCard isInSearchResults={true} isSaved={true}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
            <MoviesCard isInSearchResults={true} isSaved={false}/>
          </MoviesCardList>
        </section>     
  );
}