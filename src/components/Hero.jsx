export default function Hero() {
  return (
    <section className='relative overflow-hidden border-b border-outline min-h-[55vh]'>
      <img
        src='/images/hero-bg.jpg'
        alt=''
        aria-hidden
        className='absolute inset-0 w-full h-full object-cover brightness-[.70] contrast-105 saturate-115'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black/85' />

      <div className='relative z-10 container mx-auto px-4 py-12'>
        <div className='max-w-3xl'>
          <h1 className='text-4xl md:text-5xl font-bold mb-2 hero-shadow'>Inception</h1>
          <div className='flex flex-wrap items-center gap-3 text-muted font-semibold mb-2'>
            <span>2010</span>
            <span>2h28</span>
            <span aria-label='Note de 4,5 sur 5'>★★★★☆ 4,5/5</span>
          </div>
          <div className='flex flex-wrap gap-2 mb-3'>
            <span className='badge-soft'>Sci-Fi</span>
            <span className='badge-soft'>Thriller</span>
          </div>
          <p className='text-lg text-white/90 mb-4 max-w-2xl'>
            Un voleur qui s'infiltre dans les rêves des autres pour voler leurs secrets découvre
            qu'il doit réaliser l'impossible : planter une idée plutôt que de la voler.
          </p>
          <div className='flex flex-wrap gap-2'>
            <button className='btn btn-primary'>▶ Lecture</button>
            <button className='btn btn-secondary'>ℹ Plus d'infos</button>
            <button className='btn btn-outline'>+ Ma Liste</button>
          </div>
        </div>
      </div>
    </section>
  );
}
