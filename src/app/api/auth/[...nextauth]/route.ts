import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// firebase
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cert } from "firebase-admin/app";
import { auth } from "@/app/firebase";

export const OPTIONS = {
    pages: { signIn: "/signIn" },
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    }),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials): Promise<any> {
                await signInWithEmailAndPassword(
                    auth,
                    (credentials as any)?.email || "",
                    (credentials as any)?.password || ""
                )
                    .then((userCredentials) => {
                        if (userCredentials.user) {
                            console.log(userCredentials.user);
                            return userCredentials.user;
                        }
                        return null;
                    })
                    .catch((err) => console.log(err));
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
};
const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
