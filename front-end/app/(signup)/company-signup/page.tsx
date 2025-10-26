"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { addToast } from "@heroui/toast";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input, Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { registerCompany } from "@/lib/redux/slices/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";



export default function HRCompanySignupPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        description: "",
        industry: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

    const handleSubmit = async (e: any) => {
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
            const result = await dispatch(registerCompany({
                email: formData.email,
                password: formData.password,
                description: formData.description,
                industry: formData.industry,
                name: formData.companyName,
            },));

            if (registerCompany.fulfilled.match(result)) {
                router.push('/dashboard/company');
            }
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
        <div className="flex items-center justify-center min-h-dvh bg-gradient-to-br from-primary-50 to-primary-100 p-4 py-12">
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

                <CardBody className="px-6 py-4" as="form" onSubmit={handleSubmit}>

                    {/* Informazioni Azienda */}
                    <div className="space-y-4">


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={formData.companyName}
                                onValueChange={(value) => setFormData({ ...formData, companyName: value })}
                                label="Nome Azienda"
                                type="text"
                                variant="bordered"
                                placeholder="es.: StyleWorks"
                                required
                            />

                            <Input
                                value={formData.industry}
                                onValueChange={(value) => setFormData({ ...formData, industry: value })}
                                label="Settore"
                                type="text"
                                variant="bordered"
                                placeholder="es.: Moda"
                                required
                            />
                        </div>

                        <Textarea
                            value={formData.description}
                            onValueChange={(value) => setFormData({ ...formData, description: value })}
                            label="Descrizione Azienda"
                            type="text"
                            variant="bordered"
                            placeholder="es.: Casa di moda che unisce tecnologia e creatività per sviluppare collezioni innovative e sostenibili"
                        />
                    </div>

                    <Input
                        value={formData.email}
                        onValueChange={(value) => setFormData({ ...formData, email: value })}
                        label="Email"
                        type="email"
                        required
                        variant="bordered"
                        className="mt-4"
                        autoComplete="email"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

                    <Checkbox
                        className="mt-2 mb-5"
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
