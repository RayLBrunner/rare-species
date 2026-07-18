'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type QuizQuestion = {
  id: string;
  eyebrow: string;
  prompt: string;
  description: string;
  countLabel: string;
  options: Array<{
    label: string;
    value: string;
    detail: string;
    emoji: string;
  }>;
};

type QuizResult = {
  commonName: string;
  scientificName: string;
  headline: string;
  description: string;
  highlight: string;
  habitat: string;
  region: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 'habitat',
    eyebrow: 'Q1 · Ecoregion',
    prompt: 'Which Oregon landscape calls to you?',
    description: 'Your answer will narrow the species pool.',
    countLabel: '1,900 species still in the running',
    options: [
      { label: 'Coast & beaches', value: 'coastal', detail: 'Dunes, tidepools, rocky headlands', emoji: '🌊' },
      { label: 'Forest & mountains', value: 'forest', detail: 'Old growth, alpine meadows', emoji: '🌲' },
      { label: 'Desert & high plains', value: 'desert', detail: 'Sage steppe, rimrock, open sky', emoji: '🏜' },
      { label: 'Valleys & wetlands', value: 'wetland', detail: 'Oak savanna, wetlands, farmland edges', emoji: '🌾' },
    ],
  },
  {
    id: 'kingdom',
    eyebrow: 'Q2 · Kingdom',
    prompt: 'What kind of life are you most drawn to?',
    description: 'Your biggest clue first — this narrows every match that follows.',
    countLabel: '930 species still in the running',
    options: [
      { label: 'Plants', value: 'plant', detail: 'Flowering plants, conifers, ferns, and mosses', emoji: '🌱' },
      { label: 'Animals', value: 'animal', detail: 'Amphibians, reptiles, birds, and mammals', emoji: '🦎' },
      { label: 'Fungi & Lichens', value: 'fungi', detail: 'Mushrooms, lichens, and fungal forms', emoji: '🍄' },
      { label: 'Communities', value: 'community', detail: 'Groups of species that depend on each other', emoji: '🤝' },
    ],
  },
  {
    id: 'phylum',
    eyebrow: 'Q3 · Plants',
    prompt: 'Which branch of the plant kingdom?',
    description: "Getting specific — this narrows your match to a major plant group.",
    countLabel: '247 species still in the running',
    options: [
      { label: 'Flowering plants', value: 'flowering', detail: 'Angiosperms — the largest group', emoji: '🌸' },
      { label: 'Conifers & relatives', value: 'conifer', detail: 'Pines, firs, and cone-bearers', emoji: '🌲' },
      { label: 'Ferns & allies', value: 'fern', detail: 'Spore-bearing, ancient lineages', emoji: '🌿' },
      { label: 'Mosses & liverworts', value: 'moss', detail: 'Nonvascular, ground-hugging plants', emoji: '🍀' },
    ],
  },
  {
    id: 'family',
    eyebrow: 'Q4 · Flowering plants',
    prompt: 'Which plant family feels like home?',
    description: 'Each family has its own character — pick the one that fits the picture.',
    countLabel: '52 species still in the running',
    options: [
      { label: 'Daisies & asters', value: 'daisy', detail: 'Composite, ray-and-disk flowers', emoji: '🌼' },
      { label: 'Legumes & peas', value: 'legume', detail: 'Pea-like flowers, seed pods', emoji: '🫛' },
      { label: 'Grasses & sedges', value: 'grass', detail: 'Narrow blades, wind-pollinated', emoji: '🌾' },
      { label: 'Orchids & lilies', value: 'orchid', detail: 'Showy, three-part flowers', emoji: '🌺' },
    ],
  },
  {
    id: 'genus',
    eyebrow: 'Q5 · Genus',
    prompt: 'Pick the personality that fits you best.',
    description: 'Each option maps to a group of genera with similar traits.',
    countLabel: '18 species still in the running',
    options: [
      { label: 'The dramatic bloomer', value: 'dramatic', detail: 'Big flowers, brief season, unforgettable', emoji: '✨' },
      { label: 'The quiet specialist', value: 'specialist', detail: 'Tiny, specific, ecologically essential', emoji: '🔍' },
      { label: 'The edge-dweller', value: 'edge', detail: 'Thrives at the limits of where life works', emoji: '⛰' },
      { label: 'The community builder', value: 'community', detail: 'Part of a larger system — rarely seen alone', emoji: '🤝' },
    ],
  },
  {
    id: 'orbic',
    eyebrow: 'Q6 · ORBIC List',
    prompt: 'How do you handle a crisis?',
    description: 'Last question. Your match is almost ready.',
    countLabel: '6 species left — almost there!',
    options: [
      { label: 'Sprint — every day counts', value: 'sprint', detail: 'No time to spare. Urgent action only.', emoji: '🚨' },
      { label: 'Steady — concerned, acting', value: 'steady', detail: 'Monitoring closely, acting deliberately.', emoji: '📊' },
      { label: 'Watchful — need more info', value: 'watchful', detail: 'Full picture before committing.', emoji: '🧐' },
      { label: 'Patient — resilient, ready', value: 'patient', detail: 'Long view. Stable but watchful.', emoji: '🌱' },
    ],
  },
];

function resolveQuizResult(answers: Record<string, string>): QuizResult {
  const habitat = answers.habitat;
  const kingdom = answers.kingdom;
  const orbic = answers.orbic;

  if (habitat === 'coastal') {
    return {
      commonName: 'Pink Sand Verbena',
      scientificName: 'Abronia umbellata',
      headline: 'A dune and coastal plant with a strong shoreline signal.',
      description: 'This result points toward a rare coastal species adapted to exposed, windswept habitats.',
      highlight: 'Habitat: sandy beaches and coastal bluffs',
      habitat: 'Coast',
      region: 'Oregon coast',
    };
  }

  if (habitat === 'wetland' && kingdom === 'animal' && orbic === 'sprint') {
    return {
      commonName: 'Oregon Spotted Frog',
      scientificName: 'Rana pretiosa',
      headline: 'An aquatic amphibian that favors wetland edges and slow-flow water.',
      description: 'This match reflects a species strongly linked to ponds, wetlands, and shallow water habitats.',
      highlight: 'Habitat: wetlands, shallow ponds, and slow streams',
      habitat: 'Wetland',
      region: 'Western Oregon',
    };
  }

  return {
    commonName: "Kincaid's Lupine",
    scientificName: 'Lupinus oreganus',
    headline: 'A dependable first-pass match based on your landscape and form clues.',
    description: 'This result suggests a rare plant tied to remnant prairie and meadow systems in Oregon.',
    highlight: 'Habitat: prairie remnants and open meadow edges',
    habitat: 'Prairie',
    region: 'Willamette Valley',
  };
}

export default function QuizExperience() {
  const [status, setStatus] = useState<'question' | 'result'>('question');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  useEffect(() => {
    if (!isExitDialogOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExitDialogOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExitDialogOpen]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = currentQuestion ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0;
  const result = useMemo(() => resolveQuizResult(answers), [answers]);

  const handleSelect = (value: string) => {
    setAnswers((previous) => ({ ...previous, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (!selectedAnswer && currentQuestionIndex < quizQuestions.length - 1) {
      return;
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
      return;
    }

    setStatus('result');
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((previous) => previous - 1);
      return;
    }

    setCurrentQuestionIndex(0);
  };

  const handleSkip = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
      return;
    }

    setStatus('result');
  };

  const handleRestart = () => {
    setStatus('question');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  return (
    <div className="font-body flex w-full flex-1 flex-col bg-white">
      <header className="bg-[#0a2818] text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-4 sm:px-8 md:px-16">
          <p className="font-heading text-sm font-semibold sm:text-base">ORBIC · Which Oregon rare species are you?</p>
          <button
            type="button"
            onClick={() => setIsExitDialogOpen(true)}
            className="font-body text-sm font-medium text-[#dcefe3] transition hover:text-white"
          >
            ✕ Exit quiz
          </button>
        </div>
      </header>

      <div className="h-1.5 w-full bg-[#e7e2d2]">
        <div className="h-full bg-[#16873d] transition-all" style={{ width: `${progress}%` }} />
      </div>

      {status === 'question' && currentQuestion && (
          <>
            <div className="border-b border-[#e7e2d2] bg-[#f6f3ea]">
              <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-6 py-3 sm:px-8 md:px-16">
                <div className="flex items-center gap-2">
                  {quizQuestions.map((question, index) => {
                    const step = index + 1;
                    const isComplete = index < currentQuestionIndex;
                    const isActive = index === currentQuestionIndex;

                    return (
                      <div
                        key={question.id}
                        className={`font-body flex h-7 w-7 items-center justify-center rounded-sm border text-xs font-semibold ${
                          isComplete
                            ? 'border-[#16873d] bg-[#16873d] text-white'
                            : isActive
                              ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                              : 'border-[#1a1a1a]/30 bg-white text-[#1a1a1a]'
                        }`}
                      >
                        {isComplete ? '✓' : step}
                      </div>
                    );
                  })}
                </div>
                <div className="font-body ml-auto text-sm font-semibold text-[#16873d]">{currentQuestion.countLabel}</div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 sm:py-10 md:px-16">
              <h2 className="font-heading text-2xl font-bold text-[#032014] sm:text-3xl">{currentQuestion.prompt}</h2>
              <p className="font-body mt-2 text-sm text-[#4b6353] sm:text-base">{currentQuestion.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className="group flex h-full w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                    >
                      <div
                        className={`relative flex w-full flex-col overflow-hidden rounded-md border transition ${
                          isSelected
                            ? 'border-[#16873d] bg-[#f0f8f1]'
                            : 'border-[#1a1a1a] bg-white hover:border-[#16873d] hover:shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <span className="font-body absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#16873d] text-xs font-bold text-white">
                            ✓
                          </span>
                        )}
                        <div className="flex h-16 shrink-0 items-start bg-[#e5e0d5] p-3">
                          <span className="text-2xl leading-none">{option.emoji}</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center px-4 py-3">
                          <p className="font-body font-semibold text-[#032014]">{option.label}</p>
                          <p className="font-body mt-1 text-sm text-[#4b6353]">{option.detail}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-3 items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-body justify-self-start rounded-md border-2 border-[#1a1a1a] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f5f7f3]"
                >
                  {currentQuestionIndex > 0 ? '← Back' : '← Start over'}
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="font-body justify-self-center text-sm font-semibold text-[#4b6353] transition hover:text-[#032014]"
                >
                  Skip this question →
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedAnswer && currentQuestionIndex < quizQuestions.length - 1}
                  className="font-body justify-self-end rounded-md bg-[#16873d] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1b9947] disabled:cursor-not-allowed disabled:bg-[#86b99c]"
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'See my match' : 'Next →'}
                </button>
              </div>
            </div>
          </>
        )}

        {status === 'result' && (
          <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
            <section className="px-6 py-8 sm:px-8 sm:py-10 md:px-16">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-[#16873d]">Your match</p>
              <h2 className="font-heading mt-2 text-2xl font-semibold text-[#032014] sm:text-3xl">{result.commonName}</h2>
              <p className="font-scientific mt-2 text-sm italic text-[#4b6353]">{result.scientificName}</p>
              <p className="font-body mt-4 text-sm leading-7 text-[#4b6353] sm:text-base">{result.description}</p>

              <div className="mt-6 rounded-3xl border border-[#dce7dc] bg-[#f7fbf6] p-4">
                <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#16873d]">Why this matched</p>
                <p className="font-body mt-2 text-sm leading-7 text-[#4b6353]">{result.headline}</p>
                <p className="font-body mt-3 text-sm font-semibold text-[#032014]">{result.highlight}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={handleRestart} className="font-body rounded-full bg-[#16873d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1b9947]">
                  Restart quiz
                </button>
                <Link href="/species" className="font-body rounded-full border border-[#16873d] px-4 py-2 text-sm font-semibold text-[#16873d] transition hover:bg-[#eef7ef]">
                  Browse species
                </Link>
              </div>
            </section>

            <aside className="bg-[#0a2818] px-6 py-8 text-white sm:px-8 sm:py-10 md:px-16">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-[#7fc49b]">What this means</p>
              <h2 className="font-heading mt-2 text-2xl font-semibold sm:text-3xl">A clear next step for the field guide</h2>
              <div className="font-body mt-6 space-y-4 text-sm leading-7 text-[#dcefe3]">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="font-body font-semibold text-white">Suggested habitat</p>
                  <p className="font-body mt-1">{result.habitat}</p>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="font-body font-semibold text-white">Likely region</p>
                  <p className="font-body mt-1">{result.region}</p>
                </div>
              </div>
            </aside>
          </div>
        )}

      {isExitDialogOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setIsExitDialogOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="exit-quiz-heading"
            onClick={(event) => event.stopPropagation()}
            className="font-body w-full max-w-sm rounded-3xl border border-[#dce7dc] bg-white p-6 shadow-lg"
          >
            <h2 id="exit-quiz-heading" className="font-heading text-lg font-semibold text-[#032014]">Exit quiz?</h2>
            <p className="font-body mt-2 text-sm leading-6 text-[#4b6353]">Your progress will be lost.</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsExitDialogOpen(false)}
                className="font-body rounded-full border border-[#dce7dc] px-4 py-2 text-sm font-semibold text-[#4b6353] transition hover:bg-[#f7fbf6]"
              >
                Keep going
              </button>
              <Link
                href="/"
                className="font-body rounded-full bg-[#16873d] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#1b9947]"
              >
                Exit quiz
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
