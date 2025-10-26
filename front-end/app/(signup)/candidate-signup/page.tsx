"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CandidateSignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            addToast({
                title: "Errore",
                description: "Le password non coincidono",
                severity: "warning",
            });
            return;
        }

        if (!formData.acceptTerms) {
            addToast({
                title: "Errore",
                description: "Devi accettare i termini e condizioni",
                severity: "warning",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Simulazione chiamata API
            // await registerCandidate(formData);

            addToast({
                title: "Registrazione completata!",
                description: "Account creato con successo. Effettua il login.",
                severity: "success",
            });

            router.push("/candidate-login");
        } catch (err) {
            addToast({
                title: "Registrazione fallita",
                description: (err as AxiosError)?.message || "Errore durante la registrazione.",
                severity: "warning",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-dvh bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 p-4">
            <Button
                as={Link}
                href="/"
                isIconOnly
                variant="light"
                className="absolute top-4 left-4"
                aria-label="Torna alla home"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </Button>

            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="flex flex-col gap-3 px-6 pt-8 pb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900 rounded-full">
                        <BriefcaseIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Crea il tuo Profilo</h1>
                        <p className="text-sm text-default-500 mt-2">
                            Inizia la tua ricerca di lavoro creando un account gratuito
                        </p>
                    </div>
                </CardHeader>

                <CardBody className="px-6 py-4">
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                value={formData.firstName}
                                onValueChange={(value) => setFormData({ ...formData, firstName: value })}
                                label="Nome"
                                type="text"
                                variant="bordered"
                                placeholder="Mario"
                                required
                                autoComplete="given-name"
                            />

                            <Input
                                value={formData.lastName}
                                onValueChange={(value) => setFormData({ ...formData, lastName: value })}
                                label="Cognome"
                                type="text"
                                variant="bordered"
                                placeholder="Rossi"
                                required
                                autoComplete="family-name"
                            />
                        </div>

                        <Input
                            value={formData.email}
                            onValueChange={(value) => setFormData({ ...formData, email: value })}
                            label="Email"
                            type="email"
                            variant="bordered"
                            placeholder="tua.email@esempio.com"
                            required
                            autoComplete="email"
                        />

                        <Input
                            value={formData.password}
                            onValueChange={(value) => setFormData({ ...formData, password: value })}
                            label="Password"
                            type={isVisible ? "text" : "password"}
                            required
                            variant="bordered"
                            placeholder="Almeno 8 caratteri"
                            autoComplete="new-password"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="mostra/nascondi password"
                                >
                                    {isVisible ? (
                                        <EyeSlashIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                        />

                        <Input
                            value={formData.confirmPassword}
                            onValueChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                            label="Conferma Password"
                            type={isVisibleConfirm ? "text" : "password"}
                            required
                            variant="bordered"
                            placeholder="Ripeti la password"
                            autoComplete="new-password"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibilityConfirm}
                                    aria-label="mostra/nascondi password"
                                >
                                    {isVisibleConfirm ? (
                                        <EyeSlashIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                        />

                        <Checkbox
                            isSelected={formData.acceptTerms}
                            onValueChange={(value) => setFormData({ ...formData, acceptTerms: value })}
                            size="sm"
                            classNames={{
                                label: "text-sm",
                            }}
                        >
                            Accetto i{" "}
                            <Link href="/terms" size="sm" color="primary">
                                termini e condizioni
                            </Link>{" "}
                            e la{" "}
                            <Link href="/privacy" size="sm" color="primary">
                                privacy policy
                            </Link>
                        </Checkbox>

                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full font-semibold"
                        >
                            {isLoading ? "Creazione account..." : "Crea il mio account"}
                        </Button>
                    </Form>
                </CardBody>

                <CardFooter className="flex flex-col gap-3 px-6 pb-8">
                    <div className="w-full border-t border-divider" />
                    <p className="text-sm text-default-500 text-center">
                        Hai già un account?
                        <Link href="/candidate-login" size="sm" className="pl-2 font-semibold">
                            Accedi
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}