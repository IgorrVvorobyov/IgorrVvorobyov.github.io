import { getSearch } from './api.js';
import { showMovies, getAndShowPopular } from './movies.js';
import { debounce } from './utils.js';

const search = document.querySelector('.header__search');

search.addEventListener(
    'input',
    debounce(async () => {
        if (search.value) {
            const resulSearch = await getSearch(search.value);
            showMovies(resulSearch);
        } else {
            await getAndShowPopular();
        }
    }, 300)
);