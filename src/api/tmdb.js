// Clé TMDB en dur (à ta demande)
const API = "https://api.themoviedb.org/3";
const KEY = "4e24cdfc49ef2f7e667ac115112428cf";
const LANG = "fr-FR";

async function request(path, params = {}) {
  const usp = new URLSearchParams({
    api_key: KEY,
    language: LANG,
    include_adult: "false",
    ...params,
  });
  const res = await fetch(`${API}${path}?${usp.toString()}`);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

export async function searchMovies(query, page = 1) {
  const data = await request("/search/movie", { query, page });
  return data.results.map((m) => ({
    id: m.id,
    title: m.title,
    year: (m.release_date || "").slice(0, 4),
    rating: `${(m.vote_average / 2).toFixed(1)}/5`,
    duration: null,
    genres: [],
    poster: m.poster_path,
  }));
}

export async function getMovieDetails(id) {
  const data = await request(`/movie/${id}`);
  return {
    id: data.id,
    title: data.title,
    year: (data.release_date || "").slice(0, 4),
    rating: `${(data.vote_average / 2).toFixed(1)}/5`,
    duration: data.runtime
      ? `${Math.floor(data.runtime / 60)}h${String(data.runtime % 60).padStart(2, "0")}`
      : null,
    genres: data.genres?.map((g) => g.name) ?? [],
    poster: data.poster_path,
    overview: data.overview,
  };
}
