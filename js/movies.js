import { getPopular, getMovieDetails } from './api.js';
import { openModal } from './modal.js';
import { getAllFavorites } from './favorites.js';


export async function getAndShowPopular() {
    const result = await getPopular();
    showMovies(result);
}

export function showMovies(data) {
    const moviesEl = document.querySelector('.movies');
    document.querySelector('.movies').innerHTML = '';

    data.results.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
                    <img 
                    src="${"https://image.tmdb.org/t/p/w500" + movie.poster_path}"
                    class="movie__cover"
                    alt="${movie.id}"
                    />
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.title}</div>
                    <div class="movie__average movie__average--${getClassByRate(
            movie.vote_average
        )}">${movie.vote_average}</div>
                </div>
        `;

        movieEl.addEventListener('click', () => openModal(movie.id));
        moviesEl.appendChild(movieEl);
    });
}

export async function getAndShowFavorites() {
    const promises = getAllFavorites().map(id => getMovieDetails(id));
    const results = await Promise.all(promises);
    showMovies({results});
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green';
    } else if (vote > 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

