import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import * as Constants from '../../constants/constants';

export default function Movies({ goSearch, isLoading, saveMovie, formatDuration, onDelete, setPopupMessage, setPopupType }) {
  const movies = React.useContext(MoviesContext);

  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('results')));
  const [visibleElements, setVisibleElements] = useState(filteredMovies);

  const [displayedElements, setDisplayedElements] = useState(0);
  const [displayedElementsIncrement, setDisplayedElementsIncrement] = useState(3);

  const [isShorts, setShorts] = useState(Boolean(localStorage.getItem('isShorts')));
  const [searchInput, setSearchInput] = useState(localStorage.getItem('query'));

  useEffect(() => {
    const windowWidth = window.innerWidth;
      if (windowWidth > Constants.MIDDLE_SCREEN_WIDTH) {
        setDisplayedElements(Constants.MOVIES_AT_BIG_SCREEN_BY_DEFAULT);
        setDisplayedElementsIncrement(Constants.MOVIES_AT_BIG_SCREEN_INCREMENT);
      } else if ((windowWidth <= Constants.MIDDLE_SCREEN_WIDTH) && (windowWidth > Constants.SMALL_SCREEN_WIDTH)) {
        setDisplayedElements(Constants.MOVIES_AT_MIDDLE_SCREEN_BY_DEFAULT);
        setDisplayedElementsIncrement(Constants.MOVIES_AT_MIDDLE_SCREEN_INCREMENT);
      } else if (windowWidth <= Constants.SMALL_SCREEN_WIDTH) {
        setDisplayedElements(Constants.MOVIES_AT_SMALL_SCREEN_BY_DEFAULT);
        setDisplayedElementsIncrement(Constants.MOVIES_AT_SMALL_SCREEN_INCREMENT);
      }
  }, [searchInput, isShorts]);

  useEffect(() => {
    if (movies) {
      let tempFilteredMovies;
      if (searchInput !== null && searchInput !== '') {
        tempFilteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase()));
        localStorage.setItem('results', JSON.stringify(tempFilteredMovies));
        setFilteredMovies(prev => tempFilteredMovies);
        if (isShorts) {
          tempFilteredMovies = tempFilteredMovies.filter(movie => movie.duration <= Constants.SHORTS_DURATION);
          localStorage.setItem('results', JSON.stringify(tempFilteredMovies));
          setFilteredMovies(prev => tempFilteredMovies);
        }
      }
    }
  }, [searchInput, isShorts, movies]);

  useEffect(() => {
    let timeoutId;
    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const windowWidth = window.innerWidth;
          if (windowWidth > Constants.MIDDLE_SCREEN_WIDTH) {
            setDisplayedElements(Constants.MOVIES_AT_BIG_SCREEN_BY_DEFAULT);
            setDisplayedElementsIncrement(Constants.MOVIES_AT_BIG_SCREEN_INCREMENT);
          } else if ((windowWidth <= Constants.MIDDLE_SCREEN_WIDTH) && (windowWidth > Constants.SMALL_SCREEN_WIDTH)) {
            setDisplayedElements(Constants.MOVIES_AT_MIDDLE_SCREEN_BY_DEFAULT);
            setDisplayedElementsIncrement(Constants.MOVIES_AT_MIDDLE_SCREEN_INCREMENT);
          } else if (windowWidth <= Constants.SMALL_SCREEN_WIDTH) {
            setDisplayedElements(Constants.MOVIES_AT_SMALL_SCREEN_BY_DEFAULT);
            setDisplayedElementsIncrement(Constants.MOVIES_AT_SMALL_SCREEN_INCREMENT);
          }
      }, Constants.RESIZE_LISTENER_TIMEOUT);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

useEffect(() => {
  let tempVisibleElements;
    if (filteredMovies && filteredMovies.length > displayedElements) {
      tempVisibleElements = filteredMovies.slice(0, displayedElements)
      setVisibleElements(prev => tempVisibleElements);
    } else {
      tempVisibleElements = filteredMovies;
      setVisibleElements(prev => tempVisibleElements);
    }
}, [displayedElements, filteredMovies]);

  const handleMore = () => {
    setDisplayedElements(Number(displayedElements) + Number(displayedElementsIncrement));
  }

    return (
        <section className='movies'>
          <SearchForm
            goSearch={goSearch}
            setSearchInput={setSearchInput}
            isShorts={isShorts}
            setShorts={setShorts}
            isSavedMoviesPage={false}
            setPopupMessage={setPopupMessage}
            setPopupType={setPopupType}
          />
          <MoviesCardList
            isNothingFound={(filteredMovies !== null && filteredMovies.length === 0 && searchInput !== '' && !isLoading) && true}
          >    
            {visibleElements && visibleElements.map((movie) => 
              <MoviesCard
                key={movie.id}
                isInSearchResults={true} 
                title={movie.nameRU}
                duration={formatDuration(movie.duration)}
                poster={'https://api.nomoreparties.co' + movie.image.url}
                trailerLink={movie.trailerLink}
                movieId={movie.id}
                onSave={saveMovie}
                isSaved={movie.saved}
                onDelete={onDelete}
              />
            )}
          </MoviesCardList>
          {isLoading && <Preloader/>}
          {(displayedElements < (filteredMovies ? filteredMovies.length : 0)) && <More
            onMore={handleMore}
          />}
        </section>     
  );
}