import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import './App.css';
import { useState } from 'react';

export default function App() {    
    const [page, setPage] = useState('');
    const [isAuthorized, setAuthorized] = useState(false);

    function onProfileClick() {
        setPage('profile');
    }

    function onLoginClick() {
        setPage('login');
    }

    function onRegisterClick() {
        setPage('register');
    }

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
            {(page === 'register') &&
                <Register
                    onLoginClick={onLoginClick}
                />
            }
            {(page === '' || page === 'login') &&
                <Login
                    onRegisterClick={onRegisterClick}
                    onMainClick={onMainClick}
                    setAuthorized={setAuthorized}
                />
            }
            {(page === 'profile') &&
                <>
                <Header
                    page={page}
                    isAuthorized={isAuthorized}
                    onMainClick={onMainClick}
                    onMoviesClick={onMoviesClick}
                    onSavedMoviesClick={onSavedMoviesClick}
                />
                <Profile
                    onMainClick={onMainClick}
                    setAuthorized={setAuthorized}
                />
                </>
            }
            {(page === 'main') &&
                <>
                <Header
                    page={page}
                    isAuthorized={isAuthorized}
                    onLoginClick={onLoginClick}
                    onRegisterClick={onRegisterClick}
                    onProfileClick={onProfileClick}
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
                    isAuthorized={isAuthorized}
                    onLoginClick={onLoginClick}
                    onRegisterClick={onRegisterClick}
                    onProfileClick={onProfileClick}
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
                    isAuthorized={isAuthorized}
                    onLoginClick={onLoginClick}
                    onRegisterClick={onRegisterClick}
                    onProfileClick={onProfileClick}
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