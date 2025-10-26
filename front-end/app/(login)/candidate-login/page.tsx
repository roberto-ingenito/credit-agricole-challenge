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
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function CandidateLoginPage() {
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
            //   await dispatch(login({ email: email, password: password, role: "candidate" })).unwrap();

            addToast({
                title: "Accesso effettuato",
                description: "Benvenuto nel tuo profilo!",
                severity: "success",
            });

            router.push("/candidate/profile");
        } catch (err) {
            addToast({
                title: "Accesso non riuscito",
                description: (err as AxiosError)?.message || "Credenziali non valide. Riprova.",
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
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900 rounded-full">
                        <BriefcaseIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Area Candidati</h1>
                        <p className="text-sm text-default-500 mt-2">
                            Accedi al tuo profilo per gestire le tue candidature
                        </p>
                    </div>
                </CardHeader>

                <CardBody className="px-6 py-4">
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            value={email}
                            onValueChange={setEmail}
                            label="Email"
                            type="email"
                            variant="bordered"
                            placeholder="tua.email@esempio.com"
                            required
                            autoComplete="email"
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
                                        <EyeSlashIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                        />

                        <div className="flex justify-end">
                            <Link href="/candidate/forgot-password" size="sm" color="primary">
                                Password dimenticata?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full font-semibold"
                        >
                            {isLoading ? "Accesso in corso..." : "Accedi al mio profilo"}
                        </Button>
                    </Form>
                </CardBody>

                <CardFooter className="flex flex-col gap-3 px-6 pb-8">
                    <div className="w-full border-t border-divider" />
                    <p className="text-sm text-default-500 text-center">
                        Non hai ancora un profilo?
                        <Link href="/candidate-signup" size="sm" className="pl-2 font-semibold">
                            Registrati
                        </Link>
                    </p>
                    <p className="text-xs text-default-400 text-center">
                        Sei un recruiter?{" "}
                        <Link href="/company-login" size="sm">
                            Accedi come HR
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}