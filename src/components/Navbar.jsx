import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header
      role='banner'
      className='sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-outline'>
      <nav className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link
            to='/'
            aria-label="StreamFlix - Retour à l'accueil"
            className='flex items-center gap-2'>
            <img src='/images/logo.png' alt='StreamFlix' className='h-9 w-auto' />
            <span className='font-semibold'>StreamFlix</span>
          </Link>
          <input id='nav-toggle' type='checkbox' className='peer hidden' />
          <label
            htmlFor='nav-toggle'
            className='md:hidden cursor-pointer'
            aria-label='Afficher le menu'>
            ☰
          </label>

          <div className='hidden md:flex items-center gap-6'>
            <ul className='flex items-center gap-4 text-sm'>
              {[
                { to: "/", label: "Accueil" },
                { to: "/films", label: "Films" },
                { to: "/series", label: "Séries" },
                { to: "/ma-liste", label: "Ma Liste" },
                { to: "/quiz", label: "Quiz Cinéma" },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `hover:text-white ${isActive ? "text-white" : "text-muted"}`
                    }>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <form
              role='search'
              aria-label='Recherche de films'
              onSubmit={onSubmit}
              className='hidden sm:flex items-center'>
              <label htmlFor='search-input' className='sr-only'>
                Rechercher un film ou une série
              </label>
              <div className='flex items-center gap-2'>
                <input
                  id='search-input'
                  name='search'
                  type='search'
                  placeholder='Rechercher...'
                  className='input-soft w-52'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className='btn btn-outline' type='submit' aria-label='Lancer la recherche'>
                  🔍
                </button>
              </div>
            </form>

            <div className='relative'>
              <button
                className='btn border border-white/30 rounded-full px-3'
                aria-haspopup='true'
                aria-label='Menu utilisateur'>
                👤
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className='md:hidden peer-checked:block pb-4'>
          <ul className='grid gap-2 text-sm'>
            <li>
              <NavLink to='/' className='block py-1 text-muted hover:text-white'>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to='/films' className='block py-1 text-muted hover:text-white'>
                Films
              </NavLink>
            </li>
            <li>
              <NavLink to='/series' className='block py-1 text-muted hover:text-white'>
                Séries
              </NavLink>
            </li>
            <li>
              <NavLink to='/ma-liste' className='block py-1 text-muted hover:text-white'>
                Ma Liste
              </NavLink>
            </li>
            <li>
              <NavLink to='/quiz' className='block py-1 text-muted hover:text-white'>
                Quiz Cinéma
              </NavLink>
            </li>
          </ul>

          {/* Recherche mobile */}
          <form onSubmit={onSubmit} className='mt-3 flex gap-2'>
            <input
              type='search'
              className='input-soft flex-1'
              placeholder='Rechercher...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit' className='btn btn-outline'>
              🔍
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
