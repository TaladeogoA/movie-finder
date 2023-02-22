import { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Rating from "../rating/Rating";
import "@splidejs/react-splide/css";
import styled from "styled-components";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

const Trending = ({ handleSlideClick, trending }) => {
  return (
    <TrendingContainer>
      <h2>Trending</h2>
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
        {trending?.map((trendingShow) => {
          return (
            <SplideWithOverlay
              key={trendingShow.id}
              onClick={() => handleSlideClick(trendingShow)}
            >
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                src={`${IMAGE_PATH}${trendingShow.poster_path}`}
                alt={trendingShow.title}
              />

              <Overlay>
                <OverlayTitle>{trendingShow.title}</OverlayTitle>
                <OverlayStats>
                  <Rating rating={trendingShow.vote_average} />
                </OverlayStats>
              </Overlay>
            </SplideWithOverlay>
          );
        })}
      </Splide>
    </TrendingContainer>
  );
};

export default Trending;

const TrendingContainer = styled.section`
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
