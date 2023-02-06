window.addEventListener('DOMContentLoaded', getNavigationHash, false)
window.addEventListener('hashchange', getNavigationHash, false)


nameSite.addEventListener('click', () => {
    location.hash = ''
})


btnSearchMovieMain.addEventListener('click', () => {
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

    createSkeletons(trendsContainerMovies)
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

    createSkeletons(SPAMovieList)
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
    
    createSkeletons(SPASearchMovie)
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

    SPACategoryName.textContent = `${categoryName} movies`

    createSkeletons(SPAMoviesByCategory)
    getMoviesByCategory(movieID)
}
