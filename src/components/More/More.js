import './More.css';

export default function More({ onMore }) {
    return (
        <div className="more">
            <button 
                onClick={onMore}
                className="more__button"
                type="button"
            >Ещё</button>
        </div>
  );
}