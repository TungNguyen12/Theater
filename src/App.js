import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg"; //we have to import the search icon in order to use it, SearchIcon is just a name we set
import "./App.css";

// 8af24405
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=8af24405";


function App() {
    const [movies, setMovies] = useState([]);
    // Fetch the API data
    const [searchMovie, setSearchMovie] = useState('')

    const searchMovies = async (title) => {
        //asynchronous function to fetch the data and it takes some time, 'title' stand for movie title
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search); //here we set movies 
    };

    useEffect(() => {
        searchMovies("Superman");
    }, []); //after receiving the data we need to be able to render that and show it inside of our application

    return (
        <div className="app">
            {/* we want to fetch the data as soon as data arrive Effect hook*/}
            <h1>Finnkino</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchMovie} //here we put a static value, will change later
                    onChange={(e) => setSearchMovie(e.target.value)}
                />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchMovie)} />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                  {movies.map((movie) => <MovieCard movie={movie} />)}
                </div>
            ) : (
                <div className='empty'>
                  <h2>No movies found</h2>

                </div>
            )}
        </div>
    );
}

export default App;
