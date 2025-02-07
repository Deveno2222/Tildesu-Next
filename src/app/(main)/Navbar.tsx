import SearchField from '@/components/SearchField';
import UserButton from '@/components/UserButton';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
}

const Navbar: React.FC<Props> = ({ className }) => {
  return (
    <header className='sticky top-0 z-10 bg-card/70 backdrop-blur-md shadow-sm'>
        <div className='max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3'>
            <Link href="/" className='text-2xl font-bold text-primary'>Tildesu</Link>
            <SearchField />
            <UserButton className='sm:ms-auto'/>  
        </div>
    </header>
  );
};

export default Navbar;