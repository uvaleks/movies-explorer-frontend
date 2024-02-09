import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';

export default function Movies({ isLoading, saveMovie, formatDuration, onDelete }) {
  const movies = React.useContext(MoviesContext);

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isShorts, setShorts] = useState(false);
  const [isNothingFound, setNothingFound] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [visibleElements, setVisibleElements] = useState([]);


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
    setNothingFound(false);
    if (searchInput) {
      const includesQuery = movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInput.toLowerCase()));
      setSearchedMovies(includesQuery);
      localStorage.setItem('query', searchInput);
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
      setSearchedMovies([]);
      setNothingFound(true);
      localStorage.setItem('query', searchInput);
    };
  }, [searchInput, isShorts, movies]);

  

  const [maxDisplayedElements, setMaxDisplayedElements] = useState(12);
  const [displayedElementsIncrement, setDisplayedElementsIncrement] = useState(3);

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
    setVisibleElements(searchedMovies.slice(0, maxDisplayedElements));
  }, [searchedMovies, maxDisplayedElements]);

    return (
        <section className='movies'>
          <SearchForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setShorts={setShorts}
            isSavedMoviesPage={false}
          />
          <MoviesCardList
            isNothingFound={isNothingFound}
          >
            {movies && movies.map((movie) => (
              <MoviesCard
                key={movie.id}
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
            ))}
          </MoviesCardList>
          {isLoading && <Preloader/>}
          {!(maxDisplayedElements >= searchedMovies.length) && <More
            onMore={handleMore}
          />}
        </section>     
  );
}