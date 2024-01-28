import React from 'react'; 
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchFrom/SearchFrom';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function Movies() {
  const currentUser = React.useContext(CurrentUserContext);
  const movies = React.useContext(MoviesContext);
  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isShorts, setShorts] = useState(false);

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const formattedDuration = (hours && hours + "ч ") + minutes + "м";

    return formattedDuration; 
  }

  useEffect(() => {
    if (query) {
      const includesQuery = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()));
      if (isShorts) {
        const shortsIncludesQuery = includesQuery.filter(movie => movie.duration < 41);
        setSearchedMovies(shortsIncludesQuery);
      } else setSearchedMovies(includesQuery);
    }
  }, [query, isShorts]);


    return (
        <section className='movies'>
          <SearchForm 
            setQuery={setQuery}
            isShorts={isShorts}
            setShorts={setShorts}
          />
          <Preloader/>
          <MoviesCardList>
            {searchedMovies.map((movie) => (
              <MoviesCard
                isInSearchResults={true} 
                isSaved={false}
                title={movie.nameRU}
                duration={formatDuration(movie.duration)}
                poster={movie.image.url}
                id={movie.id}
              />
            ))}
          </MoviesCardList>
        </section>     
  );
}