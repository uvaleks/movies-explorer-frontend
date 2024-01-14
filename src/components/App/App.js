import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import './App.css';

export default function App() {
    return (
        <div className='page'>
            <Header/>
            <Main/>
            <Movies/>
            <SavedMovies/>
            <Footer/>
        </div>     
  );
}