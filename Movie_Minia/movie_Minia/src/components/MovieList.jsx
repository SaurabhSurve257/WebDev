import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className="no-results">No movies to display.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((m) => (
        <MovieCard key={m.imdbID || m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieList;
