import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

const MoviesPage = ({
  goSearch,
  isLoading,
  saveMovie,
  formatDuration,
  deleteMovie,
  setPopupMessage,
  setPopupType,
  isLoggedIn,
}) => (
  <>
    <Header isOnMain={false} isAuthorized={isLoggedIn} />
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
    <Footer />
  </>
);

export default MoviesPage;
