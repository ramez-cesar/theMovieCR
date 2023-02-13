export { createSkeletons, getMovies, getMovieCategory }


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

document.addEventListener('DOMContentLoaded', function() {
    const mainCategoryContainer = document.querySelector('.main--category-container')
    addBackground.observe(mainCategoryContainer);
})
