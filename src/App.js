import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import Form from './components/Form';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://react-api99-default-rtdb.firebaseio.com/movies.json');

      if (!res.ok) {
        console.log('error ocured');
        throw new Error('Something went wrong.... Retrying');
      }

      const data = await res.json();
      const loadMovies = [];
      for (const key in data) {
        loadMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      setMovies(loadMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Call the function initially when the component mounts
    fetchMovies();
  }, [fetchMovies]);

  async function addMovieHanlder(movie) {
    const res = await fetch('https://react-api99-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        //it is not required bvut good practice to aware your backend about data u r sending
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log(data);
  }
  //delete 
  async function deleteMovieHandler(movieId) {
    try {
      const res = await fetch(`https://react-api99-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Delete request failed.');
      }
  
      // Filter out the deleted movie from the local state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <React.Fragment>
      <section>
        <Form onAddMovie={addMovieHanlder} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>

      </section>
      <section>
      {!isLoading && <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />}
        {/* {!isLoading && <MoviesList movies={movies} />} */}
        {/* {!isLoading && movies.length===0 && <p>Found no movies</p>} */}
        {isLoading && <h1>Loading..............</h1>}
        {!isLoading && error && <h4>{error}</h4>}
      </section>
    </React.Fragment>
  );
}

export default App;
