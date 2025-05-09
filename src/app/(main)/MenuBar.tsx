import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import NotificationsButton from "./NotificationsButton";

interface Props {
  className?: string;
}

export default async function MenuBar({ className }: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

  return (
    <div className={cn("", className)}>
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
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
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
}
