import './MoviesCardList.css';

export default function MoviesCardList({ children, isNothingFound }) {
  
    return (
        <div 
            className="movies-card-list"
        >
            {isNothingFound && <p className="movies-card-list__nothing-found">Ничего не найдено</p>}
            {children}
        </div>
  );
}