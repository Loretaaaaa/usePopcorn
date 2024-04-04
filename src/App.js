import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import { NumResults } from "./components/NumResults";
import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import { useEffect } from "react";

const KEY = "3330264f";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const query = "interstellar";

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          ` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data.Response === "False") throw new Error("Move not found");
        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading ...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">
    <span>⛔️</span>{message}
    </p>;
}
export default App;
