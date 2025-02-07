import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Bookmark, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
    className?: string;
}

const MenuBar: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('', className)}>
            <Button
                variant="ghost"
                className="flex items-center justify-start gap-3"
                title="Главная"
                asChild
            >
                <Link href="/" className="flex items-center gap-3">
                    <Home />
                    <span className="hidden lg:inline">Главная</span>
                </Link>
            </Button>
            <Button
                variant="ghost"
                className="flex items-center justify-start gap-3"
                title="Уведомления"
                asChild
            >
                <Link href="/notifications" className="flex items-center gap-3">
                    <Bell />
                    <span className="hidden lg:inline">Уведомления</span>
                </Link>
            </Button>
            <Button
                variant="ghost"
                className="flex items-center justify-start gap-3"
                title="Сообщения"
                asChild
            >
                <Link href="/messages" className="flex items-center gap-3">
                    <Mail />
                    <span className="hidden lg:inline">Сообщения</span>
                </Link>
            </Button>
            <Button
                variant="ghost"
                className="flex items-center justify-start gap-3"
                title="Заметки"
                asChild
            >
                <Link href="/bookmarks" className="flex items-center gap-3">
                    <Bookmark />
                    <span className="hidden lg:inline">Заметки</span>
                </Link>
            </Button>
        </div>
    );
};

export default MenuBar;
