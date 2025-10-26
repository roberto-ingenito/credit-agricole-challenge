"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/lib/redux/hooks";
import { login } from "@/lib/redux/slices/authSlice";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

export default function HRLoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // await dispatch(login({ email: email, password: password, role: "hr" })).unwrap();

            // Reindirizza alla dashboard HR
            router.push("/hr/dashboard");
        } catch (err) {
            addToast({
                title: "Accesso non riuscito",
                description:
                    (err as AxiosError)?.message || "Credenziali non valide. Verifica i tuoi dati.",
                severity: "warning",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-dvh bg-gradient-to-br from-primary-50 to-primary-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="flex flex-col gap-3 px-6 pt-8 pb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full">
                        <BuildingOfficeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Portale HR</h1>
                        <p className="text-sm text-default-500 mt-2">
                            Accedi per gestire candidati e posizioni aperte
                        </p>
                    </div>
                </CardHeader>

                <CardBody className="px-6 py-4">
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            value={email}
                            onValueChange={setEmail}
                            label="Email aziendale"
                            type="email"
                            variant="bordered"
                            placeholder="hr@azienda.com"
                            required
                            autoComplete="email"
                            description="Utilizza la tua email aziendale per accedere"
                        />

                        <Input
                            value={password}
                            onValueChange={setPassword}
                            label="Password"
                            type={isVisible ? "text" : "password"}
                            required
                            variant="bordered"
                            placeholder="Inserisci la tua password"
                            autoComplete="current-password"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeSlashIcon className="w-5 h-5 text-default-400" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-default-400" />
                                    )}
                                </button>
                            }
                        />

                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full font-semibold bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? "Verifica in corso..." : "Accedi alla dashboard"}
                        </Button>
                    </Form>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                        <p className="text-xs text-default-800">
                            🔒 Accesso riservato al personale HR. Tutte le attività sono monitorate per
                            garantire la sicurezza dei dati.
                        </p>
                    </div>
                </CardBody>

                <CardFooter className="flex flex-col gap-3 px-6 pb-8">
                    <div className="w-full border-t border-divider" />
                    <p className="text-sm text-default-500 text-center">
                        La tua azienda non è ancora registrata?
                        <Link href="/company-signup" size="sm" className="pl-2 font-semibold">
                            Registra l'azienda
                        </Link>
                    </p>
                    <p className="text-xs text-default-400 text-center">
                        Sei un candidato?{" "}
                        <Link href="/candidate-login" size="sm">
                            Vai all'area candidati
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}