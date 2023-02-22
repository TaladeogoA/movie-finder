import { useEffect, useState } from "react";
import { getPopular } from "./utils/getData";
import InfoBox from "./components/infobox/InfoBox";
import styled from "styled-components";
import NavBar from "./components/navbar/NavBar";
import Hero from "./components/hero/Hero";
import Trending from "./components/trending/Trending";
import TvShows from "./components/tvshows/TvShows";
import Movies from "./components/movies/Movies";

function App() {
  const [trending, setTrending] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // fetching data
  useEffect(() => {
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

    fetchTrending();
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

  return (
    <AppContainer className="App">
      <NavBar />
      <Hero />
      <Trending handleSlideClick={handleSlideClick} trending={trending} />
      <TvShows />
      <Movies />
      {showInfo && (
        <InfoBox movie={selectedMovie} closeInfoPopup={closeInfoPopup} />
      )}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div``;
