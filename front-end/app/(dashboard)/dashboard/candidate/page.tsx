"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useDisclosure } from "@heroui/modal";
import {
    BriefcaseIcon,
    CheckBadgeIcon,
    AcademicCapIcon,
    SparklesIcon,
    ClockIcon,
    BuildingOfficeIcon,
    ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import type { JobDescription, Quiz } from "@/lib/types/index";
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

import * as authSlice from "@/lib/redux/slices/authSlice"

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import {
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { fetchJobOffers } from "@/lib/redux/slices/jobOffersSlice";
import { useDispatch } from "react-redux";

interface CVUploadModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CVUploadModal({ isOpen, onOpenChange }: CVUploadModalProps) {
    const [uploadedCV, setUploadedCV] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const user = useAppSelector(state => state.auth.user);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.type !== "application/pdf") {
                addToast({
                    title: "Formato non valido",
                    description: "Si accettano solo file PDF",
                    severity: "warning",
                });
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                addToast({
                    title: "File troppo grande",
                    description: "Il file non deve superare i 5MB",
                    severity: "warning",
                });
                return;
            }

            setUploadedCV(file);
        }
    };

    const handleUploadCV = async () => {
        if (!uploadedCV) {
            addToast({
                title: "Nessun file selezionato",
                description: "Seleziona un file PDF prima di caricare",
                severity: "warning",
            });
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", uploadedCV);
            formData.append("consent", "true");
            formData.append("candidate_id", user?.id!);

            const response = await fetch('/api/upload-cv', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Errore durante il caricamento del CV');
            }

            const data = await response.json();

            addToast({
                title: "CV caricato con successo",
                description: "Il tuo curriculum è stato caricato correttamente",
                severity: "success",
            });

            // Reset stato e chiudi modale
            setUploadedCV(null);
            onOpenChange(false);
        } catch (error) {
            addToast({
                title: "Errore",
                description: "Impossibile caricare il CV",
                severity: "warning",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        if (!isUploading) {
            setUploadedCV(null);
            onOpenChange(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            isDismissable={!isUploading}
            hideCloseButton={isUploading}
            classNames={{
                base: "bg-white dark:bg-gray-900",
                backdrop: "bg-black/50 backdrop-blur-sm"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-11 h-11 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-100 dark:border-blue-900">
                                    <DocumentArrowUpIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Carica il tuo CV</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                        Formato PDF, massimo 5MB
                                    </p>
                                </div>
                            </div>
                        </ModalHeader>

                        <ModalBody className="py-6">
                            <div className="space-y-5">
                                <label
                                    htmlFor="cv-upload-modal"
                                    className="flex items-center justify-center w-full h-52 px-4 transition-all duration-200 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        {uploadedCV ? (
                                            <>
                                                <div className="flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-950 rounded-full border-2 border-green-200 dark:border-green-800">
                                                    <DocumentTextIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                                </div>
                                                <span className="text-base font-medium text-gray-900 dark:text-white">
                                                    {uploadedCV.name}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {(uploadedCV.size / 1024 / 1024).toFixed(2)} MB
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="default"
                                                    onPress={() => setUploadedCV(null)}
                                                    className="mt-2"
                                                >
                                                    Rimuovi file
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700">
                                                    <DocumentArrowUpIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                                </div>
                                                <div className="text-center">
                                                    <span className="text-base font-medium text-gray-700 dark:text-gray-300 block">
                                                        Clicca per selezionare un file
                                                    </span>
                                                    <span className="text-sm text-gray-400 dark:text-gray-500 mt-1 block">
                                                        oppure trascinalo qui
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                                                    PDF • Max 5MB
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="cv-upload-modal"
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={isUploading}
                                    />
                                </label>

                                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 p-4 rounded-xl">
                                    <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                                        <SparklesIcon className="w-4 h-4 text-blue-600" />
                                        Informazioni importanti
                                    </h3>
                                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Il CV deve essere in formato PDF</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>La dimensione massima è di 5MB</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>Il file verrà analizzato automaticamente</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span>I tuoi dati saranno trattati in modo confidenziale</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
                            <Button
                                variant="light"
                                onPress={handleClose}
                                isDisabled={isUploading}
                                className="font-medium"
                            >
                                Annulla
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleUploadCV}
                                isLoading={isUploading}
                                isDisabled={!uploadedCV}
                                className="bg-blue-600 hover:bg-blue-700 font-semibold"
                            >
                                {isUploading ? "Caricamento..." : "Carica CV"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

interface NavbarProps {
    onOpenCVModal: () => void;
}



export function Navbar({ onOpenCVModal }: NavbarProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function logout() {
        try {
            await dispatch(authSlice.logout());
            router.push('/landing');
        } catch (err) {
            addToast({
                title: "Accesso non riuscito",
                description: "Errore durante il logout.",
                severity: "warning",
            });
        }
    }

    return (
        <NextUINavbar
            isBordered
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
            maxWidth="full"
            height="70px"
        >
            <NavbarBrand>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                        <span className="text-white font-bold text-lg">AR</span>
                    </div>
                    <div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                            SkillQUest
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Il tuo futuro professionale
                        </p>
                    </div>
                </div>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        color="primary"
                        variant="flat"
                        startContent={<DocumentArrowUpIcon className="w-4 h-4" />}
                        onPress={onOpenCVModal}
                        className="font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
                    >
                        Carica CV
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        color="primary"
                        variant="flat"
                        startContent={<ArrowRightStartOnRectangleIcon className="w-4 h-4" />}
                        onPress={logout}
                        className="font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
                    >
                        Esci
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
}

export default function UserDashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [jobOffers, setJobOffers] = useState<JobDescription[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useAppSelector(state => state.auth.user);


    useEffect(() => {
        // Carica le job offers e i quiz disponibili
        fetchJobOfferss();
    }, []);

    const fetchJobOfferss = async () => {
        try {
            setIsLoading(true);

            const result = await dispatch(fetchJobOffers()).unwrap();

            setJobOffers(result.jobOffers);
            setQuizzes(result.quizzes);
        } catch (error) {
            console.log(error);

            addToast({
                title: "Errore",
                description: "Impossibile caricare le offerte di lavoro",
                severity: "warning",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartQuiz = (jobDescriptionId: string) => {
        const quiz = quizzes.find(q => q.job_description_id === jobDescriptionId);

        if (quiz) {
            router.push(`/quiz/${quiz._id}`);
        } else {
            addToast({
                title: "Quiz non disponibile",
                description: "Al momento non c'è un quiz disponibile per questa posizione",
                severity: "warning",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Navbar */}
            <Navbar onOpenCVModal={onOpen} />

            {/* CV Upload Modal */}
            <CVUploadModal isOpen={isOpen} onOpenChange={onOpenChange} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <SparklesIcon className="w-4 h-4" />
                        Trova la tua opportunità ideale
                    </div>
                    <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                        Posizioni Aperte
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Esplora le opportunità di carriera disponibili e inizia il tuo percorso di candidatura
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                <BriefcaseIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Posizioni</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{jobOffers.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-green-50 dark:bg-green-950 rounded-lg">
                                <BuildingOfficeIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Aziende</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{new Set(quizzes.map((e) => e.azienda_nome)).size}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-purple-50 dark:bg-purple-950 rounded-lg">
                                <ClockIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Tempo medio</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">15 min</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Offers Section */}
                <div>
                    {isLoading ? (
                        <Card className="border border-gray-200 dark:border-gray-800">
                            <CardBody className="px-6 py-16">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
                                    <p className="text-gray-500 dark:text-gray-400">Caricamento offerte...</p>
                                </div>
                            </CardBody>
                        </Card>
                    ) : jobOffers.length === 0 ? (
                        <Card className="border border-gray-200 dark:border-gray-800">
                            <CardBody className="px-6 py-16">
                                <div className="text-center">
                                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4">
                                        <BriefcaseIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Nessuna posizione disponibile
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Torna a visitarci presto per nuove opportunità
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobOffers.map((job) => {
                                const quiz = quizzes.find(q => q.job_description_id === job._id);

                                return (
                                    <Card
                                        key={job._id}
                                        className="border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900"
                                    >
                                        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                                            <div className="w-full">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.ruolo}</h3>
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-none font-medium"
                                                    >
                                                        {job.livello}
                                                    </Chip>
                                                </div>
                                                {quiz && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <AcademicCapIcon className="w-4 h-4" />
                                                        <span>{quiz.azienda_nome}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardBody className="px-6 py-5">
                                            <div className="space-y-5">
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                                        Responsabilità principali
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {job.responsabilità.slice(0, 2).map((resp, idx) => (
                                                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                                                <CheckBadgeIcon className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                                                <span>{resp}</span>
                                                            </li>
                                                        ))}
                                                        {job.responsabilità.length > 2 && (
                                                            <li className="text-xs text-gray-400 dark:text-gray-500 pl-6 font-medium">
                                                                +{job.responsabilità.length - 2} altre responsabilità
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                                        Competenze richieste
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.competenze_richieste.slice(0, 4).map((skill, idx) => (
                                                            <Chip
                                                                key={idx}
                                                                size="sm"
                                                                variant="flat"
                                                                className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-none text-xs font-medium"
                                                            >
                                                                {skill}
                                                            </Chip>
                                                        ))}
                                                        {job.competenze_richieste.length > 4 && (
                                                            <Chip
                                                                size="sm"
                                                                variant="flat"
                                                                className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-none text-xs font-medium"
                                                            >
                                                                +{job.competenze_richieste.length - 4}
                                                            </Chip>
                                                        )}
                                                    </div>
                                                </div>

                                                {quiz && (
                                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center justify-between text-sm mb-3">
                                                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                                Quiz disponibile
                                                            </span>
                                                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                                {quiz.totale_domande} domande
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {quiz.tipi_quiz.map((tipo, idx) => (
                                                                <Chip
                                                                    key={idx}
                                                                    size="sm"
                                                                    variant="dot"
                                                                    className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-none text-xs"
                                                                >
                                                                    {tipo}
                                                                </Chip>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardBody>

                                        <CardFooter className="px-6 pb-6 pt-2">
                                            <Button
                                                color="primary"
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
                                                onPress={() => handleStartQuiz(job._id)}
                                                isDisabled={!quiz}
                                            >
                                                {quiz ? "Inizia Quiz" : "Quiz non disponibile"}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}