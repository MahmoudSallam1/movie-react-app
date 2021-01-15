//to create the SearchMovies component
//form with a class of form
//label with htmlFor="query" and a class of Label
//input of type text with a name of "query" and a placeholder
//button class of button and a type of submit

import React, { useState } from "react";
import MovieCard from "./MovieCard";

function SearchMovies() {
  //states- input query, movies
  const [query, setQuery] = useState("");

  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=7ce7bd6e2a2eb9f7ab2ce853c7bc84ed&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const moviesPromise = await fetch(url);
      const data = await moviesPromise.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>

        <input
          className="input"
          type="text"
          name="query"
          placeholder="search for a movie"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}

export default SearchMovies;
