import { getMovieDetails } from './api.js';
import { hasInFavorite, removeFromFavorites, addToFavorites } from './favorites.js';

const modalElement = document.querySelector('.modal');

export async function openModal(filmId) {
    const respData = await getMovieDetails(filmId);

    modalElement.classList.add('modal--show');
    document.body.classList.add('stop-scrolling');

    const release_date = new Date(respData.release_date);

    modalElement.innerHTML = `
      <div class="modal__card">
        <img class="modal__movie-backdrop" src="${
        "https://image.tmdb.org/t/p/w500" + respData.poster_path
    }" alt="">
        <label>
              <input type="checkbox" class="checkbox__favorite">
              Favorite
            </label>
        <h2>
            <span class="modal__movie-title">${respData.title}</span>
            <span class="modal__movie-release-year">${release_date.getFullYear()}</span>
        </h2>
        <ul class="modal__movie-info">
            <div class="loader"></div>
            <li class="modal__movie-genre">Genre: ${respData.genres.map(
        (el) => `<span>${el.name}</span>`
    )}</li>
            <li class="modal__movie-runtime">Time: ${respData.runtime} min. </li>
            <li class="modal__movie-overview">${respData.overview}</li>
        </ul>
        <button type="button" class="modal__button-close">Close</button>
      </div>
  `;

    const btnClose = document.querySelector('.modal__button-close');
    btnClose.addEventListener('click', () => closeModal());

    const checkbox = document.querySelector('.checkbox__favorite');
    checkbox.checked = hasInFavorite(respData.id);
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            addToFavorites(respData.id);
        } else {
            removeFromFavorites(respData.id);
        }
    });
}

function closeModal() {
    modalElement.classList.remove('modal--show');
    document.body.classList.remove('stop-scrolling');
}

window.addEventListener('click', (e) => {
    if (e.target === modalElement) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
});