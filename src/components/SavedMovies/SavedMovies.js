import React from 'react'; 
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MoviesContext } from '../../contexts/MoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchFrom/SearchFrom';
import './SavedMovies.css';

export default function SavedMovies({ formatDuration, onDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const savedMovies = React.useContext(SavedMoviesContext);

  const [savedMoviesQuery, setSavedMoviesQuery] = useState('');
  const [searchedSavedMovies, setSearchedSavedMovies] = useState(savedMovies);
  const [isSavedShorts, setSavedShorts] = useState(false);

  useEffect(() => {
    if (savedMoviesQuery) {
      const includesQuery = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(savedMoviesQuery.toLowerCase()));
      if (isSavedShorts) {
        const shortsIncludesQuery = includesQuery.filter(movie => movie.duration < 41);
        setSearchedSavedMovies(shortsIncludesQuery);
      } else setSearchedSavedMovies(includesQuery);
    } else if (isSavedShorts) {
      const shortsFromSaved = savedMovies.filter(movie => movie.duration < 41);
      setSearchedSavedMovies(shortsFromSaved);
    } else setSearchedSavedMovies(savedMovies)
  }, [savedMoviesQuery, isSavedShorts]);

    return (
        <section className='saved-movies'>
          <SearchForm
            setQuery={setSavedMoviesQuery}
            isShorts={isSavedShorts}
            setShorts={setSavedShorts}
            isSavedMoviesPage={true}
          />
          <MoviesCardList>
            {searchedSavedMovies && searchedSavedMovies.map((movie) => (
              <MoviesCard
                isInSearchResults={false} 
                isSaved={true}
                title={movie.nameRU}
                duration={formatDuration(movie.duration)}
                poster={movie.image}
                movieId={movie.movieId}
                id={movie._id}
                onDelete={onDelete}
              />
            ))}
          </MoviesCardList>
        </section>     
  );
}