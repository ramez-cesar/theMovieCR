import { URL_API } from "../utils/getData.js"
import { getMovies, getMovieCategory } from "../utils/createElements.js"
export { getTrendingMoviesPreview, getCategoryMovies, getMovieSearch, getTrendingMovies, getMovieDetails, getMovieDetailsSimilar, getMoviesByCategory }


async function getTrendingMoviesPreview() {
    const { data } = await URL_API('/trending/movie/day')
    const trendingMovies = data.results
    
    const trendsContainerMovies = document.querySelector('.trends-container--movies')
    getMovies(trendsContainerMovies, trendingMovies, { leazyLoad: true, titleMovie: false })
}



async function getCategoryMovies() {
    const { data } = await URL_API('/genre/movie/list')
    const categoryMovies = data.genres
    
    const categoryContainer = document.querySelector('.category-container')
    getMovieCategory(categoryContainer, categoryMovies)
}



async function getMovieSearch(query) {
    const { data } = await URL_API('/search/movie', {
        params: {
            query: query
        }
    })
    
    const searchMovie = data.results
    
    const SPASearchMovie = document.querySelector('.SPA--search-movie')
    getMovies(SPASearchMovie, searchMovie, { leazyLoad: true, titleMovie: true })
}



async function getTrendingMovies() {
    const { data } = await URL_API('/trending/movie/day')
    const trendingMovies = data.results

    const SPAMovieList = document.querySelector('.SPA--movie-list')
    getMovies(SPAMovieList, trendingMovies, { leazyLoad: true, titleMovie: true })
}


async function getMovieDetails(id) {
    const { data: movie } = await URL_API(`/movie/${id}`)

    const moviePoster = document.querySelector('.movie-poster')
    const movieTitle = document.querySelector('.movie-title')
    const movieRating = document.querySelector('.movie-rating')
    const movieDate = document.querySelector('.movie-date')
    const movieCategory = document.querySelector('.movie-category')
    const movieDescription = document.querySelector('.movie-description')

    moviePoster.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path)
    movieTitle.textContent = movie.title
    movieRating.textContent = movie.vote_average
    movieDate.textContent = `- ${movie.release_date}`
    movieDescription.textContent = movie.overview

    getMovieCategory(movieCategory, movie.genres)
}


async function getMovieDetailsSimilar(id) {
    const { data } = await URL_API(`/movie/${id}/similar`)
    const similarMovies = data.results

    const SPASimilarMovies = document.querySelector('.SPA--similar-movies')
    getMovies(SPASimilarMovies, similarMovies, { leazyLoad: true, titleMovie: true })
}


async function getMoviesByCategory(id) {
    const { data } = await URL_API('/discover/movie', {
        params: {
            with_genres: id
        }
    })
    const byCategory = data.results
    
    const SPAMoviesByCategory = document.querySelector('.SPA--movies-by-category')
    getMovies(SPAMoviesByCategory, byCategory, { leazyLoad: true, titleMovie: true })
}

