import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { quizQuestions } from "../data/quizQuestions.js";

function ScoreMessage({ score }) {
  if (score <= 3)
    return <p className='text-center text-red-300'>Vous devriez regarder plus de films ! 🎬</p>;
  if (score <= 6)
    return <p className='text-center text-yellow-300'>Pas mal ! Un vrai amateur de cinéma 🍿</p>;
  if (score <= 8)
    return (
      <p className='text-center text-green-300'>Excellent ! Vous êtes un cinéphile confirmé 🌟</p>
    );
  return (
    <p className='text-center text-emerald-300'>Parfait ! Vous êtes un expert du 7ème art ! 🏆</p>
  );
}

export default function Quiz() {
  const questions = useMemo(() => quizQuestions, []);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const total = questions.length;
  const current = questions[index];

  const handleStart = () => setStarted(true);
  const handleSelect = (optIndex) => setSelected(optIndex);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[index] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    if (index + 1 < total) setIndex(index + 1);
    else setShowResults(true);
  };

  const resetAll = () => {
    setStarted(false);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setShowResults(false);
  };

  const score = useMemo(
    () =>
      answers.reduce((acc, ans, i) => {
        const q = questions[i];
        return acc + (q && q.options[ans] === q.correctAnswer ? 1 : 0);
      }, 0),
    [answers, questions]
  );

  if (!started) {
    return (
      <section className='py-12'>
        <div className='container mx-auto px-4 max-w-2xl'>
          <div className='card-soft p-8 text-center'>
            <h1 className='text-2xl md:text-3xl font-bold mb-2'>
              Quiz Cinéma - Testez vos connaissances !
            </h1>
            <p className='text-muted'>10 questions sur l'univers du cinéma</p>
            <p className='text-white/90 mt-4'>
              Brève description : retrouvez des classiques, des répliques cultes et des infos
              primées. Aucune possibilité de revenir en arrière 😉
            </p>
            <button className='btn btn-primary mt-6' onClick={handleStart}>
              Commencer le quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (showResults) {
    return (
      <section className='py-12'>
        <div className='container mx-auto px-4 max-w-3xl'>
          <div className='card-soft p-6'>
            <h2 className='text-2xl font-bold text-center'>
              Vous avez obtenu {score}/{total} !
            </h2>
            <div className='mt-2'>
              <ScoreMessage score={score} />
            </div>

            <div className='mt-8 space-y-4'>
              {questions.map((q, i) => {
                const chosenIndex = answers[i];
                const chosen = q.options[chosenIndex];
                const correct = q.correctAnswer;
                const ok = chosen === correct;
                return (
                  <div key={q.id} className='rounded-lg border border-outline p-4'>
                    <div className='flex items-start gap-2'>
                      <span
                        aria-hidden
                        className={`text-xl ${ok ? "text-emerald-400" : "text-red-400"}`}>
                        {ok ? "✓" : "✗"}
                      </span>
                      <div>
                        <p className='font-medium'>
                          {i + 1}. {q.question}
                        </p>
                        <p className={`${ok ? "text-emerald-400" : "text-red-400"}`}>
                          Votre réponse : {chosen ?? "—"}
                        </p>
                        {!ok && <p className='text-emerald-300'>Bonne réponse : {correct}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='mt-8 flex flex-wrap gap-3 justify-center'>
              <button className='btn btn-primary' onClick={resetAll}>
                Recommencer le quiz
              </button>
              <Link to='/' className='btn btn-outline'>
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <section className='py-12'>
      <div className='container mx-auto px-4 max-w-3xl'>
        <div className='card-soft p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>
              Question {index + 1}/{total}
            </h2>
            <div aria-hidden className='text-sm text-muted'>
              {progress}%
            </div>
          </div>
          <div className='w-full bg-white/10 h-2 rounded mt-2'>
            <div className='h-2 bg-secondary rounded' style={{ width: `${progress}%` }} />
          </div>

          <p className='text-lg mt-6'>{current.question}</p>

          <div className='grid sm:grid-cols-2 gap-3 mt-4'>
            {current.options.map((opt, i) => {
              const active = selected === i;
              return (
                <button
                  key={opt}
                  onClick={() => setSelected(i)}
                  className={`text-left p-4 rounded-lg border transition ${
                    active
                      ? "border-secondary bg-secondary/20"
                      : "border-outline hover:border-white/50"
                  }`}
                  aria-pressed={active}>
                  {opt}
                </button>
              );
            })}
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              className='btn btn-primary disabled:opacity-50'
              disabled={selected === null}
              onClick={handleNext}>
              {index + 1 === total ? "Voir mes résultats" : "Question suivante"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
