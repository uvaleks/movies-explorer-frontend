import * as auth from '../../utils/auth';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MoviesContext } from '../../contexts/MoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import ProtectedRoute from '../ProtectedRoute';
import { withRouter } from '../withRouter'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import './App.css';

function App() {    
    const [currentUser, setCurrentUser] = useState({});
    const [beatfilmMovies, setBeatfilmMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
          navigate('movies');
        } else {
          setLoggedIn(false);
        };
      }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            auth.getUserInfo()
                .then((userObject) => {
                if (userObject) {
                    setCurrentUser(userObject);
                }
                })
                .catch(console.error);
        }
    }, [isLoggedIn]);

    const goSearch = () => {
        if (movies.length === 0) {
            setIsLoading(true);
            MoviesApi.getMovies()
            .then((res) => {
                setBeatfilmMovies(res);
                getSavedMovies();
            })
            .catch(err => console.log(err))
        }
    }

    const getSavedMovies = () => {
        MainApi.getSavedMovies()
        .then((res) => {
            setSavedMovies(res);
        })
        .catch(err => console.log(err))
        .finally(setIsLoading(false));
    }
    
    useEffect(() => {     
        if (savedMovies) {
            const markedMovies = beatfilmMovies.map(obj => {
                const savedMovie = savedMovies.find(item => item.movieId === obj.id);
                if (savedMovie) {
                    return { ...obj, _id: savedMovie._id, saved: true };
                } else {
                    return { ...obj, saved: false };
                }
            });
            setMovies(markedMovies);
        }
    }, [savedMovies, beatfilmMovies]);

    const saveMovie = (idToSave) => {
        const movieToSave = movies.find(movie => movie.id === idToSave);

        MainApi.postSavedMovie({
            country: movieToSave.country,
            director: movieToSave.director,
            duration: movieToSave.duration,
            year: movieToSave.year,
            description: movieToSave.description,
            image: 'https://api.nomoreparties.co' + movieToSave.image.url,
            trailerLink: movieToSave.trailerLink,
            thumbnail: 'https://api.nomoreparties.co' + movieToSave.image.formats.thumbnail.url,
            movieId: movieToSave.id,
            nameRU: movieToSave.nameRU,
            nameEN: movieToSave.nameEN,
        })
        .then((res) => {
            if (res) {
                getSavedMovies();
            }        
        })
        .catch(err => console.log(err));
    }
    
    const deleteMovie = (id) => {
        const movieToMarkDeleted = savedMovies.find(movie => movie.movieId === id);
        movieToMarkDeleted && MainApi.deleteMovie(movieToMarkDeleted._id)
        .then((res) => {
            if (res.acknowledged === true) {
                setSavedMovies((state) => state.filter((item) => item.movieId !== id));
            }
        })
        .catch(err => console.log(err))
    }

    const onRegister = (inputFields) => {
        return auth.register(inputFields)
        .then((res) => {
            if (res._id) {
                onLogin({ email: inputFields.email, password: inputFields.password });
            }
        })
        .catch((err) => {
            if (err === 'Ошибка 400') {
                setPopupType('error');
                setPopupMessage('Пользователь с таким email уже существует');
            } else {
            console.log(err)
            }
        })
    };

    const onLogin = (inputFields) => {
        return auth.authorize(inputFields)
        .then((res) => {
            if (res.message === 'Всё верно!') {
                localStorage.setItem('loggedInUserId', res._id);
                setLoggedIn(true);
            }
        })
        .catch((err) => {
            if (err === 'Ошибка 401') {
                setPopupType('error');
                setPopupMessage('Неверный email или пароль');
            } else {
            console.log(err)
            }
        })
    };

    const onSignOut = () => {
        return auth.signout()
        .then((res) => {
            if (res.message === "Вы успешно вышли из системы") {
                localStorage.removeItem('loggedInUserId');
                setCurrentUser({});
                setLoggedIn(false);
                localStorage.removeItem('query');
                localStorage.removeItem('isShorts');
                navigate('/')
            }})
        .catch(console.error);
    };

    function handleUpdateUser({name, email}) {
        return MainApi.patchUserInfo({ name, email })
        .then(res => {
            if (res) {
                setCurrentUser(res);
                setPopupType('ok');
                setPopupMessage('Данные пользователя успешно обновлены')
            }
        })
        .catch(console.error);
    }

    const formatDuration = (durationInMinutes) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedDuration = (hours && hours + "ч ") + minutes + "м";
    
        return formattedDuration; 
    }

    const handleClosePopup = () => {
        setPopupOpen(false);
        setPopupMessage('');
    }

    useEffect(() => {
        if (popupMessage) {
            setPopupOpen(true);
        }
    }, [popupMessage])

    function SearchMovies() {
        return (
            <>
                <Header
                    isOnMain={false}
                    isAuthorized={isLoggedIn}
                    />
                <main>
                    <Movies
                        goSearch={goSearch}
                        isLoading={isLoading}
                        saveMovie={saveMovie}
                        formatDuration={formatDuration}
                        onDelete={deleteMovie}
                        setPopupMessage={setPopupMessage}
                        setPopupType={setPopupType}
                    />
                </main>
                <Footer/>
            </>
      );
    }

    function SavedMoviesPage() {
        return (
            <>
                <Header
                    isOnMain={false}
                    isAuthorized={isLoggedIn} 
                    />
                <main>
                    <SavedMovies
                        goSearch={goSearch}
                        formatDuration={formatDuration}
                        onDelete={deleteMovie}
                        setPopupMessage={setPopupMessage}
                    />
                </main>
                <Footer/>
            </>
      );
    }

    function ProfilePage() {
        return (
            <>
                <Header
                    isOnMain={false}
                    isAuthorized={isLoggedIn}
                />
                <Profile
                    handleUpdateUser={handleUpdateUser}
                    onSignOut={onSignOut}
                />
            </>
      );
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <MoviesContext.Provider value={movies}>
                <SavedMoviesContext.Provider value={savedMovies}>
                    <div className='page'>
                        <Routes>
                            <Route path="*" element={
                                <NotFound/>
                            } />
                            <Route path="/" element={
                                <>
                                <Header
                                    isOnMain={true}
                                    isAuthorized={isLoggedIn}
                                />
                                <Main/>
                                <Footer/>
                                </>
                            } />
                            <Route 
                                path="/movies" 
                                element={
                                    <ProtectedRoute
                                        isAuthorized={isLoggedIn}
                                        component={SearchMovies}
                                    />
                            } />
                            <Route path="/saved-movies" element={
                                <ProtectedRoute
                                    isAuthorized={isLoggedIn}
                                    component={SavedMoviesPage}
                                />
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute
                                    isAuthorized={isLoggedIn}
                                    component={ProfilePage}
                                />
                            } />
                            <Route path="/signin" element={
                                <Login
                                    onLogin={onLogin}
                                    setAuthorized={isLoggedIn}
                                />
                            } />
                            <Route path="/signup" element={
                                <Register
                                    onRegister={onRegister}
                                    setLoggedIn={setLoggedIn}
                                />
                            } />
                        </Routes>
                        <Popup 
                            isOpen={isPopupOpen}
                            onClose={handleClosePopup}
                            message={popupMessage}
                            type={popupType}
                        />
                    </div>  
                </SavedMoviesContext.Provider>
            </MoviesContext.Provider>
        </CurrentUserContext.Provider>  
    );
}

export default withRouter(App);
