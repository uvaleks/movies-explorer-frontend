import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchFrom/SearchFrom';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';

export default function Movies({ isLoading, saveMovie, formatDuration }) {
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
    if (JSON.parse(localStorage.getItem('results')) !== null) {
      setSearchedMovies(JSON.parse(localStorage.getItem('results')));
  };
  }, []);


  useEffect(() => {
    if (query) {
      const includesQuery = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()));
      setSearchedMovies(includesQuery);
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
        localStorage.setItem('results', JSON.stringify(shortsFromAll));
    } else {
      setSearchedMovies(movies);
      localStorage.setItem('query', query);
    };
  }, [query, isShorts]);

  useEffect(() => {
    const markObjects = () => {
      const markedMovies = movies.map(obj => {
        if (savedMovies.some(item => item.movieId === obj.id)) {
          return { ...obj, saved: true };
        } else {
          return obj;
        }
      });
      setSearchedMovies(markedMovies);
    };
      markObjects();
  }, [savedMovies]);

  const [maxDisplayedElements, setMaxDisplayedElements] = useState(12);
  const [displayedElementsIncrement, setDisplayedElementsIncrement] = useState(3);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [visibleElements, setVisibleElements] = useState([]);

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
      }, 200); // задержка в миллисекундах
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
    setVisibleElements(searchedMovies.slice(0, maxDisplayedElements));
  }, [searchedMovies, maxDisplayedElements]);

    return (
        <section className='movies'>
          <SearchForm
            setQuery={setQuery}
            setShorts={setShorts}
            isSavedMoviesPage={false}
          />
          <MoviesCardList
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          >
            {visibleElements && visibleElements.map((movie) => (
              <MoviesCard
                isInSearchResults={true} 
                title={movie.nameRU}
                duration={formatDuration(movie.duration)}
                poster={'https://api.nomoreparties.co' + movie.image.url}
                movieId={movie.id}
                onSave={onSave}
                isSaved={movie.saved}
              />
            ))}
          </MoviesCardList>
          {isLoading && <Preloader/>}
          {!(maxDisplayedElements >= searchedMovies.length) && <More
            onMore={handleMore}
          />}
        </section>     
  );
}