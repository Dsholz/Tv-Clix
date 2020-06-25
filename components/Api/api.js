const API_KEY = '80ab820d05e628a1be8ee5264da22ef8'


//Movies Category
export const getUpcomingMovies = () =>
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())


export const getMostPopularMovies = () =>
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getNowPlayingMovies = () =>
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getMovie = (id) =>
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getMovieCredits = (id) =>
  fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
    .then(res => res.json())

export const getMovieReccomendations = (id) =>
  fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const searchMoviesApi = (text, adultContent) =>
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${text}&include_adult=${adultContent}`)
    .then(res => res.json())

//Tv Shows Category
export const getTvShowsOnAir = () =>
  fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getPopularTvShows = () =>
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getTopRatedTvShows = () =>
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getTvShow = (id) =>
  fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getTvShowCredit = (id) =>
  fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())

export const getTvShowReccomendations = (id) =>
  fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
    .then(res => res.json())

export const searchTvShowsApi = (text, adultContent) =>
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${text}&language=en-US&include_adult=${adultContent}`)
    .then(res => res.json())