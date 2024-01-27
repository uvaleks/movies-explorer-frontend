import * as auth from '../../utils/auth';
import api from '../../utils/api';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
    const navigate = useNavigate();
    const [isAuthorized, setAuthorized] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isAuthorized) {
          api.getUserInfo()
            .then((userObject) => {
                console.log(userObject);
              setCurrentUser(userObject);
            })
            .catch(console.error);
        }
      }, [isAuthorized]);

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            setAuthorized(true);
            navigate('/movies');
        } else {
            setAuthorized(false);
        };
    }, [isAuthorized]);

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
                setAuthorized(true);
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
        if (isAuthorized) {
            localStorage.removeItem('loggedInUserId');
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setCurrentUser({});
            setAuthorized(false);
            navigate('/')
            }
    };

    function handleUpdateUser({name, email}) {
          return api.patchUserInfo({ name, email }).then(setCurrentUser);
    }

    function SearchPage() {
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
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
                                component={SearchPage}
                            />
                    } />
                    <Route path="/saved-movies" element={
                        <>
                        <Header
                            isOnMain={false}
                            isAuthorized={isAuthorized}
                        />
                        <main>
                            <SavedMovies/>
                            <Movies/>
                        </main>
                        <Footer/>
                        </>
                    } />
                    <Route path="/profile" element={
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
        </CurrentUserContext.Provider>  
    );
}

export default withRouter(App);
