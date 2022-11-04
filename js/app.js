import {getNowWatching} from './api.js';
import {getAndShowPopular, showMovies, getAndShowFavorites} from './movies.js';
import './search.js';

// get and display popular movies
getAndShowPopular();

// show popular movies, in the Popular tab
const popular = document.querySelector('.category');
popular.addEventListener('click', () => getAndShowPopular());
// show current movies in the Currently Broadcasting tab
const currently = document.getElementById('currently');
currently.addEventListener('click', async () => {
    const result = await getNowWatching();
    showMovies(result);
});
// show favorite movies, in My Favorite tab
const favorites = document.getElementById('favorite');
favorites.addEventListener('click', () => (getAndShowFavorites()));