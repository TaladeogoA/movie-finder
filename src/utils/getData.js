const apiKey = process.env.REACT_APP_API_KEY;

export const getTrending = async () => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    console.log("Error");
  }
};

export const getPopular = async () => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    console.log("Error");
  }
};

export const getTvShows = async () => {
  try {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    console.log("Error");
  }
};

export const getMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    console.log("Error");
  }
};
