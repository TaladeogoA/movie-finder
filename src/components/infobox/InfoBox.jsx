import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const InfoBox = ({ movie, closeInfoPopup }) => {
  return (
    <Wrapper className="info-box">
      <h2>{movie?.title}</h2>
      <p>{movie?.overview}</p>

      <div>
        <AiOutlineClose onClick={() => closeInfoPopup()} />
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

  div {
    margin: 1rem 0;
    background-color: black;
    color: white;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
`;
