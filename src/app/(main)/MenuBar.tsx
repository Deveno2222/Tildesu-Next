import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Bookmark, Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import NotificationsButton from "./NotificationsButton";
import MessagesButton from "./MessagesButton";
import streamServerClient from "@/lib/stream";

interface Props {
  className?: string;
}

export default async function MenuBar({ className }: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

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
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
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
