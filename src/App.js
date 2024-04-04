import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import { NumResults } from "./components/NumResults";
import { useState } from "react";
import {tempMovieData} from "./data";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
        <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
export default App;
