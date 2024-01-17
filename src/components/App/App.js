import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Login from '../Login/Login'
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
            <Login/>
            {(page === 'main') &&
                <>
                <Header
                    page={page}
                    onMainClick={onMainClick}
                    onMoviesClick={onMoviesClick}
                    onSavedMoviesClick={onSavedMoviesClick}
                />
                <Main/>
                <Footer/>
                </>
            }
            {(page === 'movies') &&
                <>
                <Header
                    page={page}
                    onMainClick={onMainClick}
                    onMoviesClick={onMoviesClick}
                    onSavedMoviesClick={onSavedMoviesClick}
                />
                <Movies/>
                <Footer/>
                </>
            }
            {(page === 'saved-movies') &&
                <>
                <Header
                    page={page}
                    onMainClick={onMainClick}
                    onMoviesClick={onMoviesClick}
                    onSavedMoviesClick={onSavedMoviesClick}
                />
                <SavedMovies/>
                <Movies/>
                <Footer/>
                </>
            }
        </div>     
  );
}