/* eslint-disable */
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import React from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Вход",
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
          <h1 className="text-3xl font-bold text-primary">Вход</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Введите свои данные
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <LoginForm />
          <p className="text-center text-sm">
            Нету аккаунта?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary transition hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
