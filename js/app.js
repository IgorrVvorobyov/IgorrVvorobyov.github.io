import {getNowWatching} from './api.js';
import {getAndShowPopular, showMovies, getAndShowFavorites} from './movies.js';
import './search.js';

getAndShowPopular();

const popular = document.querySelector('.category');
popular.addEventListener('click', () => getAndShowPopular());
const currently = document.getElementById('currently');
currently.addEventListener('click', async () => {
    const result = await getNowWatching(1);
    showMovies(result);
});
const favorites = document.getElementById('favorite');
favorites.addEventListener('click', () => (getAndShowFavorites()));