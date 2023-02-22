import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPopular } from "../../utils/getData";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Hero = ({ showInfo }) => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const getPopularData = async () => {
      try {
        const heroData = await getPopular();
        setHero(heroData.results[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getPopularData();
    console.log(hero);
  }, []);

  return (
    <HeroBg
      backdropPath={`https://image.tmdb.org/t/p/original${hero?.backdrop_path}`}
    >
      <div className="overlay">
        <div className="text-container">
          <h1>{hero?.title}</h1>
          <p>{hero?.overview}</p>

          <button>
            More Info
            <AiOutlineInfoCircle />
          </button>
        </div>
      </div>
    </HeroBg>
  );
};

export default Hero;

const HeroBg = styled.div`
  background-image: url(${(props) => props.backdropPath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: relative;

  .overlay {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 4rem;

    .text-container {
      width: 50%;
      margin: 2rem;

      h1 {
        font-size: 3rem;
      }

      button {
        background: rgba(109, 109, 110, 0.4);
        color: white;
        border: 1px solid white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;

        svg {
          margin-left: 0.5rem;
        }

        &:hover {
          background: rgba(109, 109, 110, 1);
        }
      }
    }
  }
`;
