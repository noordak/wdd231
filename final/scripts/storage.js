const FAVORITES_KEY = "disneyland-favorite-rides";

export function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);

    return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

export function toggleFavorite(rideId) {
    const favorites = getFavorites();

    const index = favorites.indexOf(rideId);

    if (index === -1) {
        favorites.push(rideId);
    } else {
        favorites.splice(index, 1);
    }

    saveFavorites(favorites);

    return favorites;
}