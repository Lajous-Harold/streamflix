import Hero from "../components/Hero.jsx";
import MovieCard from "../components/MovieCard.jsx";
import { trending, recommended, newOnes } from "../data/movies.js";

function Section({ id, title, items }) {
  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <h2 id={id} className='text-xl font-semibold mb-4'>
          {title}
        </h2>
        <div
          role='group'
          aria-label={title}
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {items.map((m) => (
            <MovieCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Section id='trending-title' title='Tendances actuelles' items={trending} />
      <Section id='recommended-title' title='Recommandés pour vous' items={recommended} />
      <Section id='new-title' title='Nouveautés' items={newOnes} />
      <section className='border-y border-outline py-10'>
        <div className='container mx-auto px-4 max-w-3xl text-center'>
          <h2 id='signup-title' className='text-xl font-semibold'>
            Rejoignez StreamFlix
          </h2>
          <p className='text-muted mb-6'>
            Découvrez des milliers de films et séries en streaming illimité
          </p>
          <form
            className='card-soft p-6 text-left max-w-xl mx-auto'
            onSubmit={(e) => e.preventDefault()}
            noValidate>
            <fieldset className='p-0 m-0 border-0 grid gap-4'>
              <legend className='sr-only'>Informations d'inscription</legend>
              <div>
                <label className='block text-sm mb-1' htmlFor='signup-email'>
                  Adresse email
                </label>
                <input
                  id='signup-email'
                  name='email'
                  type='email'
                  className='input-soft'
                  placeholder='vous@exemple.com'
                  required
                />
                <p id='email-error' className='text-xs text-red-400 mt-1'></p>
              </div>
              <div>
                <label className='block text-sm mb-1' htmlFor='signup-password'>
                  Mot de passe
                </label>
                <input
                  id='signup-password'
                  name='password'
                  type='password'
                  className='input-soft'
                  minLength={8}
                  required
                />
                <p className='text-xs text-white/70 mt-1'>Au moins 8 caractères</p>
                <p id='password-error' className='text-xs text-red-400 mt-1'></p>
              </div>
              <div>
                <label className='block text-sm mb-1' htmlFor='signup-confirm-password'>
                  Confirmer le mot de passe
                </label>
                <input
                  id='signup-confirm-password'
                  name='confirm-password'
                  type='password'
                  className='input-soft'
                  required
                />
                <p id='confirm-error' className='text-xs text-red-400 mt-1'></p>
              </div>
              <label className='flex items-start gap-2 text-sm'>
                <input id='terms-accept' type='checkbox' className='mt-1' required />
                <span>
                  J'accepte les{" "}
                  <a className='underline' href='#'>
                    conditions d'utilisation
                  </a>{" "}
                  et la{" "}
                  <a className='underline' href='#'>
                    politique de confidentialité
                  </a>
                </span>
              </label>
              <button type='submit' className='btn btn-primary w-full'>
                Créer mon compte
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
