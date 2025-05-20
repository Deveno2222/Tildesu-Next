'use client'

import { signUpSchema, SignUpValues } from '@/lib/validation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUp } from './actions';
import { PasswordInput } from '@/components/PasswordInput';
import LoadingButton from '@/components/LoadingButton';

interface Props {
    className?: string;
}

const SignUpForm: React.FC<Props> = () => {
    const [error, setError] = useState<string>()

    const [isPending, startTransition] = useTransition()



    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    })

    async function onSubmit(values: SignUpValues) {
        setError(undefined);
        startTransition(async () => {
            const {error} = await signUp(values)
            if (error) {
                setError(error)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                {error && <p className='text-center text-destructive'>{error}</p>}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Логин</FormLabel>
                            <FormControl>
                                <Input placeholder='Логин' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Почта</FormLabel>
                            <FormControl>
                                <Input placeholder='Email' type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder='Пароль' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton loading={isPending} type="submit" className='w-full'>Создать аккаунт</LoadingButton>
            </form>
        </Form>
    );
};

export default SignUpForm;