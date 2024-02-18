import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';

export default function Movies({ goSearch, isLoading, saveMovie, formatDuration, onDelete, setErrorMessage }) {
  const movies = React.useContext(MoviesContext);

  const [moviesToRrender, setMoviesToRrender] = useState([]);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(0);
  const [visibleElements, setVisibleElements] = useState([]);

  const [maxDisplayedElements, setMaxDisplayedElements] = useState(12);
  const [displayedElementsIncrement, setDisplayedElementsIncrement] = useState(3);

  const [isShorts, setShorts] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setMoviesToRrender(prev => movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase())));
    if (isShorts) {
      setMoviesToRrender(prev => prev.filter(movie => movie.duration < 41));
    }
    console.log(maxDisplayedElements);
  }, [searchInput, isShorts]);

  useEffect(() => {
    setRenderedMoviesCount(moviesToRrender.length);
  }, [moviesToRrender]);

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

  // useEffect(() => {
  //   setNothingFound(false);
  //   console.log('searchInput: ', searchInput);
  //   console.log('isShorts: ', isShorts);
  //   console.log('isShorts Boolean: ', Boolean(isShorts));
  //   console.log('movies: ', movies);
  //   if (searchInput) {
  //     const includesQuery = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase()));
  //     setSearchedMovies((state) => movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase())));
  //     localStorage.setItem('query', searchInput);
  //     localStorage.setItem('results', JSON.stringify(includesQuery));
  //     console.log('searchedMovies: ', searchedMovies);
  //     if (Boolean(isShorts)) {
  //       const shortsIncludesQuery = includesQuery.filter(movie => movie.duration < 41);
  //       setSearchedMovies((state) => includesQuery.filter(movie => movie.duration < 41));
  //       localStorage.setItem('results', JSON.stringify(shortsIncludesQuery));
  //       console.log('searchedMovies: ', searchedMovies);
  //     } 
  //   } else if (isNothingFound) {
  //     setErrorMessage('Нужно ввести ключевое слово');
  //     setSearchedMovies([]);
  //     setNothingFound(true);
  //     localStorage.setItem('query', searchInput);
  //   };
  // }, [searchInput]);

  useEffect(() => {
    let timeoutId;
    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 768) {
          setMaxDisplayedElements(12);
          setDisplayedElementsIncrement(3);
        } else if ((windowWidth <= 768) && (windowWidth > 480)) {
          setMaxDisplayedElements(8);
          setDisplayedElementsIncrement(2);
        } else if (windowWidth <= 480) {
          setMaxDisplayedElements(5);
          setDisplayedElementsIncrement(2);
        }
      }, 200);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMore = () => {
      setMaxDisplayedElements(maxDisplayedElements + displayedElementsIncrement)
  }

  useEffect(() => {
    console.log('moviesToRrender: ', moviesToRrender)
    console.log('maxDisplayedElements: ', maxDisplayedElements)
    if (renderedMoviesCount > maxDisplayedElements) {
      console.log('SLICED')
      setVisibleElements(prev => moviesToRrender.slice(0, maxDisplayedElements));
    } else {
      console.log('NOT SLICED')
      setVisibleElements(prev => moviesToRrender);
    }
    console.log('visibleElements: ', visibleElements)
  }, [maxDisplayedElements, moviesToRrender]);

    return (
        <section className='movies'>
          <SearchForm
            goSearch={goSearch}
            setSearchInput={setSearchInput}
            isShorts={isShorts}
            setShorts={setShorts}
            isSavedMoviesPage={false}
            setErrorMessage={setErrorMessage}
          />
          <MoviesCardList
            isNothingFound={((searchInput !== '') && (renderedMoviesCount === 0)) && true}
          >
              {visibleElements && visibleElements.map((movie) => 
                <MoviesCard
                    key={movie.id.toString()}
                    isInSearchResults={true} 
                    title={movie.nameRU}
                    duration={formatDuration(movie.duration)}
                    poster={'https://api.nomoreparties.co' + movie.image.url}
                    trailerLink={movie.trailerLink}
                    movieId={movie.id}
                    onSave={onSave}
                    isSaved={movie.saved}
                    onDelete={onDelete}
                  />
              )}
          </MoviesCardList>
          {isLoading && <Preloader/>}
          {(maxDisplayedElements < renderedMoviesCount) && <More
            onMore={handleMore}
          />}
        </section>     
  );
}