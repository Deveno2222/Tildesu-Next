import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Props extends ButtonProps {
    className?: string;
    loading: boolean
}

const LoadingButton: React.FC<Props> = ({ className, loading, disabled, ...props }: Props) => {
    return (
        <Button disabled={loading || disabled} className={cn('flex items-center gap-2', className)} {...props}>
            {loading && <Loader2 className='size-5 animate-spin'/>}
            {props.children}
        </Button>
    );
};

export default LoadingButton;