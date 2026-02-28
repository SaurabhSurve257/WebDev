import React, { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';

// sample data for the app - could be replaced with API calls later
const SAMPLE_MOVIES = [
  {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZjQ5LWFmNTEtODM1ZmRhYzNlZTAwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0068646',
    Title: 'The Godfather',
    Year: '1972',
    Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmYtYTAwZS00ZDI3LWFmNDEtNWYzZmEzNjc3ODVkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0071562',
    Title: 'The Godfather: Part II',
    Year: '1974',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzMjMtZTQ4Ny00ZjQzLTlhMTUtN2Y5NmEwZjQ2ZjQ3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0050083',
    Title: '12 Angry Men',
    Year: '1957',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjU4NTUxNzY1M15BMl5BanBnXkFtZTcwNDM0NjY0Mw@@._V1_SX300.jpg',
  },
];

const App = () => {
  const [query, setQuery] = useState('');
  const [movies] = useState(SAMPLE_MOVIES);

  const filtered = movies.filter((m) =>
    m.Title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app-container">
      <h1>Movie Minia</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <MovieList movies={filtered} />
    </div>
  );
};

export default App;