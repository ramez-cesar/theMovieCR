import { getTrendingMoviesPreview, getCategoryMovies, getMovieSearch, getTrendingMovies, getMoviesByCategory, getMovieDetails, getMovieDetailsSimilar } from "../utils/requests.js"


async function Template() {
    const viewMian = `<header>
        <section class="header--name-site">
            <h1>The Movie CR</h1>
        </section>
    
        <section class="header--language-container">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="world-icon icon icon-tabler icon-tabler-world" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <line x1="3.6" y1="9" x2="20.4" y2="9"></line>
                    <line x1="3.6" y1="15" x2="20.4" y2="15"></line>
                    <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                    <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                </svg>
            </span>
            <select name="language" id="language_site">
                <option value="spanish" selected>Español</option>
                <option value="english">Inglés</option>
            </select>
        </section>
    </header>
    
    <main>
        <div class="main-view-container">
            <section class="main--slogan-container">
                <h2>Películas, series y mucho más.</h2>
                <p>Disfruta donde quieras, cuando quieras.</p>
            </section>
    
            <section class="main--search-container">
                <form class="search--container">
                    <input type="text" class="search-movie-main" placeholder="Buscar película o series..." autocomplete="off">
                    <button id="btn_search_movie_main">
                        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="10" cy="10" r="7"></circle>
                            <line x1="21" y1="21" x2="15" y2="15"></line>
                        </svg>
                    </button>
                </form>
            </section>
            
            <section class="main--trends-container">
                <h3>Tendencias</h3>
                <div class="trends-container--movies">
                </div>
                <div class="trends-container--button">
                    <button id="btn_show_trends">Ver más</button>
                </div>
            </section>
        </div>
            
            <section class="main--category-container">
                <h3>Categorías</h3>
                <div class="category-container">
                </div>
            </section>
    
        <!-- ========================= Actions with Single Page Aplications ========================= -->
    
        <section class="SPA-container--search-movie inactive">
            <div class="main--search-container">
                <form class="search--container">
                    <input type="text" class="search-movie-spa" placeholder="Buscar película o series..." autocomplete="off">
                    <button id="btn_search_movie_spa">
                        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="10" cy="10" r="7"></circle>
                            <line x1="21" y1="21" x2="15" y2="15"></line>
                        </svg>
                    </button>
                </form>
            </div>
            <div class="SPA--search-movie">
            </div>
        </section>
    
        <section class="SPA-container--movie-list inactive">
            <h3>Trending movies</h3>
            <div class="SPA--movie-list">
            </div>
        </section>
    
        <section class="SPA-container--movie-details inactive">
            <article>
                <img class="movie-poster">
                <h3 class="movie-title"></h3>
                <div class="movie-details--data">
                    <span>⭐</span>
                    <p class="movie-rating"></p>
                    <p class="movie-date"></p>
                </div>
                <div class="movie-category">
                </div>
                <p class="movie-description"></p>
            </article>
            <article class="SPA-similar-movies--container">
                <h3>Películas similares</h3>
                <div class="SPA--similar-movies">
                </div>
            </article>
        </section>
    
        <section class="SPA-container--movies-by-category inactive">
            <h3 class="SPA--category-name"></h3>
            <div class="SPA--movies-by-category">
            </div>
        </section>
    </main>
    
    <footer>
        <section class="footer--social-media">
            <a target="_blank" href="https://twitter.com/ramez_cesar">Twitter</a>
            <a target="_blank" href="https://github.com/ramez-cesar">Github</a>
            <a target="_blank" href="https://codepen.io/ramez-cesar">Codepen</a>
            <a target="_blank" href="mailto:cesarramez8@gmail.com">Contact</a>
        </section>
    
        <section class="footer--author">
            <h3>César Ramez</h3>
            <img src="../src/images/logo.png" alt="logo author">
        </section>
    
        <p>Copyright © 2023</p>
    </footer>`
    
    return viewMian
}

export default Template


// NAVIGATIONS
document.addEventListener('DOMContentLoaded', () => {
    
    window.addEventListener('DOMContentLoaded', getNavigationHash, false)
    window.addEventListener('hashchange', getNavigationHash, false)


    const nameSite = document.querySelector("section.header--name-site > h1")
    const btnSearchMovieMain = document.querySelector('#btn_search_movie_main')
    const btnShowTrends = document.querySelector('#btn_show_trends')
    const btnSearchMovieSPA = document.querySelector('#btn_search_movie_spa')
    const mainViewContainer = document.querySelector('.main-view-container')
    const mainCategoryContainer = document.querySelector('.main--category-container')
    const SPAContainerSearchMovie = document.querySelector('.SPA-container--search-movie')
    const SPAContainerMovieList = document.querySelector('.SPA-container--movie-list')
    const SPAContainerMovieDetails = document.querySelector('.SPA-container--movie-details')
    const SPAContainerMoviesByCategory = document.querySelector('.SPA-container--movies-by-category')


    nameSite.addEventListener('click', () => {
        location.hash = ''
    })
    
    btnSearchMovieMain.addEventListener('click', () => {
        const searchMovieMian = document.querySelector('.search-movie-main')
        location.hash = `#search=${searchMovieMian.value}`
    })
    
    btnShowTrends.addEventListener('click', () => {
        location.hash = "#trends"
    })
    
    btnSearchMovieSPA.addEventListener('click', () => {
        location.hash = `#search=${searchMovieSPA.value}`
    })
    

    function getNavigationHash() {
        if(location.hash.startsWith('#trends')) {
            trendsPage()
    
        } else if(location.hash.startsWith('#search=')) {
            searchPage()
    
        } else if(location.hash.startsWith('#movie=')) {
            moviePage()
    
        } else if(location.hash.startsWith('#category=')) {
            categoriesPage()
        } 
        else {
            homePage()
        }
    
        // Corrige el error de navegar sin ir al comienzo de la página
        document.documentElement.scrollTop = 0
    }
    
    
    function homePage() {
        mainViewContainer.classList.remove('inactive')
        mainCategoryContainer.classList.remove('inactive')
        SPAContainerSearchMovie.classList.add('inactive')
        SPAContainerMovieList.classList.add('inactive')
        SPAContainerMovieDetails.classList.add('inactive')
        SPAContainerMoviesByCategory.classList.add('inactive')

        // createSkeletons(trendsContainerMovies)
        getTrendingMoviesPreview()
        getCategoryMovies()
    }

    function trendsPage() {
        mainViewContainer.classList.add('inactive')
        mainCategoryContainer.classList.add('inactive')
        SPAContainerSearchMovie.classList.add('inactive')
        SPAContainerMovieList.classList.remove('inactive')
        SPAContainerMovieDetails.classList.add('inactive')
        SPAContainerMoviesByCategory.classList.add('inactive')

        // createSkeletons(SPAMovieList)
        getTrendingMovies()
    }

    function searchPage() {
        mainViewContainer.classList.add('inactive')
        mainCategoryContainer.classList.add('inactive')
        SPAContainerSearchMovie.classList.remove('inactive')
        SPAContainerMovieList.classList.add('inactive')
        SPAContainerMovieDetails.classList.add('inactive')
        SPAContainerMoviesByCategory.classList.add('inactive')

        const [_, query] = location.hash.split('=')
        
        // createSkeletons(SPASearchMovie)
        getMovieSearch(query)
    }

    function moviePage() {
        mainViewContainer.classList.add('inactive')
        mainCategoryContainer.classList.add('inactive')
        SPAContainerSearchMovie.classList.add('inactive')
        SPAContainerMovieList.classList.add('inactive')
        SPAContainerMovieDetails.classList.remove('inactive')
        SPAContainerMoviesByCategory.classList.add('inactive')
        
        const [_, movieID] = location.hash.split('=')
        
        getMovieDetails(movieID)
        getMovieDetailsSimilar(movieID)
    }

    function categoriesPage() {
        mainViewContainer.classList.add('inactive')
        mainCategoryContainer.classList.add('inactive')
        SPAContainerSearchMovie.classList.add('inactive')
        SPAContainerMovieList.classList.add('inactive')
        SPAContainerMovieDetails.classList.add('inactive')
        SPAContainerMoviesByCategory.classList.remove('inactive')

        const [_, genre] = location.hash.split('=')
        const [categoryName, movieID] = genre.split('/')

        const SPACategoryName = document.querySelector('.SPA--category-name')
        SPACategoryName.textContent = `${categoryName} movies`

        // createSkeletons(SPAMoviesByCategory)
        getMoviesByCategory(movieID)
    }
})
