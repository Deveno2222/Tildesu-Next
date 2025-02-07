"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface UserButtonProps {
    className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
    const { user } = useSession()

    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('flex-none rounded-full', className)}>
                    <UserAvatar avatarUrl={user.avatarUrl} size={40} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Пользователь @{user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`users/${user.username}`}>
                    <DropdownMenuItem>
                        <UserIcon className="mr-2 size-4" />
                        Профиль
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 size-4" />
                        Тема
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme('system')}>
                                <Monitor className="mr-2 size-4" />
                                Система
                                {theme === 'system' && <Check className="ms-2"/>}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                <Sun className="mr-2 size-4" />
                                Светлая тема
                                {theme === 'light' && <Check className="ms-2"/>}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                <Moon className="mr-2 size-4" />
                                Темная тема
                                {theme === 'dark' && <Check className="ms-2"/>}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                    <LogOutIcon className="mr-2 size-4" />
                    Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton