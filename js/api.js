const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b';
const URL = 'https://api.themoviedb.org/3';
const REGION = 'en-US';

async function load(url, queryParams) {
    const searchParams = new URLSearchParams(queryParams)
    const newUrl = `${url}?${searchParams.toString()}`;

    const resp = await fetch(newUrl, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const respData = await resp.json();
    console.log(respData);
    return respData;
}

export async function getPopular() {
    return await load(`${URL}/movie/popular`, {'api_key': API_KEY, language: REGION});
}

export async function getSearch(query) {
    return await load(`${URL}/search/movie`, {'api_key': API_KEY, language: REGION, query});
}

export async function getMovieDetails(id) {
    return await load(`${URL}/movie/${id}`, {'api_key': API_KEY, language: REGION});
}

export async function getNowWatching(page) {
    return await load(`${URL}/movie/now_playing`, {'api_key': API_KEY, language: REGION, page});
}