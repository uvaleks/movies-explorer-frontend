import './MoviesCardList.css';

export default function MoviesCardList({ children }) {
    return (
        <div className="movies-card-list">
            {children}
        </div>
  );
}