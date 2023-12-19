"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import NHLogo from "../../../../public/logo.jpg";
import Google from "../../../../public/google.svg";
import { toast } from "react-toastify";
import { passwordHash } from "../../passwordHash";

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const passwordSubmit = await passwordHash(password, "SHA-256");
        const res = await signIn("credentials", {
            email,
            password: passwordSubmit,
            redirect: false,
            callbackUrl: `${window.location.origin}`,
        });
        if (res?.error) {
            setIsLoading(false);
            toast.error("Email/Password Salah");
        }
        if (res?.url) router.push(res.url);
    };
    const onGoogleSignIn = () => signIn("google");

    return (
        <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-16 w-auto" src="/logo.jpg" alt="Nurul Hidayah" height={128} width={128} />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <Link
                                    href="/forgot-password"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Lupa password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-green-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-green-600 duration-200 disabled:bg-green-300"
                            disabled={!password || !email || isLoading}
                        >
                            {isLoading ? "Mohon Menunggu.." : "Sign in"}
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold leading-6 text-black hover:text-white shadow-md hover:bg-blue-600 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200"
                            onClick={onGoogleSignIn}
                        >
                            <Image alt="login with google" src={Google} className="mr-2" />
                            Atau login menggunakan Google
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SignIn;
