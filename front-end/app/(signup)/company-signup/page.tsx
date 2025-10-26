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
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const companySizes = [
    { key: "1-10", label: "1-10 dipendenti" },
    { key: "11-50", label: "11-50 dipendenti" },
    { key: "51-200", label: "51-200 dipendenti" },
    { key: "201-500", label: "201-500 dipendenti" },
    { key: "501-1000", label: "501-1000 dipendenti" },
    { key: "1000+", label: "Oltre 1000 dipendenti" },
];

export default function HRCompanySignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        companyName: "",
        companySize: "",
        industry: "",
        website: "",
        hrName: "",
        hrEmail: "",
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
            // await registerCompany(formData);

            addToast({
                title: "Registrazione completata!",
                description: "Azienda registrata con successo. Effettua il login.",
                severity: "success",
            });

            router.push("/company-login");
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
        <div className="flex items-center justify-center min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 py-12">
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

            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="flex flex-col gap-3 px-6 pt-8 pb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full">
                        <BuildingOfficeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Registra la tua Azienda</h1>
                        <p className="text-sm text-default-500 mt-2">
                            Inizia a cercare i migliori talenti per il tuo team
                        </p>
                    </div>
                </CardHeader>

                <CardBody className="px-6 py-4">
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Informazioni Azienda */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-default-700">Informazioni Azienda</h3>

                            <Input
                                value={formData.companyName}
                                onValueChange={(value) => setFormData({ ...formData, companyName: value })}
                                label="Nome Azienda"
                                type="text"
                                variant="bordered"
                                placeholder="Acme Corporation"
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Dimensione Azienda"
                                    placeholder="Seleziona dimensione"
                                    variant="bordered"
                                    selectedKeys={formData.companySize ? [formData.companySize] : []}
                                    onSelectionChange={(keys) => {
                                        const selectedKey = Array.from(keys)[0] as string;
                                        setFormData({ ...formData, companySize: selectedKey });
                                    }}
                                    required
                                >
                                    {companySizes.map((size) => (
                                        <SelectItem key={size.key}>{size.label}</SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    value={formData.industry}
                                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                                    label="Settore"
                                    type="text"
                                    variant="bordered"
                                    placeholder="Tecnologia, Finance, ecc."
                                    required
                                />
                            </div>

                            <Input
                                value={formData.website}
                                onValueChange={(value) => setFormData({ ...formData, website: value })}
                                label="Sito Web"
                                type="url"
                                variant="bordered"
                                placeholder="https://www.azienda.com"
                            />
                        </div>

                        <div className="w-full border-t border-divider my-2" />

                        {/* Informazioni Responsabile HR */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-default-700">Responsabile HR</h3>

                            <Input
                                value={formData.hrName}
                                onValueChange={(value) => setFormData({ ...formData, hrName: value })}
                                label="Nome e Cognome"
                                type="text"
                                variant="bordered"
                                placeholder="Mario Rossi"
                                required
                                autoComplete="name"
                            />

                            <Input
                                value={formData.hrEmail}
                                onValueChange={(value) => setFormData({ ...formData, hrEmail: value })}
                                label="Email Aziendale"
                                type="email"
                                variant="bordered"
                                placeholder="mario.rossi@azienda.com"
                                required
                                autoComplete="email"
                                description="Usa la tua email aziendale"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>
                        </div>

                        <Checkbox
                            isSelected={formData.acceptTerms}
                            onValueChange={(value) => setFormData({ ...formData, acceptTerms: value })}
                            size="sm"
                            classNames={{
                                label: "text-sm",
                            }}
                        >
                            Accetto i{" "}
                            <Link href="/terms" size="sm" className="text-blue-600">
                                termini e condizioni
                            </Link>{" "}
                            e la{" "}
                            <Link href="/privacy" size="sm" className="text-blue-600">
                                privacy policy
                            </Link>
                        </Checkbox>

                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full font-semibold bg-blue-600"
                        >
                            {isLoading ? "Registrazione in corso..." : "Registra Azienda"}
                        </Button>
                    </Form>
                </CardBody>

                <CardFooter className="flex flex-col gap-3 px-6 pb-8">
                    <div className="w-full border-t border-divider" />
                    <p className="text-sm text-default-500 text-center">
                        Hai già un account aziendale?
                        <Link href="/company-login" size="sm" className="pl-2 font-semibold">
                            Accedi
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
