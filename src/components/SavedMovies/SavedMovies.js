import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({ goSearch, formatDuration, onDelete, setPopupMessage }) {
  const movies = React.useContext(MoviesContext);
  
  const [isShorts, setShorts] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [moviesToRrender, setMoviesToRrender] = useState(movies);

  useEffect(() => {
    if (searchInput !== '')
    setMoviesToRrender(prev => movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase())));
    if (isShorts) {
      setMoviesToRrender(prev => prev.filter(movie => movie.duration < 41));
    }
  }, [searchInput, isShorts, movies]);

    return (
        <section className='saved-movies'>
          <SearchForm
            isShorts={isShorts}
            setShorts={setShorts}
            isSavedMoviesPage={true}
            goSearch={goSearch}
            setSearchInput={setSearchInput}
            setPopupMessage={setPopupMessage}
          />
          <MoviesCardList>
            {moviesToRrender && moviesToRrender.map((movie) => (
              movie.saved 
              ? <MoviesCard
                  key={movie.id.toString()}
                  isInSearchResults={false} 
                  title={movie.nameRU}
                  duration={formatDuration(movie.duration)}
                  poster={'https://api.nomoreparties.co' + movie.image.url}
                  trailerLink={movie.trailerLink}
                  movieId={movie.id}
                  isSaved={movie.saved}
                  onDelete={onDelete}
                />
              : <></>
            ))}
          </MoviesCardList>
        </section>     
  );
}