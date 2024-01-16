import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import './App.css';
import { useState } from 'react';

export default function App() {    
    const [page, setPage] = useState('main');

    function onMainClick() {
        setPage('main');
    }

    function onMoviesClick() {
        setPage('movies');
    }

    function onSavedMoviesClick() {
        setPage('saved-movies');
    }

    return (
        <div className='page'>
            <Header
                page={page}
                onMainClick={onMainClick}
                onMoviesClick={onMoviesClick}
                onSavedMoviesClick={onSavedMoviesClick}
            />
            {(page === 'main') && <Main/>}
            {(page === 'movies') && <Movies/>}
            {(page === 'saved-movies') && <SavedMovies/>}
            <Footer/>
        </div>     
  );
}