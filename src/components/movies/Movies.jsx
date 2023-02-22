import { useEffect, useState } from "react";
import { getMovies } from "../../utils/getData";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

const Movies = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const getMoviesData = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData.results);
        console.log("movies", moviesData.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMoviesData();
  }, []);

  return (
    <MoviesContainer>
      <h2>Movies</h2>
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
        {movies?.map((movie) => {
          return (
            <SplideSlide key={movie.id}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                src={`${IMAGE_PATH}${movie.poster_path}`}
                alt={movie.title}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </MoviesContainer>
  );
};

export default Movies;

const MoviesContainer = styled.section`
  margin: 2rem;

  h2 {
    color: white;
  }
`;
