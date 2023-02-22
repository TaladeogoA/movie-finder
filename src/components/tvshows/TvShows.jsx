import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { getTvShows } from "../../utils/getData";
import styled from "styled-components";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

const TvShows = () => {
  const [tvShows, setTvShows] = useState(null);

  useEffect(() => {
    const getTvShowsData = async () => {
      try {
        const tvShowsData = await getTvShows();
        setTvShows(tvShowsData.results);
        console.log("tvshows", tvShowsData.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTvShowsData();
  }, []);

  return (
    <TvShowsContainer>
      <h2>Tv Shows</h2>
      <Splide
        tag="section"
        options={{
          perPage: 5,
          pagination: false,
          drag: "free",
          gap: "1rem",
          arrows: true,
          height: "10rem",
          perMove: "1",
          breakpoints: {
            600: {
              perPage: 1,
            },
            1000: {
              perPage: 2,
            },
          },
        }}
      >
        {tvShows?.map((tvShow) => {
          return (
            <SplideSlide key={tvShow.id}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                src={`${IMAGE_PATH}${tvShow.poster_path}`}
                alt={tvShow.title}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </TvShowsContainer>
  );
};

export default TvShows;

const TvShowsContainer = styled.section`
  margin: 2rem;

  h2 {
    color: white;
  }
`;
