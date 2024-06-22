'use client';

import { redirect, useRouter } from 'next/navigation';
import { Button } from '../button';
import { apiInstance } from '@/lib/axios';
import { useAuth } from '@/contexts/auth';

const LogoutButton = () => {
  const { logOutUser } = useAuth();
  const router = useRouter();
  const handleClick = async () => {
    console.log('clciking');
    try {
      const response = await apiInstance.get('/api/auth/logout');
      // setData(response.data);
      console.log('auth/logout response', response);
      await logOutUser();
      // redirect('/');
      router.push('/');
    } catch (err) {
      // setError('Failed to fetch data');
      console.log('log out failed');
    }
  };
  return <Button onClick={handleClick}>log out</Button>;
};

export default LogoutButton;
