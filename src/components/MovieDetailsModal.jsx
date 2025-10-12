import { useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../api/tmdb.js";
import { getPosterUrl } from "./MovieCard.jsx";

export default function MovieDetailsModal({ movieId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const data = await getMovieDetails(movieId);
        if (!cancelled) setMovie(data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Erreur");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className='fixed inset-0 z-[100] flex items-end sm:items-center justify-center'>
      <div className='absolute inset-0 bg-black/70' onClick={onClose} aria-hidden />
      <div
        role='dialog'
        aria-modal='true'
        className='relative w-full sm:max-w-3xl bg-card border border-outline rounded-t-2xl sm:rounded-2xl shadow-elev overflow-hidden'>
        <div className='flex items-center justify-between px-4 py-3 border-b border-outline'>
          <h2 className='text-lg font-semibold'>{movie?.title || "Détails du film"}</h2>
          <button
            ref={closeBtnRef}
            className='btn btn-outline px-3 py-1'
            onClick={onClose}
            aria-label='Fermer'>
            ✕
          </button>
        </div>

        <div className='p-4 grid grid-cols-1 sm:grid-cols-[160px,1fr] gap-4'>
          <div>
            <img src={getPosterUrl(movie?.poster)} alt='Affiche' className='w-40 h-auto rounded' />
          </div>
          <div>
            {loading && <p className='text-muted'>Chargement…</p>}
            {error && <p className='text-red-400'>{error}</p>}
            {movie && (
              <>
                <div className='flex flex-wrap items-center gap-3 text-sm text-muted'>
                  {movie.year && <span>{movie.year}</span>}
                  {movie.duration && <span>{movie.duration}</span>}
                  {movie.rating && <span aria-label={`Note ${movie.rating}`}>{movie.rating}</span>}
                </div>
                {movie.genres?.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {movie.genres.map((g) => (
                      <span key={g} className='badge-soft'>
                        {g}
                      </span>
                    ))}
                  </div>
                )}
                {movie.overview && <p className='mt-3 text-white/90'>{movie.overview}</p>}
                <div className='mt-4 flex gap-2'>
                  <button className='btn btn-primary'>▶ Lecture</button>
                  <button className='btn btn-secondary'>+ Ma liste</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
