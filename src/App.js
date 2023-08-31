import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  async function movieHanlder() {
    setIsLoading(true);
    const res = await fetch('https://swapi.dev/api/films/')
    const data = await res.json();

    const transfromMovies = data.results.map(mData => {
      return {
        id: mData.episode_id,
        title: mData.title,
        openingText: mData.opening_crawl,
        releaseDate: mData.release_Date
      }
    })
    setMovies(transfromMovies);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={movieHanlder}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <h1>Loading..............</h1> }
      </section>
    </React.Fragment>
  );
}

export default App;
