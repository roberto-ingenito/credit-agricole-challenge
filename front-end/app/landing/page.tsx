"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    ChartBarIcon,
    ClockIcon,
    ShieldCheckIcon,
    SparklesIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
    const router = useRouter();

    const features = [
        {
            icon: <SparklesIcon className="w-6 h-6" />,
            title: "Profilo Intelligente",
            description: "Crea un CV digitale completo e professionale in pochi minuti",
        },
        {
            icon: <UserGroupIcon className="w-6 h-6" />,
            title: "Matching Automatico",
            description: "Algoritmi avanzati per connettere candidati e opportunità",
        },
        {
            icon: <ChartBarIcon className="w-6 h-6" />,
            title: "Analytics Dettagliati",
            description: "Dashboard complete per monitorare candidature e performance",
        },
        {
            icon: <ClockIcon className="w-6 h-6" />,
            title: "Risparmio di Tempo",
            description: "Processi automatizzati per velocizzare le assunzioni",
        },
        {
            icon: <ShieldCheckIcon className="w-6 h-6" />,
            title: "Sicurezza Garantita",
            description: "Dati protetti con i massimi standard di sicurezza",
        },
        {
            icon: <RocketLaunchIcon className="w-6 h-6" />,
            title: "Facile da Usare",
            description: "Interfaccia intuitiva per tutti i livelli di esperienza",
        },
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
                    <div className="text-center">
                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 mb-6">
                            Il Futuro del Recruiting
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-default-600 dark:text-default-400 mb-4 max-w-3xl mx-auto">
                            La piattaforma che connette talenti e opportunità
                        </p>
                        <p className="text-base sm:text-lg text-default-500 mb-12 max-w-2xl mx-auto">
                            Semplifica il processo di selezione con strumenti intelligenti per candidati e
                            recruiter
                        </p>

                        {/* CTA Cards */}
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-16">
                            {/* Candidati Card */}
                            <Card
                                isHoverable
                                className="border-2 border-transparent hover:border-primary-500 transition-all duration-300"
                            >
                                <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
                                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-2xl">
                                        <BriefcaseIcon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Sono un Candidato</h2>
                                </CardHeader>
                                <CardBody className="px-8 pb-8">
                                    <ul className="space-y-3 mb-6 text-left">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">Crea il tuo profilo professionale</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">
                                                Candidati alle migliori opportunità
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">
                                                Monitora lo stato delle tue candidature
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">Ricevi notifiche in tempo reale</span>
                                        </li>
                                    </ul>
                                    <Button
                                        color="primary"
                                        size="lg"
                                        className="w-full font-semibold"
                                        endContent={<BriefcaseIcon className="w-5 h-5" />}
                                        onPress={() => router.push("/candidate-login")}
                                    >
                                        Accedi come Candidato
                                    </Button>
                                    <p className="text-sm text-default-500 text-center mt-4">
                                        Non hai un account?{" "}
                                        <Link
                                            href="/candidate-signup"
                                            size="sm"
                                            className="font-semibold"
                                            color="primary"
                                        >
                                            Registrati gratis
                                        </Link>
                                    </p>
                                </CardBody>
                            </Card>

                            {/* HR Card */}
                            <Card
                                isHoverable
                                className="border-2 border-transparent hover:border-blue-500 transition-all duration-300"
                            >
                                <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
                                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800 rounded-2xl">
                                        <BuildingOfficeIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Sono un HR</h2>
                                </CardHeader>
                                <CardBody className="px-8 pb-8">
                                    <ul className="space-y-3 mb-6 text-left">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">Gestisci posizioni aperte</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">Valuta candidati qualificati</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">Analytics e reportistica avanzata</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1 text-lg">✓</span>
                                            <span className="text-default-600">Collabora con il tuo team</span>
                                        </li>
                                    </ul>
                                    <Button
                                        color="primary"
                                        size="lg"
                                        className="w-full font-semibold bg-blue-600"
                                        endContent={<BuildingOfficeIcon className="w-5 h-5" />}
                                        onPress={() => router.push("/company-login")}
                                    >
                                        Accedi come HR
                                    </Button>
                                    <p className="text-sm text-default-500 text-center mt-4">
                                        Azienda non registrata?{" "}
                                        <Link href="/company-signup" size="sm" className="font-semibold text-blue-600">
                                            Registra l'azienda
                                        </Link>
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-default-900 mb-4">
                            Perché Sceglierci
                        </h2>
                        <p className="text-lg text-default-600 max-w-2xl mx-auto">
                            Una piattaforma completa progettata per semplificare ogni fase del processo di
                            selezione
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} isHoverable className="transition-shadow">
                                <CardBody className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2 text-default-900">
                                                {feature.title}
                                            </h3>
                                            <p className="text-default-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-default-900">
                        Pronto per Iniziare?
                    </h2>
                    <p className="text-lg text-default-600 mb-10">
                        Unisciti a migliaia di professionisti e aziende che hanno già scelto la nostra
                        piattaforma
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            as={Link}
                            href="/candidate-login"
                            size="lg"
                            color="primary"
                            className="text-lg px-8 font-semibold"
                        >
                            Inizia come Candidato
                        </Button>
                        <Button
                            as={Link}
                            href="/company-login"
                            size="lg"
                            variant="bordered"
                            className="text-lg px-8 font-semibold border-2"
                        >
                            Registra la tua Azienda
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4">Per Candidati</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li>
                                    <Link href="/candidate-login" className="hover:text-white" size="sm">
                                        Accedi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/candidate/signup" className="hover:text-white" size="sm">
                                        Registrati
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/jobs" className="hover:text-white" size="sm">
                                        Cerca Lavoro
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Per Aziende</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li>
                                    <Link href="/company-login" className="hover:text-white" size="sm">
                                        Accedi HR
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/hr/company-signup" className="hover:text-white" size="sm">
                                        Registra Azienda
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pricing" className="hover:text-white" size="sm">
                                        Prezzi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Supporto</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li>
                                    <Link href="/help" className="hover:text-white" size="sm">
                                        Centro Assistenza
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-white" size="sm">
                                        Contattaci
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="hover:text-white" size="sm">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
                        <p>© 2025 Recruitment Platform. Tutti i diritti riservati.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}