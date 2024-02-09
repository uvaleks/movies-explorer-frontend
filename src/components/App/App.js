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
import './App.css';

function App() {    
    const [currentUser, setCurrentUser] = useState({});
    const [beatfilmMovies, setBeatfilmMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isAuthorized, setAuthorized] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
          setLoggedIn(true);
          navigate('/movies');
        } else {
          setLoggedIn(false);
        };
      }, []);

    useEffect(() => {
        if (isLoggedIn) {

            auth.getUserInfo()
                .then((userObject) => {
                if (userObject) {
                    setCurrentUser(userObject);
                    setAuthorized(true);
                    navigate('/movies');
                }
                })
                .catch(console.error);
      
            MoviesApi.getMovies()
                .then((res) => {
                    setBeatfilmMovies(res);
                    getSavedMovies();
                })
                .catch(err => console.log(err))
        }
    }, [isLoggedIn]);

    const getSavedMovies = () => {
        MainApi.getSavedMovies()
        .then((res) => {
            console.log('Trying to set Saved Movies', res);
            setSavedMovies(res);
            
        })
        .catch(err => console.log(err));
    }
      
    const markObjects = () => {
        console.log('Saved Movies was set', savedMovies);
        console.log('Beatfilm Movies', beatfilmMovies);
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
            console.log('Marked Movies', markedMovies);
        }
    };
    
    useEffect(() => {     
        markObjects();
    }, [savedMovies]);

    const saveMovie = (movie) => {
        MainApi.postSavedMovie(movie)
            .then((res) => {
                console.log(savedMovies)
                if (res) {
                    // setMovies((state) => state.map((item) => {
                    //     if (item.id === res.movieId) {
                    //         return {...item, _id: res._id, saved: true};
                    //     } else {
                    //         return {...item};
                    //     }
                    // }));
                    if (!savedMovies.find(item => item.movieId === res.movieId)) {
                        setSavedMovies((state) => [...state, res]);
                    }
                }        
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log('EFFECT OF CHANGE', movies);
    }, [movies])
    

    const deleteMovie = (id) => {
        console.log(id)
        const movieToMarkDeleted = savedMovies.find(movie => movie.movieId === id);
        movieToMarkDeleted && MainApi.deleteMovie(movieToMarkDeleted._id)
        .then((res) => {
            if (res.acknowledged === true) {
                // setMovies((state) => state.map((item) => {
                //     console.log(item.id);
                //     console.log(item.id === id);
                //     if (item.id === id) {
                //         return {...item, saved: false};
                //     } else {
                //         return {...item};
                //     }
                // }));
                setSavedMovies((state) => state.filter((item) => item.movieId !== id));
                // setSavedMovies((state) => state.map((item) => {
                //     if (item.id === id) {
                //         return {...item, _id: res._id, saved: false};
                //     } else {
                //         return {...item};
                //     }
                // }));

                
                // console.log(movies);
            }
        })
        .catch(err => console.log(err))
    }

    const onRegister = (inputFields) => {
        return auth.register(inputFields)
        .then((res) => {
          return res;
        })
        .catch((err) => {
            if (err === 'Ошибка 400') {
                setErrorMessage('Пользователь с таким email уже существует')
            } else {
            console.log(err)
            }
        })
    };

    const onLogin = (inputFields) => {
        return auth.authorize(inputFields)
        .then((res) => {
            if (res.message === 'Всё верно!') {
                localStorage.set('loggedInUserId', res._id);
                setLoggedIn(true);
            }
        })
        .catch((err) => {
            if (err === 'Ошибка 401') {
                setErrorMessage('Неверный email или пароль')
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
                setAuthorized(false);
                setLoggedIn(false);
                localStorage.removeItem('results');
                localStorage.removeItem('query');
                localStorage.removeItem('isShorts');
                navigate('/')
            }})
        .catch(console.error);
    };

    function handleUpdateUser({name, email}) {
          return MainApi.patchUserInfo({ name, email }).then(setCurrentUser);
    }

    const formatDuration = (durationInMinutes) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedDuration = (hours && hours + "ч ") + minutes + "м";
    
        return formattedDuration; 
    }

    function SearchMovies() {
        return (
            <>
                <Header
                    isOnMain={false}
                    isAuthorized={isAuthorized}
                    />
                <main>
                    <Movies
                        isLoading={isLoading}
                        saveMovie={saveMovie}
                        formatDuration={formatDuration}
                        onDelete={deleteMovie}
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
                    isAuthorized={isAuthorized} 
                    />
                <main>
                    <SavedMovies
                        formatDuration={formatDuration}
                        onDelete={deleteMovie}
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
                    isAuthorized={isAuthorized}
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
                                    isAuthorized={isAuthorized}
                                />
                                <Main/>
                                <Footer/>
                                </>
                            } />
                            <Route 
                                path="/movies" 
                                element={
                                    <ProtectedRoute
                                        isAuthorized={isAuthorized}
                                        component={SearchMovies}
                                    />
                            } />
                            <Route path="/saved-movies" element={
                                <ProtectedRoute
                                    isAuthorized={isAuthorized}
                                    component={SavedMoviesPage}
                                />
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute
                                    isAuthorized={isAuthorized}
                                    component={ProfilePage}
                                />
                            } />
                            <Route path="/signin" element={
                                <Login
                                    onLogin={onLogin}
                                    setAuthorized={setAuthorized}
                                />
                            } />
                            <Route path="/signup" element={
                                <Register
                                    onRegister={onRegister}
                                />
                            } />
                        </Routes>
                    </div>  
                </SavedMoviesContext.Provider>
            </MoviesContext.Provider>
        </CurrentUserContext.Provider>  
    );
}

export default withRouter(App);
