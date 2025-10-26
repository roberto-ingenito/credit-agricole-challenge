"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    PlusIcon,
    TrophyIcon,
    UserGroupIcon,
    ChartBarIcon,
    CheckBadgeIcon,
    ClockIcon,
    StarIcon,
} from "@heroicons/react/24/outline";

// Dati fittizi
const mockJobOffers = [
    {
        id: "1",
        ruolo: "Senior Frontend Developer",
        livello: "Senior",
        azienda: "TechCorp Italia",
        competenze: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        candidati_totali: 45,
        data_pubblicazione: "2024-01-15",
    },
    {
        id: "2",
        ruolo: "UX/UI Designer",
        livello: "Mid-Level",
        azienda: "Creative Studio",
        competenze: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        candidati_totali: 32,
        data_pubblicazione: "2024-01-18",
    },
    {
        id: "3",
        ruolo: "Data Scientist",
        livello: "Junior",
        azienda: "DataVision Labs",
        competenze: ["Python", "Machine Learning", "SQL", "Pandas"],
        candidati_totali: 28,
        data_pubblicazione: "2024-01-20",
    },
];

const mockCandidates = {
    "1": [
        {
            nome: "Marco Rossi",
            punteggio: 95,
            tempo: "12:34",
            cv_match: 88,
            data_completamento: "2024-01-22",
            status: "excellent",
        },
        {
            nome: "Laura Bianchi",
            punteggio: 92,
            tempo: "14:20",
            cv_match: 85,
            data_completamento: "2024-01-22",
            status: "excellent",
        },
        {
            nome: "Giuseppe Verdi",
            punteggio: 88,
            tempo: "15:45",
            cv_match: 82,
            data_completamento: "2024-01-23",
            status: "passed",
        },
        {
            nome: "Anna Ferrari",
            punteggio: 85,
            tempo: "13:12",
            cv_match: 79,
            data_completamento: "2024-01-23",
            status: "passed",
        },
        {
            nome: "Luca Romano",
            punteggio: 78,
            tempo: "16:30",
            cv_match: 75,
            data_completamento: "2024-01-24",
            status: "passed",
        },
    ],
    "2": [
        {
            nome: "Giulia Martini",
            punteggio: 94,
            tempo: "11:20",
            cv_match: 91,
            data_completamento: "2024-01-21",
            status: "excellent",
        },
        {
            nome: "Andrea Costa",
            punteggio: 89,
            tempo: "13:45",
            cv_match: 86,
            data_completamento: "2024-01-21",
            status: "passed",
        },
        {
            nome: "Elena Ricci",
            punteggio: 84,
            tempo: "14:50",
            cv_match: 80,
            data_completamento: "2024-01-22",
            status: "passed",
        },
    ],
    "3": [
        {
            nome: "Francesco Lombardi",
            punteggio: 91,
            tempo: "15:10",
            cv_match: 87,
            data_completamento: "2024-01-23",
            status: "excellent",
        },
        {
            nome: "Chiara Moretti",
            punteggio: 86,
            tempo: "16:25",
            cv_match: 83,
            data_completamento: "2024-01-23",
            status: "passed",
        },
    ],
};

function HRNavbar({ onOpenCreateModal }: { onOpenCreateModal: () => void }) {
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
                        <span className="text-white font-bold text-lg">HR</span>
                    </div>
                    <div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                            SkillQuest
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Gestione Recruiting
                        </p>
                    </div>
                </div>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        color="primary"
                        startContent={<PlusIcon className="w-4 h-4" />}
                        onPress={onOpenCreateModal}
                        className="font-semibold bg-blue-600 hover:bg-blue-700"
                    >
                        Nuova Job Offer
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
}

function CreateJobOfferModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            scrollBehavior="inside"
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
                                    <BriefcaseIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Crea Nuova Job Offer</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                        Compila i dettagli della posizione lavorativa
                                    </p>
                                </div>
                            </div>
                        </ModalHeader>

                        <ModalBody className="py-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Titolo Posizione"
                                        placeholder="es. Senior Developer"
                                        labelPlacement="outside"
                                    />
                                    <Select
                                        label="Livello"
                                        placeholder="Seleziona livello"
                                        labelPlacement="outside"
                                    >
                                        <SelectItem key="junior">Junior</SelectItem>
                                        <SelectItem key="mid">Mid-Level</SelectItem>
                                        <SelectItem key="senior">Senior</SelectItem>
                                    </Select>
                                </div>

                                <Input
                                    label="Azienda"
                                    placeholder="Nome azienda"
                                    labelPlacement="outside"
                                />

                                <Textarea
                                    label="Descrizione"
                                    placeholder="Descrivi la posizione..."
                                    labelPlacement="outside"
                                    minRows={3}
                                />

                                <Textarea
                                    label="Competenze Richieste"
                                    placeholder="Inserisci le competenze separate da virgola"
                                    labelPlacement="outside"
                                    minRows={2}
                                />

                                <Textarea
                                    label="Responsabilità"
                                    placeholder="Elenca le responsabilità principali"
                                    labelPlacement="outside"
                                    minRows={3}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="RAL Min"
                                        placeholder="30000"
                                        labelPlacement="outside"
                                        startContent={<span className="text-gray-500">€</span>}
                                    />
                                    <Input
                                        label="RAL Max"
                                        placeholder="45000"
                                        labelPlacement="outside"
                                        startContent={<span className="text-gray-500">€</span>}
                                    />
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
                            <Button
                                variant="light"
                                onPress={onClose}
                                className="font-medium"
                            >
                                Annulla
                            </Button>
                            <Button
                                color="primary"
                                onPress={onClose}
                                className="bg-blue-600 hover:bg-blue-700 font-semibold"
                            >
                                Pubblica Posizione
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

function CandidatesRankingModal({
    isOpen,
    onOpenChange,
    jobOffer
}: {
    isOpen: boolean;
    onOpenChange: () => void;
    jobOffer: typeof mockJobOffers[0] | null;
}) {
    if (!jobOffer) return null;

    const candidates = mockCandidates[jobOffer.id as keyof typeof mockCandidates] || [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "excellent": return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800";
            case "passed": return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
            default: return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "excellent": return "Eccellente";
            case "passed": return "Superato";
            default: return "In Revisione";
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="4xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-white dark:bg-gray-900",
                backdrop: "bg-black/50 backdrop-blur-sm"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-11 h-11 bg-yellow-50 dark:bg-yellow-950 rounded-xl border border-yellow-100 dark:border-yellow-900">
                                        <TrophyIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {jobOffer.ruolo}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                            {jobOffer.azienda} • {candidates.length} candidati
                                        </p>
                                    </div>
                                </div>
                                <Chip
                                    size="lg"
                                    variant="flat"
                                    className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold"
                                >
                                    {jobOffer.livello}
                                </Chip>
                            </div>
                        </ModalHeader>

                        <ModalBody className="py-6">
                            {/* Stats Summary */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900">
                                    <div className="flex items-center gap-3">
                                        <UserGroupIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Totale</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {candidates.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-100 dark:border-green-900">
                                    <div className="flex items-center gap-3">
                                        <CheckBadgeIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Eccellenti</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {candidates.filter(c => c.status === "excellent").length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900">
                                    <div className="flex items-center gap-3">
                                        <ChartBarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Media</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {Math.round(candidates.reduce((sum, c) => sum + c.punteggio, 0) / candidates.length)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Candidates Ranking */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Classifica Candidati
                                </h3>

                                {candidates.map((candidate, index) => (
                                    <Card
                                        key={index}
                                        className="border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                                    >
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-4">
                                                {/* Rank Badge */}
                                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg ${index === 0 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                                                    index === 1 ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" :
                                                        index === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" :
                                                            "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400"
                                                    }`}>
                                                    {index === 0 && "🥇"}
                                                    {index === 1 && "🥈"}
                                                    {index === 2 && "🥉"}
                                                    {index > 2 && `#${index + 1}`}
                                                </div>

                                                {/* Candidate Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {candidate.nome}
                                                        </h4>
                                                        <Chip
                                                            size="sm"
                                                            variant="bordered"
                                                            className={getStatusColor(candidate.status)}
                                                        >
                                                            {getStatusLabel(candidate.status)}
                                                        </Chip>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <StarIcon className="w-4 h-4 text-yellow-500" />
                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">Punteggio</p>
                                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                                    {candidate.punteggio}%
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <ClockIcon className="w-4 h-4 text-blue-500" />
                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">Tempo</p>
                                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                                    {candidate.tempo}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">CV Match</p>
                                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                                    {candidate.cv_match}%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </ModalBody>

                        <ModalFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
                            <Button
                                variant="light"
                                onPress={onClose}
                                className="font-medium"
                            >
                                Chiudi
                            </Button>
                            <Button
                                color="primary"
                                className="bg-blue-600 hover:bg-blue-700 font-semibold"
                            >
                                Esporta Report
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default function HRDashboardPage() {
    const [jobOffers] = useState(mockJobOffers);
    const [selectedJob, setSelectedJob] = useState<typeof mockJobOffers[0] | null>(null);

    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure();
    const { isOpen: isRankingOpen, onOpen: onRankingOpen, onOpenChange: onRankingOpenChange } = useDisclosure();

    const handleViewRanking = (job: typeof mockJobOffers[0]) => {
        setSelectedJob(job);
        onRankingOpen();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Navbar */}
            <HRNavbar onOpenCreateModal={onCreateOpen} />

            {/* Modals */}
            <CreateJobOfferModal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} />
            <CandidatesRankingModal
                isOpen={isRankingOpen}
                onOpenChange={onRankingOpenChange}
                jobOffer={selectedJob}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <BriefcaseIcon className="w-4 h-4" />
                        Dashboard Recruiting
                    </div>
                    <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                        Gestione Job Offers
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Monitora le posizioni aperte e i candidati
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                <BriefcaseIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Posizioni Attive</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{jobOffers.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Tot. Candidati</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {jobOffers.reduce((sum, job) => sum + job.candidati_totali, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-green-50 dark:bg-green-950 rounded-lg">
                                <CheckBadgeIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Qualificati</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                                <TrophyIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Eccellenti</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobOffers.map((job) => (
                        <Card
                            key={job.id}
                            className="border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 cursor-pointer"
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
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <BuildingOfficeIcon className="w-4 h-4" />
                                        <span>{job.azienda}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardBody className="px-6 py-5">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                            Competenze richieste
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {job.competenze.map((skill, idx) => (
                                                <Chip
                                                    key={idx}
                                                    size="sm"
                                                    variant="flat"
                                                    className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-none text-xs font-medium"
                                                >
                                                    {skill}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Candidati totali</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{job.candidati_totali}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Data pubblicazione</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {new Date(job.data_pubblicazione).toLocaleDateString('it-IT')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>

                            <CardFooter className="px-6 pb-6 pt-2">
                                <Button
                                    color="primary"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
                                    startContent={<TrophyIcon className="w-4 h-4" />}
                                    onPress={() => handleViewRanking(job)}
                                >
                                    Vedi Classifica
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}