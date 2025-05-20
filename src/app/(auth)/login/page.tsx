/* eslint-disable */
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
    title: "Вход"
}

interface Props {
    className?: string;
}

const Page: React.FC<Props> = ({ className }) => {
    return (
        <main className={cn(className, "flex min-h-screen items-center justify-center p-6 bg-background")}>
            <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-2xl transition hover:shadow-3xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Вход</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Введите свои данные</p>
                </div>

                <div className="mt-6 space-y-6">
                    <LoginForm />
                    <p className="text-center text-sm">
                        Нету аккаунта?{" "}
                        <Link href="/signup" className="font-medium text-primary hover:underline transition">
                            Зарегистрироваться
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Page;