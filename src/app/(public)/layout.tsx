import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(OPTIONS);
    if (session) {
        redirect("/");
    }
    return <>{children}</>;
};

export default Layout;
