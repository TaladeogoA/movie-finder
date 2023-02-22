import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import styled from "styled-components";

const Rating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      // Full star
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 === 0.5) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      // Empty star
      stars.push(<FaStar key={i} />);
    }
  }

  return <Wrapper>{stars}</Wrapper>;
};

export default Rating;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  svg {
    color: white;
    font-size: 1rem;
  }
`;
