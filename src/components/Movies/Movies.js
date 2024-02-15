import React from 'react'; 
import { MoviesContext } from '../../contexts/MoviesContext';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';

export default function Movies({ isLoading, saveMovie, formatDuration, onDelete, setErrorMessage }) {
  const movies = React.useContext(MoviesContext);

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
    setVisibleElements(movies.slice(0, maxDisplayedElements));
  }, [maxDisplayedElements]);

    return (
        <section className='movies'>
          <SearchForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setShorts={setShorts}
            isSavedMoviesPage={false}
            setErrorMessage={setErrorMessage}
          />
          <MoviesCardList
            isNothingFound={isNothingFound}
          >
              {movies && movies.map((movie) => (
                (movie.nameRU.toLowerCase().includes(searchInput.toLowerCase())) 
                ? (
                (Boolean(isShorts)) 
                ? (movie.duration < 41) &&
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
                : <MoviesCard
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
                  />)
                : <></>
              ))}
          </MoviesCardList>
          {isLoading && <Preloader/>}
          {/* {!(maxDisplayedElements >= searchedMovies.length) && <More
            onMore={handleMore}
          />} */}
        </section>     
  );
}