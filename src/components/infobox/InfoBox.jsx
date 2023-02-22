import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const InfoBox = ({ movie, closeInfoPopup }) => {
  return (
    <Wrapper className="info-box">
      <div className="movie-info-container">
        <AiOutlineClose onClick={() => closeInfoPopup()} />

        <div className="movie-data">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
          />

          <div>
            <h2>{movie?.title}</h2>
            <span>
              {movie?.release_date} | {movie?.vote_average} / 10
            </span>
            <p>{movie?.overview}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default InfoBox;

const Wrapper = styled.div`
  color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  .movie-info-container {
    margin: 1rem 0;
    background-color: black;
    color: white;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    position: relative;
    width: 50%;

    svg {
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      top: 1rem;
      right: 1rem;
    }

    .movie-data {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-top: 1rem;

      img {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 1rem;
        margin-right: 1rem;
      }
    }
  }
`;
