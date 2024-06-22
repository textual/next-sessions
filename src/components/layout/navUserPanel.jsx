'use client';
import { useAuth } from '@/contexts/auth';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import Link from 'next/link';
const NavUserPanel = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className='ml-2'>
      {Boolean(isAuthenticated) ? (
        <div className='flex'>
          {user.image ? (
            <Image
              src={user.image}
              alt='profile image'
              height='20'
              width='20'
              className='rounded-full'
            />
          ) : (
            <UserCircleIcon className='h-6 w-6' />
          )}

          <Link href='/dashboard' className='ml-1'>
            {user?.name}
          </Link>
        </div>
      ) : (
        <>
          <Link href='/auth/login'>login</Link>
          {' | '}
          <Link href='/auth/register'>register</Link>
        </>
      )}
    </div>
  );
};
export default NavUserPanel;
