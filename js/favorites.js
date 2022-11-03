const favoritesKey = 'fav';

export function addToFavorites(id) {
    const allFavorites = getAllFavorites();
    allFavorites.push(id);
    localStorage.setItem(favoritesKey, JSON.stringify(allFavorites));
}

export function removeFromFavorites(id) {
    let allFavorites = getAllFavorites();
    allFavorites = allFavorites.filter(f => f !== id);
    localStorage.setItem(favoritesKey, JSON.stringify(allFavorites));
}


export function getAllFavorites() {
    const res = localStorage.getItem(favoritesKey);
    if (!res) {
        return [];
    }
    return JSON.parse(res);
}

export function hasInFavorite(id) {
    return getAllFavorites().includes(id);
}