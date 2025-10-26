"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { RadioGroup, Radio } from "@heroui/radio";
import { addToast } from "@heroui/toast";
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    TrophyIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowRightIcon,
    DocumentTextIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectQuizzes } from "@/lib/redux/slices/jobOffersSlice";
import type { Quiz, QuizQuestion } from "@/lib/types";

interface QuizAnswer {
    questionIndex: number;
    selectedOption: number;
    isCorrect: boolean;
    timeSpent: number;
}

export default function QuizPage() {
    const router = useRouter();
    const params = useParams();
    const quizId = params?.id as string;

    // Redux state
    const quizzes = useAppSelector(selectQuizzes);

    // Local state
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);
    const [timeSpent, setTimeSpent] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());

    // Timer per tracciare il tempo
    useEffect(() => {
        if (!isQuizCompleted) {
            const interval = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isQuizCompleted]);

    // Carica il quiz
    useEffect(() => {
        const loadQuiz = async () => {
            setIsLoadingQuiz(true);

            try {
                // Prima cerca nei quiz già caricati
                const foundQuiz = quizzes.find(q => q._id === quizId);

                if (foundQuiz && foundQuiz.domande && foundQuiz.domande.length > 0) {
                    setQuiz(foundQuiz);
                } else {
                    // Se il quiz non ha domande, caricale dall'API
                    const response = await fetch(`/api/quiz/${quizId}`);

                    if (!response.ok) {
                        throw new Error('Quiz non trovato');
                    }

                    const data = await response.json();
                    setQuiz(data.quiz);
                }
            } catch (error) {
                addToast({
                    title: "Errore",
                    description: "Impossibile caricare il quiz",
                    severity: "warning",
                });
                router.push('/dashboard/candidate');
            } finally {
                setIsLoadingQuiz(false);
            }
        };

        if (quizId) {
            loadQuiz();
        }
    }, [quizId, quizzes, router]);

    const currentQuestion = quiz?.domande[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === (quiz?.domande.length || 0) - 1;
    const progress = quiz ? ((currentQuestionIndex + 1) / quiz.domande.length) * 100 : 0;

    // Calcola i risultati
    const results = useMemo(() => {
        if (!isQuizCompleted || !quiz) return null;

        const totalQuestions = quiz.domande.length;
        const correctAnswers = answers.filter(a => a.isCorrect).length;
        const incorrectAnswers = totalQuestions - correctAnswers;
        const totalScore = answers.reduce((sum, answer) => {
            if (answer.isCorrect) {
                const question = quiz.domande[answer.questionIndex];
                return sum + (question?.punteggio || 0);
            }
            return sum;
        }, 0);
        const maxScore = quiz.domande.reduce((sum, q) => sum + (q.punteggio || 0), 0);
        const percentage = (totalScore / maxScore) * 100;

        return {
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            totalScore,
            maxScore,
            percentage,
            timeSpent,
        };
    }, [isQuizCompleted, answers, quiz, timeSpent]);

    const handleOptionSelect = (optionIndex: number) => {
        setSelectedOption(optionIndex);
    };

    const handleNextQuestion = () => {
        if (selectedOption === null) {
            addToast({
                title: "Seleziona una risposta",
                description: "Devi selezionare una risposta prima di continuare",
                severity: "warning",
            });
            return;
        }

        if (!currentQuestion) return;

        const timeForQuestion = Math.floor((Date.now() - questionStartTime) / 1000);
        const isCorrect = selectedOption === currentQuestion.risposta_corretta;

        const newAnswer: QuizAnswer = {
            questionIndex: currentQuestionIndex,
            selectedOption,
            isCorrect,
            timeSpent: timeForQuestion,
        };

        setAnswers(prev => [...prev, newAnswer]);

        if (isLastQuestion) {
            setIsQuizCompleted(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setQuestionStartTime(Date.now());
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            const previousAnswer = answers[currentQuestionIndex - 1];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selectedOption);
            } else {
                setSelectedOption(null);
            }
        }
    };

    const handleSubmitQuiz = async () => {
        if (!quiz || !results) return;

        try {
            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizId: quiz._id,
                    answers,
                    results,
                }),
            });

            if (response.ok) {
                addToast({
                    title: "Quiz completato!",
                    description: "I tuoi risultati sono stati salvati",
                    severity: "success",
                });
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getPerformanceLevel = (percentage: number) => {
        if (percentage >= 90) return { label: 'Eccellente', color: 'bg-green-500', textColor: 'text-green-700' };
        if (percentage >= 75) return { label: 'Ottimo', color: 'bg-blue-500', textColor: 'text-blue-700' };
        if (percentage >= 60) return { label: 'Buono', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
        return { label: 'Da migliorare', color: 'bg-red-500', textColor: 'text-red-700' };
    };

    // Loading state
    if (isLoadingQuiz) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <Card className="border border-gray-200 dark:border-gray-800 w-full max-w-md">
                    <CardBody className="py-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
                            <p className="text-gray-600 dark:text-gray-400">Caricamento quiz...</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    // Quiz not found
    if (!quiz) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
                <Card className="border border-gray-200 dark:border-gray-800 w-full max-w-md">
                    <CardBody className="py-12">
                        <div className="text-center">
                            <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Quiz non trovato
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Il quiz che stai cercando non esiste o non è più disponibile
                            </p>
                            <Button
                                color="primary"
                                onPress={() => router.push('/dashboard/candidate')}
                                className="bg-blue-600"
                            >
                                Torna alla Dashboard
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    // Results screen
    if (isQuizCompleted && results) {
        const performance = getPerformanceLevel(results.percentage);

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Results */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <CheckCircleIcon className="w-4 h-4" />
                            Quiz Completato
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Ottimo lavoro!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Ecco i risultati del tuo quiz per <span className="font-semibold">{quiz.ruolo}</span>
                        </p>
                    </div>

                    {/* Score Card */}
                    <Card className="border border-gray-200 dark:border-gray-800 mb-6">
                        <CardBody className="p-8">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-800 flex items-center justify-center bg-white dark:bg-gray-900">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                                {results.percentage.toFixed(0)}%
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {results.totalScore}/{results.maxScore} punti
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -top-2 -right-2">
                                        <TrophyIcon className={`w-12 h-12 ${results.percentage >= 75 ? 'text-yellow-500' : 'text-gray-400'}`} />
                                    </div>
                                </div>

                                <div className="mt-6 text-center">
                                    <Chip
                                        variant="flat"
                                        className={`${performance.color} text-white font-semibold px-6 py-1`}
                                    >
                                        {performance.label}
                                    </Chip>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="border border-gray-200 dark:border-gray-800">
                            <CardBody className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg">
                                        <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Risposte Corrette</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {results.correctAnswers}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-800">
                            <CardBody className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-950 rounded-lg">
                                        <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Risposte Errate</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {results.incorrectAnswers}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-800">
                            <CardBody className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                        <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tempo Totale</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {formatTime(results.timeSpent)}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Detailed Answers */}
                    <Card className="border border-gray-200 dark:border-gray-800 mb-6">
                        <CardHeader className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Riepilogo Risposte
                            </h3>
                        </CardHeader>
                        <CardBody className="p-6">
                            <div className="space-y-4">
                                {quiz.domande.map((question, index) => {
                                    const answer = answers[index];
                                    const isCorrect = answer?.isCorrect;

                                    return (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border-2 ${isCorrect
                                                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
                                                : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 mt-1">
                                                    {isCorrect ? (
                                                        <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                    ) : (
                                                        <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                                                        Domanda {index + 1}: {question.testo}
                                                    </p>
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">Tua risposta:</span>{' '}
                                                            {question.opzioni[answer?.selectedOption || 0]}
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="text-green-700 dark:text-green-300">
                                                                <span className="font-medium">Risposta corretta:</span>{' '}
                                                                {question.opzioni[question.risposta_corretta]}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    className={`${isCorrect
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                        }`}
                                                >
                                                    {question.punteggio} pt
                                                </Chip>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center">
                        <Button
                            variant="bordered"
                            onPress={() => router.push('/dashboard/candidate')}
                            className="font-semibold"
                        >
                            Torna alla Dashboard
                        </Button>
                        <Button
                            color="primary"
                            onPress={handleSubmitQuiz}
                            className="bg-blue-600 font-semibold"
                        >
                            Salva Risultati
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Quiz in progress
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {quiz.ruolo} - {quiz.livello}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {quiz.azienda_nome}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800">
                                <ClockIcon className="w-5 h-5 text-gray-500" />
                                <span className="font-mono font-semibold text-gray-900 dark:text-white">
                                    {formatTime(timeSpent)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                                Domanda {currentQuestionIndex + 1} di {quiz.domande.length}
                            </span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {progress.toFixed(0)}%
                            </span>
                        </div>
                        <Progress
                            value={progress}
                            className="h-2"
                            classNames={{
                                indicator: "bg-blue-600"
                            }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                {currentQuestion && (
                    <Card className="border border-gray-200 dark:border-gray-800 mb-6">
                        <CardHeader className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                            <div className="flex items-start justify-between w-full">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                                        >
                                            {currentQuestion.tipo_quiz}
                                        </Chip>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                        >
                                            Difficoltà: {currentQuestion.difficolta}/5
                                        </Chip>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {currentQuestion.testo}
                                    </h2>
                                </div>
                                <Chip
                                    variant="flat"
                                    className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 font-semibold"
                                >
                                    {currentQuestion.punteggio} punti
                                </Chip>
                            </div>
                        </CardHeader>

                        <CardBody className="p-6">
                            <RadioGroup
                                value={selectedOption?.toString()}
                                onValueChange={(value) => handleOptionSelect(parseInt(value))}
                            >
                                <div className="space-y-3">
                                    {currentQuestion.opzioni.map((option, index) => (
                                        <Radio
                                            key={index}
                                            value={index.toString()}
                                            classNames={{
                                                base: "inline-flex m-0 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-between flex-row-reverse w-full max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-gray-200 dark:border-gray-800 data-[selected=true]:border-blue-600 dark:data-[selected=true]:border-blue-600",
                                                label: "text-gray-900 dark:text-white font-medium"
                                            }}
                                        >
                                            {option}
                                        </Radio>
                                    ))}
                                </div>
                            </RadioGroup>
                        </CardBody>

                        <CardFooter className="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
                            <div className="flex justify-between w-full gap-4">
                                <Button
                                    variant="bordered"
                                    onPress={handlePreviousQuestion}
                                    isDisabled={currentQuestionIndex === 0}
                                    startContent={<ChevronLeftIcon className="w-4 h-4" />}
                                >
                                    Precedente
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleNextQuestion}
                                    endContent={
                                        isLastQuestion ? (
                                            <CheckCircleIcon className="w-5 h-5" />
                                        ) : (
                                            <ChevronRightIcon className="w-4 h-4" />
                                        )
                                    }
                                    className="bg-blue-600 font-semibold"
                                >
                                    {isLastQuestion ? 'Completa Quiz' : 'Prossima'}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                )}

                {/* Question Navigator */}
                <Card className="border border-gray-200 dark:border-gray-800">
                    <CardBody className="p-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                                Domande:
                            </span>
                            {quiz.domande.map((_, index) => {
                                const isAnswered = answers.some(a => a.questionIndex === index);
                                const isCurrent = index === currentQuestionIndex;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                            const answer = answers[index];
                                            setSelectedOption(answer?.selectedOption ?? null);
                                        }}
                                        className={`
                                            w-10 h-10 rounded-lg font-semibold text-sm transition-all
                                            ${isCurrent
                                                ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                                                : isAnswered
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-300 dark:border-green-700'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                                            }
                                            hover:scale-105
                                        `}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}