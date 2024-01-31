import { useEffect } from 'react';
import './MoviesCardList.css';

export default function MoviesCardList({ children, rowsPerPage, setRowsPerPage }) {
  
    return (
        <div 
            className="movies-card-list"
            // style={{ gridTemplateRows: `repeat(${rowsPerPage}, 1fr)` }}
        >
            {children}
        </div>
  );
}