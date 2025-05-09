import UserAvatar from "@/components/UserAvatar";
import { NotificationData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { NotificationType } from "@prisma/client";
import { formatRelative } from "date-fns";
import { Heart, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";
import { format } from "path";
import { JSX } from "react";

interface NotificationProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `подписался на вас`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `прокомментировал ваш пост`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `поставил лайк на ваш пост`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  console.log(notification);

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="w-full space-y-3">
          <div className="flex w-full flex-row items-center justify-between">
            <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
            <span className="text-sm text-muted-foreground">
              {formatRelativeDate(notification.createdAt)}
            </span>
          </div>
          <div>
            <span className="font-bold">{notification.issuer.displayName}</span>{" "}
            <span>{message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
