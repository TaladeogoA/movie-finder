import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";
import Rating from "../rating/Rating";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

const TvShows = ({ tvShows, handleSlideClick }) => {
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
            <SplideWithOverlay
              key={tvShow.id}
              onClick={() => handleSlideClick(tvShow)}
            >
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                src={`${IMAGE_PATH}${tvShow.poster_path}`}
                alt={tvShow.title}
              />

              <Overlay>
                <OverlayTitle>{tvShow.title}</OverlayTitle>
                <OverlayStats>
                  <Rating rating={tvShow.vote_average} />
                </OverlayStats>
              </Overlay>
            </SplideWithOverlay>
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

const OverlayTitle = styled.h3`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const OverlayStats = styled.div``;

const SplideWithOverlay = styled(SplideSlide)`
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;
