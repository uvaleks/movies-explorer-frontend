import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({ formatDuration, onDelete }) {
  const movies = React.useContext(MoviesContext);
  const [isShorts, setShorts] = useState(false);


    return (
        <section className='saved-movies'>
          <SearchForm
            setShorts={setShorts}
            isSavedMoviesPage={true}
          />
          <MoviesCardList>
            {movies && movies.map((movie) => (
              movie.saved 
              ? <MoviesCard
                key={movie.id}
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