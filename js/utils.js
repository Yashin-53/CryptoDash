// Save favorite

export function saveFavorite(coin) {

  const favorites = loadFavorites();

  if (!favorites.includes(coin)) {

    favorites.push(coin);

  }

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

}

// Load favorites

export function loadFavorites() {

  return JSON.parse(
    localStorage.getItem("favorites")
  ) || [];

}

// Currency converter

export function convertUsdToInr(amount) {

  const rate = 83;

  return (amount * rate).toFixed(2);

}

export function removeFavorite(coin) {
  const favorites = loadFavorites().filter(f => f !== coin);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}