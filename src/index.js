const URL_API = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY
    }
})


// ======================================== Utils ========================================


// Function that creates skeletons
function createSkeletons(container) {
    for (let i = 0; i < 15; i++) {
        const div = document.createElement('div')
        div.classList.add('skeletons')
        container.appendChild(div)
    }
}


// Function for intersection observer
function callback(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src
        }
    })
}

const lazyLoader = new IntersectionObserver(callback)



// General function for movie list
function getMovies(container, moviesList, { leazyLoad = false, titleMovie = false } = {}) {

    container.innerHTML = ""

    moviesList.forEach(movie => {
        const div = document.createElement('div')
        const img = document.createElement('img')
        const h4 = document.createElement('h4')
        const p = document.createElement('p')
        
        img.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`
        })

        if (titleMovie == false) {
            div.setAttribute('class', 'movie')
            img.setAttribute('alt', movie.title)
            img.setAttribute(
                leazyLoad ? 'data-src' : 'src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path)

            container.appendChild(div)
            div.appendChild(img)

        } else {
            div.classList.add('SPA-movie')
            img.setAttribute('alt', movie.title)
            img.setAttribute(
                leazyLoad ? 'data-src' : 'src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path)

            h4.textContent = movie.title
            p.textContent = movie.release_date

            container.appendChild(div)
            div.appendChild(img)
            div.appendChild(h4)
            div.appendChild(p)
        }

        if (leazyLoad) {
            lazyLoader.observe(img)
        }
    })
}



// General function for movie categories
function getMovieCategory(container, categoryList) {

    container.innerHTML = ""
    
    categoryList.forEach(movie => {
        const div = document.createElement('div')
        const p = document.createElement('p')
    
        div.setAttribute('class', 'category')
        p.setAttribute('id', `id${movie.id}`)
        p.textContent = movie.name

        p.addEventListener('click', () => {
            location.hash = `#category=${movie.name}/${movie.id}`
        })
        
        container.appendChild(div)
        div.appendChild(p)
    });
}



// Function creating scroll animation
function animationScroll(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.background = "#39485e"
        }
    })
}

const addBackground = new IntersectionObserver(animationScroll, {
    threshold: 0.1
})

addBackground.observe(mainCategoryContainer);



// ======================================== API Requests ========================================

async function getTrendingMoviesPreview() {
    const { data } = await URL_API('/trending/movie/day')
    const trendingMovies = data.results

    getMovies(trendsContainerMovies, trendingMovies, { leazyLoad: true, titleMovie: false })
}



async function getCategoryMovies() {
    const { data } = await URL_API('/genre/movie/list')
    const categoryMovies = data.genres

    getMovieCategory(categoryContainer, categoryMovies)
}



async function getMovieSearch(query) {
    const { data } = await URL_API('/search/movie', {
        params: {
            query: query
        }
    })
    
    const searchMovie = data.results
    
    getMovies(SPASearchMovie, searchMovie, { leazyLoad: true, titleMovie: true })
}



async function getTrendingMovies() {
    const { data } = await URL_API('/trending/movie/day')
    const trendingMovies = data.results

    getMovies(SPAMovieList, trendingMovies, { leazyLoad: true, titleMovie: true })
}


async function getMovieDetails(id) {
    const { data: movie } = await URL_API(`/movie/${id}`)

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

    getMovies(SPASimilarMovies, similarMovies, { leazyLoad: true, titleMovie: true })
}


async function getMoviesByCategory(id) {
    const { data } = await URL_API('/discover/movie', {
        params: {
            with_genres: id
        }
    })
    const byCategory = data.results
    
    getMovies(SPAMoviesByCategory, byCategory, { leazyLoad: true, titleMovie: true })
}

