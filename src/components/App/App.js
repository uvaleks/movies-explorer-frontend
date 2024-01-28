import * as auth from '../../utils/auth';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MoviesContext } from '../../contexts/MoviesContext';
import ProtectedRoute from '../ProtectedRoute';
import { withRouter } from '../withRouter'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import More from '../More/More';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import './App.css';

function App() {    
    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isAuthorized, setAuthorized] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
            setTimeout(() => {
                auth.getUserInfo()
                .then((userObject) => {
                    if (userObject) {
                        setCurrentUser(userObject);
                        setAuthorized(true);
                        navigate('/movies');
                    }
                })
                .catch(console.error)
            }, 1000)
            setTimeout(() => {
                auth.getUserInfo()
                MoviesApi.getMovies()
                .then((res) => {
                    setMovies(res);
                })
                .catch(err => console.log(err))
            }, 2000)
        }
      }, [isLoggedIn]);

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
                localStorage.setItem('loggedInUserId', res._id);
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
                navigate('/')
            }})
        .catch(console.error);
    };

    function handleUpdateUser({name, email}) {
          return MainApi.patchUserInfo({ name, email }).then(setCurrentUser);
    }

    function SearchMovies() {
        return (
            <>
                <Header
                    isOnMain={false}
                    isAuthorized={isAuthorized}
                    />
                <main>
                    <Movies/>
                    <More/>
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
                    <SavedMovies/>
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
            </MoviesContext.Provider>
        </CurrentUserContext.Provider>  
    );
}

export default withRouter(App);
