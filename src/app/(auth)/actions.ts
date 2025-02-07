"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const { session } = await validateRequest();

    if (!session) {
        throw new Error("Unauthorized");
    }

    await lucia.invalidateSession(session.id);

    const sessinCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
        sessinCookie.name,
        sessinCookie.value,
        sessinCookie.attributes
    );

    return redirect("/login");
}
