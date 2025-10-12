import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { searchMovies } from "../api/tmdb.js";
import MovieDetailsModal from "../components/MovieDetailsModal.jsx";

export default function SearchResults() {
  const [sp] = useSearchParams();
  const q = sp.get("q") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(q.trim());
        if (!cancelled) setResults(data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [q]);

  const title = useMemo(() => (q ? `Résultats pour "${q}"` : "Recherche"), [q]);

  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-bold mb-4'>{title}</h1>
        {loading && <p className='text-muted'>Chargement…</p>}
        {error && <p className='text-red-400'>{error}</p>}
        {!loading && !error && results.length === 0 && q && (
          <p className='text-muted'>Aucun résultat.</p>
        )}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {results.map((m) => (
            <MovieCard key={m.id} {...m} onClick={setSelectedId} />
          ))}
        </div>
      </div>

      {selectedId && <MovieDetailsModal movieId={selectedId} onClose={() => setSelectedId(null)} />}
    </section>
  );
}
