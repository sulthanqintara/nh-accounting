"use client";
import React, { useState } from "react";

import Image from "next/image";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/firebase";
import Link from "next/link";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Email sudah dikirim");
            })
            .catch(() => toast.error("Ada kesalahan saat mengirimkan email"))
            .finally(() => setIsLoading(false));
    };
    return (
        <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-16 w-auto" src="/logo.jpg" alt="Nurul Hidayah" height={128} width={128} />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Lupa Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="text-sm">
                                <Link href="/sign-in" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Kembali ke sign in
                                </Link>
                            </div>
                        </div>
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
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-green-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-green-600 duration-200 disabled:bg-green-300"
                            disabled={!email || isLoading}
                        >
                            {isLoading ? "Mohon Menunggu.." : "Kirim Email Untuk Reset Password"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ForgotPassword;
