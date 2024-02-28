import React from "react";
import Header from "../Header/Header";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";

function SavedMoviesPage({ isLoggedIn, savedMovies, formatDuration, onDelete, setPopupMessage, setPopupType }) {
    return (
        <>
            <Header isOnMain={false} isAuthorized={isLoggedIn} />
            <main>
                <SavedMovies
                    savedMovies={savedMovies}
                    formatDuration={formatDuration}
                    onDelete={onDelete}
                    setPopupMessage={setPopupMessage}
                    setPopupType={setPopupType}
                />
            </main>
            <Footer />
        </>
    );
}

export default SavedMoviesPage;
