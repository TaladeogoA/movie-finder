import { AiOutlineClose } from "react-icons/ai";
import Rating from "../rating/Rating";
import styled from "styled-components";

const FilterResult = ({
  filteredMovies,
  setShowHomepage,
  setFilteredMovies,
}) => {
  return (
    <Wrapper>
      <AiOutlineClose
        onClick={() => {
          setShowHomepage(true);
          setFilteredMovies(null);
        }}
      />

      <div className="filtered-movies-wrapper">
        {filteredMovies?.map((movie) => {
          return (
            <DivWithOverlay key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />

              <Overlay>
                <OverlayTitle>{movie.title}</OverlayTitle>
                <OverlayStats>
                  <Rating rating={movie.vote_average} />
                </OverlayStats>
              </Overlay>
            </DivWithOverlay>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default FilterResult;

const Wrapper = styled.div`
  color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  position: relative;

  svg {
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 2rem;
    right: 3rem;
  }

  .filtered-movies-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;

    img {
      width: 200px;
      height: 300px;
      margin: 1rem;
    }
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
  padding: 1rem;
`;

const OverlayTitle = styled.h3`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const OverlayStats = styled.div``;

const DivWithOverlay = styled.div`
  position: relative;

  img {
    width: 100%;
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`;
