import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    avatarUrl: string | null | undefined
    className?: string;
    size?: number
}

const UserAvatar: React.FC<Props> = ({ avatarUrl, className, size }: Props) => {
    return (
        <Image
            src={avatarUrl || "/assets/avatar-placeholder.png"}
            alt='User avatar' width={size ?? 48}
            height={size ?? 48}
            className={cn("aspect-square h-fit flex-none rounded-full bg-secondary object-cover", className)}>
        </Image>
    );
};

export default UserAvatar;