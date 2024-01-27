import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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

export default function App() {    
    const [isAuthorized, setAuthorized] = useState(true);

    return (
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
                <Route path="/movies" element={
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
                        setAuthorized={setAuthorized}
                    />
                    </>
                } />
                <Route path="/signin" element={
                    <Login
                        setAuthorized={setAuthorized}
                    />
                } />
                <Route path="/signup" element={
                    <Register/>
                } />
            </Routes>
        </div>     
  );
}