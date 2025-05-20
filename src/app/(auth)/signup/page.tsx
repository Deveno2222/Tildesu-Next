/* eslint-disable */
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Регистрация",
};

const Page = () => {
  return (
    <main
      className={cn(
        "flex min-h-screen items-center justify-center bg-background p-6",
      )}
    >
      <div className="hover:shadow-3xl w-full max-w-md rounded-2xl border bg-card p-8 shadow-2xl transition">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Регистрация</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Создайте учетную запись, чтобы начать
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <SignUpForm />
          <p className="text-center text-sm">
            Уже есть аккаунт?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition hover:underline"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
