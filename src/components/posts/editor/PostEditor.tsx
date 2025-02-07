"use client"

import { cn } from '@/lib/utils';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import React from 'react';
import { submitPost } from './actions';
import UserAvatar from '@/components/UserAvatar';
import { useSession } from '@/app/(main)/SessionProvider';
import { Button } from '@/components/ui/button';
import "./styles.css"

interface Props {
    className?: string;
}

const PostEditor: React.FC<Props> = ({ className }) => {
    const { user } = useSession()

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "Поделитесь новостью"
            })
        ]
    })

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || "";

    async function onSubmit() {
        await submitPost(input)
        editor?.commands.clearContent();
    }

    return (
        <div className={cn('flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm', className)}>
            <div className='flex gap-5'>
                <UserAvatar avatarUrl={user.avatarUrl} className='hidden sm:inline' />
                <EditorContent editor={editor} className='w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3' />
            </div>
            <div className='flex justify-end'>
                <Button onClick={onSubmit}
                    disabled={!input.trim()}
                    className='min-w-20'
                >Создать</Button>
            </div>
        </div>
    );
};

export default PostEditor;