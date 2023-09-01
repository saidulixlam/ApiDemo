import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Form from './components/Form';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [retryCount, setRetryCount] = useState(0);
  // const [cancelRetry, setCancelRetry] = useState(false);

  const fetchMovies=useCallback(async ()=> {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://swapi.dev/api/films/');

      if (!res.ok) {
        console.log('error ocured');
        throw new Error('Something went wrong.... Retrying');
      }

      const data = await res.json();

      const transformedMovies = data.results.map(mData => ({
        id: mData.episode_id,
        title: mData.title,
        openingText: mData.opening_crawl,
        releaseDate: mData.release_date
      }));

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);

      // Retry logic with a delay of 5 seconds if cancelRetry is false
      // if (!isLoading && !cancelRetry && retryCount < 3) {
      //   setRetryCount(retryCount + 1);
      //   setTimeout(fetchMovies, 1000); // Retry after 5 seconds
      // } else {
      //   setIsLoading(false);
      // }
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    // Call the function initially when the component mounts
    fetchMovies();
  }, [fetchMovies]);

  // const handleCancelRetry = () => {
  //   setCancelRetry(true);
  //   
  // };
  function addMovieHanlder(movie){
    console.log(movie);
  }

  return (
    <React.Fragment>
      <section>
        <Form onAddMovie={addMovieHanlder}/>
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
        
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {/* {!isLoading && movies.length===0 && <p>Found no movies</p>} */}
        {isLoading && <h1>Loading..............</h1>}
        {!isLoading && error && <h4>{error}</h4>}
      </section>
    </React.Fragment>
  );
}

export default App;
