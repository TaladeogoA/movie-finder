import { useEffect, useState } from "react";
import { getPopular, getTvShows, getMovies } from "./utils/getData";
import InfoBox from "./components/infobox/InfoBox";
import styled from "styled-components";
import NavBar from "./components/navbar/NavBar";
import Hero from "./components/hero/Hero";
import Trending from "./components/trending/Trending";
import TvShows from "./components/tvshows/TvShows";
import Movies from "./components/movies/Movies";
import FilterResult from "./components/filterresult/FilterResult";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [trending, setTrending] = useState(null);
  const [tvShows, setTvShows] = useState(null);
  const [movies, setMovies] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showHomepage, setShowHomepage] = useState(true);

  // fetching data
  useEffect(() => {
    // fetch trending data
    const fetchTrending = async () => {
      const storedData = localStorage.getItem("TrendingData");

      if (storedData) {
        setTrending(JSON.parse(storedData));
      } else {
        try {
          const trendingData = await getPopular();
          localStorage.setItem(
            "TrendingData",
            JSON.stringify(trendingData.results)
          );
          setTrending(trendingData.results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // fetch tv shows data
    const fetchTvShows = async () => {
      const storedData = localStorage.getItem("TvShowsData");

      if (storedData) {
        setTvShows(JSON.parse(storedData));
      } else {
        try {
          const tvShowsData = await getTvShows();
          localStorage.setItem(
            "TvShowsData",
            JSON.stringify(tvShowsData.results)
          );
          setTvShows(tvShowsData.results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // fetch movies data
    const fetchMovies = async () => {
      const storedData = localStorage.getItem("MoviesData");

      if (storedData) {
        setMovies(JSON.parse(storedData));
      } else {
        try {
          const moviesData = await getMovies();
          localStorage.setItem(
            "MoviesData",
            JSON.stringify(moviesData.results)
          );
          setMovies(moviesData.results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchTrending();
    fetchTvShows();
    fetchMovies();
  }, []);

  // handleClick
  const handleSlideClick = (movie) => {
    setShowInfo(!showInfo);
    setSelectedMovie(movie);
    console.log(movie);
  };

  const closeInfoPopup = () => {
    setShowInfo(false);
  };

  // handle filter search
  const handleFilter = (selectedGenre, startDate, endDate) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&release_date.gte=${startDate}&release_date.lte=${endDate}`;

    const fetchMovies = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFilteredMovies(data.results);
        console.log("filteredMovies", data.results);
      } catch {
        console.log("error");
      }
    };

    fetchMovies();
  };

  // handle search click
  const handleSearchClick = (searchedMovie) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchedMovie}`;

    const fetchMovies = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFilteredMovies(data.results);
        console.log("searchedMovies", data.results);
      } catch {
        console.log("error");
      }
    };

    fetchMovies();
  };

  return (
    <AppContainer className="App">
      <NavBar
        handleFilter={handleFilter}
        setShowHomepage={setShowHomepage}
        handleSearchClick={handleSearchClick}
      />

      {showHomepage ? (
        <>
          <Hero showInfo={handleSlideClick} />
          <Trending handleSlideClick={handleSlideClick} trending={trending} />
          <TvShows handleSlideClick={handleSlideClick} tvShows={tvShows} />
          <Movies handleSlideClick={handleSlideClick} movies={movies} />
          {showInfo && (
            <InfoBox movie={selectedMovie} closeInfoPopup={closeInfoPopup} />
          )}
        </>
      ) : (
        <FilterResult
          filteredMovies={filteredMovies}
          setShowHomepage={setShowHomepage}
          setFilteredMovies={setFilteredMovies}
        />
      )}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  .search-placeholder-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #000;
    color: #fff;
  }
`;
