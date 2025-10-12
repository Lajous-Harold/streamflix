export function getPosterUrl(path, size = "w500") {
  if (!path) return "/images/placeholder_poster.webp";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export default function MovieCard({
  id,
  poster,
  title,
  year,
  rating,
  duration,
  genres = [],
  onClick,
}) {
  const posterUrl =
    poster?.startsWith("/images") || poster?.startsWith("http") ? poster : getPosterUrl(poster);

  const handleKey = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(id);
    }
  };

  const Wrapper = ({ children }) => (
    <div
      className={`card-soft h-full ${
        onClick ? "cursor-pointer focus:outline-none focus:ring-4 focus:ring-secondary/25" : ""
      }`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ? () => onClick(id) : undefined}
      onKeyDown={onClick ? handleKey : undefined}
      aria-label={onClick ? `Voir les détails pour ${title}` : undefined}>
      {children}
    </div>
  );

  return (
    <article>
      <Wrapper>
        <img
          src={posterUrl}
          alt={`Affiche du film ${title}`}
          className='w-full aspect-[2/3] object-cover rounded-t-xl'
        />
        <div className='p-3'>
          <h3 className='text-sm font-semibold mb-1 line-clamp-1'>{title}</h3>
          <div className='text-xs text-muted flex flex-wrap gap-2'>
            {year && <span>{year}</span>}
            {rating && <span aria-label={`Note de ${rating} sur 5`}>{rating}</span>}
            {duration && <span>{duration}</span>}
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {genres.map((g) => (
              <span key={g} className='badge-soft'>
                {g}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </article>
  );
}
