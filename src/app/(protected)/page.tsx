"use client";

import { signOut as NextAuthSignOut, useSession } from "next-auth/react";
import { signOut as FirebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
    const { data } = useSession();
    console.log(data);
    const onSignout = async () => {
        await FirebaseSignOut(auth);
        NextAuthSignOut();
    };
    return (
        <main className="">
            <button onClick={onSignout}>Sign out</button>
        </main>
    );
}
