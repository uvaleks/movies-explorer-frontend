import React from 'react'; 
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MoviesContext } from '../../contexts/MoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchFrom/SearchFrom';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function Movies({ saveMovie, formatDuration }) {
  const currentUser = React.useContext(CurrentUserContext);
  const movies = React.useContext(MoviesContext);
  const savedMovies = React.useContext(SavedMoviesContext);

  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isShorts, setShorts] = useState(false);

  const onSave = (idToSave) => {
    const movieToSave = movies.find(movie => movie.id === idToSave);
    saveMovie(transformMovie(movieToSave));
  }

  const transformMovie = (movie) => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
  };

  useEffect(() => {
    setSearchedMovies(JSON.parse(localStorage.getItem('results')));
  }, []);

  useEffect(() => {
    if (query) {
      const includesQuery = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()));
      localStorage.setItem('query', query);
      localStorage.setItem('results', JSON.stringify(includesQuery));
      if (isShorts) {
        const shortsIncludesQuery = includesQuery.filter(movie => movie.duration < 41);
        setSearchedMovies(shortsIncludesQuery);
        localStorage.setItem('results', JSON.stringify(shortsIncludesQuery));
      } 
    } else if (isShorts) {
        const shortsFromAll = movies.filter(movie => movie.duration < 41);
        setSearchedMovies(shortsFromAll);
    } else setSearchedMovies(movies)
  }, [query, isShorts]);

    return (
        <section className='movies'>
          <SearchForm 
            setQuery={setQuery}
            isShorts={isShorts}
            setShorts={setShorts}
            isSavedMoviesPage={false}
          />
          <Preloader/>
          <MoviesCardList>
            {searchedMovies && searchedMovies.map((movie) => (
              <MoviesCard
                isInSearchResults={true} 
                isSaved={false}
                title={movie.nameRU}
                duration={formatDuration(movie.duration)}
                poster={'https://api.nomoreparties.co' + movie.image.url}
                movieId={movie.id}
                onSave={onSave}
              />
            ))}
          </MoviesCardList>
        </section>     
  );
}