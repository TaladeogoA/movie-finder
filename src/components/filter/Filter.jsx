import { useEffect, useState } from "react";
import { getGenres } from "../../utils/getData";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
const apiKey = process.env.REACT_APP_API_KEY;

const Filter = ({ handleFilter, setShowHomepage }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData.genres);
        console.log("genres", genresData.genres);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setQueryString(event.target.value);
  };

  const handleFilterClick = () => {
    handleFilter(selectedGenre, startDate, endDate);
    setShowHomepage(false);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${queryString}`
    )
      .then((response) => response.json())
      .then((data) => {
        handleFilter("", "", "", data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowHomepage(false);
  };

  return (
    <FilterContainer>
      <div className="search">
        <form onSubmit={handleSearchClick}>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchQueryChange}
            value={queryString}
          />
          <button className="button" type="submit">
            <AiOutlineSearch />
          </button>
        </form>
      </div>

      <div className="filter">
        <div className="filter__genre">
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All</option>
            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="filter__date">
          <label htmlFor="start-date"></label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
          />

          <label htmlFor="end-date"></label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <button className="button" onClick={handleFilterClick}>
        <AiOutlineSearch />
      </button>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 1rem;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: none;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    color: #fff;
    font-size: 1.5rem;
    outline: none;
    cursor: pointer;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    padding: 0 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;

    form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 1rem;

      input {
        width: 100%;
        height: 100%;
        padding: 0 1rem;
        border: none;
        border-bottom: white 1px;
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
        color: #fff;
        font-size: 1rem;
        outline: none;

        &::placeholder {
          color: #fff;
        }
      }
    }
  }

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    padding: 0 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;

    label {
      color: #fff;
      font-size: 1rem;
      font-weight: 500;
    }

    select {
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      border: none;
      border-bottom: white 1px;
      background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
      color: #fff;
      font-size: 1rem;
      outline: none;

      option {
        color: #000;
      }
    }

    input {
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      border: none;
      border-bottom: white 1px;
      background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
      color: #fff;
      font-size: 1rem;
      outline: none;

      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }

      &::placeholder {
        color: #fff;
      }

      &:focus {
        border-bottom: white 2px;
      }
    }

    .filter__genre {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      border-right: 1px solid rgba(255, 255, 255, 0.5);
    }

    .filter__date {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      border-right: 1px solid rgba(255, 255, 255, 0.5);

      span {
        color: #fff;
        font-size: 0.8rem;
        /* font-weight: 500; */
      }
    }
  }
`;
