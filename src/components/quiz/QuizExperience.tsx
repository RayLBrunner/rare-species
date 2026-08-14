"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Species } from "@/types/species";
import { questions } from "@/data/questions";
import { filterSpecies, pickResult } from "@/lib/quiz";
import speciesData from "@/data/species.json";
import QuizResultView from "./QuizResultView";
import Image from "next/image";

export default function QuizExperience() {
  const [status, setStatus] = useState<"question" | "result">("question");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const allSpecies = speciesData as unknown as Species[];

  // Recompute the filtered pool every time answers change so countLabel stays live
  const currentPool = useMemo(
    () => filterSpecies(allSpecies, answers),
    [answers, allSpecies]
  );

  // Only pick a final result when the quiz is complete
  const result = useMemo(
    () => pickResult(currentPool, allSpecies),
    [currentPool, allSpecies]
  );

  // Filter questions based on showIf — only show questions whose condition is met
  const visibleQuestions = useMemo(() => {
    return questions.filter((question) => {
      if (!question.showIf) return true;
      // Skip G1 — stateRank question has showIf pointing to globalRank G1
      // but we actually want to SKIP it when G1 is picked, not show it
      if (question.id === "stateRank") {
        return (
          answers["globalRank"] !== "G1" && answers["globalRank"] !== undefined
        );
      }
      return answers[question.showIf.questionId] === question.showIf.value;
    });
  }, [answers]);

  useEffect(() => {
    if (!isExitDialogOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExitDialogOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExitDialogOpen]);

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const progress = currentQuestion
    ? ((currentQuestionIndex + 1) / visibleQuestions.length) * 100
    : 0;

  const handleSelect = (value: string) => {
    const currentId = currentQuestion.id;
    const currentIndex = visibleQuestions.findIndex((q) => q.id === currentId);
    // Clear answers for all questions after the current one
    // so the pool recalculates correctly when the user changes an earlier answer
    setAnswers((previous) => {
      const updated: Record<string, string> = {};
      visibleQuestions.forEach((q, index) => {
        if (index < currentIndex && previous[q.id]) {
          updated[q.id] = previous[q.id];
        }
      });
      updated[currentId] = value;
      return updated;
    });
  };

  const handleNext = () => {
    if (!selectedAnswer && currentQuestionIndex < visibleQuestions.length - 1) {
      return;
    }

    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
      return;
    }

    setStatus("result");
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((previous) => previous - 1);
      return;
    }

    setCurrentQuestionIndex(0);
  };

  const handleSkip = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
      return;
    }

    setStatus("result");
  };

  const handleRestart = () => {
    setStatus("question");
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  return (
    <div className="font-body flex w-full flex-1 flex-col bg-white">
      <header className="bg-[#0a2818] text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-4 sm:px-8 md:px-16">
          <p className="font-heading text-sm font-semibold sm:text-base">
            ORBIC · Which Oregon rare species are you?
          </p>
          {status === "result" ? (
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
        <div
          className="h-full bg-[#16873d] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {status === "question" && currentQuestion && (
        <>
          <div className="border-b border-[#e7e2d2] bg-[#f6f3ea]">
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-6 py-3 sm:px-8 md:px-16">
              <div className="flex items-center gap-2">
                {visibleQuestions.map((question, index) => {
                  const step = index + 1;
                  const isComplete = index < currentQuestionIndex;
                  const isActive = index === currentQuestionIndex;

                  return (
                    <div
                      key={question.id}
                      className={`font-body flex h-7 w-7 items-center justify-center rounded-sm border text-xs font-semibold ${
                        isComplete
                          ? "border-[#16873d] bg-[#16873d] text-white"
                          : isActive
                            ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                            : "border-[#1a1a1a]/30 bg-white text-[#1a1a1a]"
                      }`}
                    >
                      {isComplete ? "✓" : step}
                    </div>
                  );
                })}
              </div>
              <div className="font-body ml-auto text-sm font-semibold text-[#16873d]">
                {currentPool.length === 0 ? (
                  "We found something special for you"
                ) : (
                  <>{currentPool.length} species still in the running</>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-8 sm:py-6 md:px-16">
            <h2 className="font-heading text-2xl font-bold text-[#032014] sm:text-3xl">
              {currentQuestion.prompt}
            </h2>
            <p className="font-body mt-2 text-sm text-[#4b6353] sm:text-base">
              {currentQuestion.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-6">
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
                          ? "border-[#16873d] bg-[#f0f8f1]"
                          : "border-[#1a1a1a] bg-white hover:border-[#16873d] hover:shadow-sm"
                      }`}
                    >
                      {isSelected && (
                        <span className="font-body absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#16873d] text-xs font-bold text-white">
                          ✓
                        </span>
                      )}
                      <div
                        className={`relative shrink-0 overflow-hidden bg-[#e5e0d5] ${
                          option.image ? "aspect-video w-full" : "h-16 w-full"
                        }`}
                      >
                        {option.image ? (
                          <Image
                            src={option.image}
                            alt={option.label}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-start p-3">
                            <span className="text-2xl leading-none">
                              {option.emoji}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-center px-4 py-3">
                        <p className="font-body font-semibold text-[#032014]">
                          {option.label}
                        </p>
                        <p className="font-body mt-1 text-sm text-[#4b6353]">
                          {option.detail}
                        </p>
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
                {currentQuestionIndex > 0 ? "← Back" : "← Start over"}
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="font-body justify-self-center text-sm font-semibold text-[#4b6353] transition hover:text-[#032014]"
              >
                I can&apos;t choose →
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !selectedAnswer &&
                  currentQuestionIndex < visibleQuestions.length - 1
                }
                className="font-body justify-self-end rounded-md bg-[#16873d] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1b9947] disabled:cursor-not-allowed disabled:bg-[#86b99c]"
              >
                {currentQuestionIndex === visibleQuestions.length - 1
                  ? "See my match"
                  : "Next →"}
              </button>
            </div>
          </div>
        </>
      )}

      {status === "result" && (
        <QuizResultView result={result} onRestart={handleRestart} />
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
            <h2
              id="exit-quiz-heading"
              className="font-heading text-lg font-semibold text-[#032014]"
            >
              Exit quiz?
            </h2>
            <p className="font-body mt-2 text-sm leading-6 text-[#4b6353]">
              Your progress will be lost.
            </p>
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
