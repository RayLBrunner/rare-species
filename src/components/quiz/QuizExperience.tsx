'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import QuizResultView from './QuizResultView';

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
  slug: string;
  commonName: string;
  scientificName: string;
  authorName?: string;
  family: string;
  globalRank: string;
  stateRank: string;
  federalRank?: string;
  stateStatus?: string;
  orbicList?: string;
  description: string;
  whyMatched: string;
  ecoregionLabel: string;
  occurrences: number;
  occurrencesPre2000: number;
  occurrencesPost2000: number;
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
      slug: '2487-abronia-umbellata-ssp-breviflora',
      commonName: 'Pink sandverbena',
      scientificName: 'Abronia umbellata ssp. breviflora',
      authorName: '(Standl.) Munz',
      family: 'Nyctaginaceae',
      globalRank: 'G4G5T2',
      stateRank: 'S1',
      federalRank: 'SOC',
      stateStatus: 'LE',
      orbicList: '1',
      description:
        'A prostrate, fleshy-leaved herb with clusters of pink flowers, found on littoral beaches and unstabilized coastal dunes.',
      whyMatched:
        'Your answer pointed straight to the beach — dunes and shifting coastal sand are exactly where this species makes its stand.',
      ecoregionLabel: 'Coast Range',
      occurrences: 25,
      occurrencesPre2000: 13,
      occurrencesPost2000: 12,
    };
  }

  if (habitat === 'wetland' && kingdom === 'animal' && orbic === 'sprint') {
    return {
      slug: '35-rana-pretiosa',
      commonName: 'Oregon spotted frog',
      scientificName: 'Rana pretiosa',
      authorName: 'Baird and Girard, 1853',
      family: 'Ranidae',
      globalRank: 'G2',
      stateRank: 'S1S2',
      federalRank: 'T',
      stateStatus: 'SC',
      orbicList: '1',
      description:
        'A highly aquatic frog that rarely strays from pond edges, marshes, and slow streams thick with emergent vegetation.',
      whyMatched:
        "Wetlands, animals, and a sense of urgency — this frog has disappeared from over 70% of its historic Oregon range and needs exactly that kind of attention.",
      ecoregionLabel: 'Blue Mountains · Columbia Basin · East Cascades · West Cascades · Willamette Valley',
      occurrences: 88,
      occurrencesPre2000: 42,
      occurrencesPost2000: 46,
    };
  }

  return {
    slug: '2363-lupinus-oreganus',
    commonName: "Kincaid's lupine",
    scientificName: 'Lupinus oreganus',
    authorName: 'Heller',
    family: 'Fabaceae',
    globalRank: 'G2',
    stateRank: 'S2',
    federalRank: 'T',
    stateStatus: 'LT',
    orbicList: '1',
    description:
      "A perennial lupine endemic to upland prairies of the Willamette Valley — and the sole host plant of the Fender's blue butterfly.",
    whyMatched:
      "Your answers pointed toward valley landscapes and native plant communities. Kincaid's lupine fits every one of those filters.",
    ecoregionLabel: 'Klamath Mountains · West Cascades · Willamette Valley',
    occurrences: 119,
    occurrencesPre2000: 88,
    occurrencesPost2000: 31,
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
          {status === 'result' ? (
            <button
              type="button"
              onClick={handleRestart}
              className="font-body text-sm font-medium text-[#dcefe3] transition hover:text-white"
            >
              ↻ Try again
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsExitDialogOpen(true)}
              className="font-body text-sm font-medium text-[#dcefe3] transition hover:text-white"
            >
              ✕ Exit quiz
            </button>
          )}
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
                  disabled={currentQuestionIndex === 0}
                  className="font-body justify-self-start rounded-md border-2 border-[#1a1a1a] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f5f7f3] disabled:cursor-not-allowed disabled:border-[#1a1a1a]/30 disabled:text-[#1a1a1a]/30 disabled:hover:bg-white"
                >
                  {currentQuestionIndex > 0 ? '← Back' : '← Start over'}
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="font-body justify-self-center text-sm font-semibold text-[#4b6353] transition hover:text-[#032014]"
                >
                  Choose for me →
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

        {status === 'result' && <QuizResultView result={result} onRestart={handleRestart} />}

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
