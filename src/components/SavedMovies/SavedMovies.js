import React from 'react'; 
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import * as Constants from '../../constants/constants';

export default function SavedMovies({ savedMovies, formatDuration, onDelete, setPopupMessage, setPopupType }) {
  
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShorts, setShorts] = useState(Boolean(localStorage.getItem('isShortsOnSavedPage')));
  const [searchInput, setSearchInput] = useState(localStorage.getItem('queryOnSavedPage'));

  useEffect(() => {
    let tempFilteredMovies;
    if ((searchInput !== null && searchInput !== '') && isShorts) {
      tempFilteredMovies = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase()));
      tempFilteredMovies = tempFilteredMovies.filter(movie => movie.duration <= Constants.SHORTS_DURATION)
      setFilteredMovies(prev => tempFilteredMovies);
    } else if (isShorts) {
      tempFilteredMovies = savedMovies.filter(movie => movie.duration <= Constants.SHORTS_DURATION)
      setFilteredMovies(prev => tempFilteredMovies);
    } else if (searchInput !== '' && searchInput !== null ) {
      tempFilteredMovies = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredMovies(prev => tempFilteredMovies);
    } else {
      setFilteredMovies(prev => savedMovies);
    }
  }, [searchInput, isShorts]);

    return (
        <section className='saved-movies'>
          <SearchForm
            isShorts={isShorts}
            setShorts={setShorts}
            isSavedMoviesPage={true}
            setSearchInput={setSearchInput}
            setPopupMessage={setPopupMessage}
            setPopupType={setPopupType}
          />
          <MoviesCardList
            isNothingFound={(filteredMovies !== null && filteredMovies.length === 0 && searchInput !== '' && savedMovies.length !== 0) && true}
            >
            {filteredMovies && filteredMovies.map((movie) => (
              <MoviesCard
                key={movie._id}
                isInSearchResults={false} 
                title={movie.nameRU}
                duration={formatDuration(movie.duration)}
                poster={movie.image}
                trailerLink={movie.trailerLink}
                movieId={movie.movieId}
                isSaved={movie.saved}
                onDelete={onDelete}
              />
            ))}
          </MoviesCardList>
        </section>     
  );
}