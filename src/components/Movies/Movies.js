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

  const [moviesToRrender, setMoviesToRrender] = useState([]);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(0);
  const [visibleElements, setVisibleElements] = useState([]);

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
  }, []);

  useEffect(() => {
    if (searchInput !== '')
    setMoviesToRrender(prev => movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase())));
    if (isShorts) {
      setMoviesToRrender(prev => prev.filter(movie => movie.duration <= Constants.SHORTS_DURATION));
    }
  }, [searchInput, isShorts]);

  useEffect(() => {
    setRenderedMoviesCount(moviesToRrender.length);
  }, [moviesToRrender]);

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

  const handleMore = () => {
    setDisplayedElements(Number(displayedElements) + Number(displayedElementsIncrement));
  }

  useEffect(() => {
    if (renderedMoviesCount > displayedElements) {
      setVisibleElements(prev => moviesToRrender.slice(0, displayedElements));
    } else {
      setVisibleElements(prev => moviesToRrender);
    }
  }, [displayedElements, moviesToRrender, renderedMoviesCount]);

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
            isNothingFound={((searchInput !== '') && (renderedMoviesCount === 0)) && (!isLoading) && true}
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
          {(displayedElements < renderedMoviesCount) && <More
            onMore={handleMore}
          />}
        </section>     
  );
}