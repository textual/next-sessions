'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/authActions';
import { apiInstance } from '@/lib/axios';

export default function LoginForm() {
  const [error, dispatch] = useFormState(authenticate, undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('formData', email, password);
    const result = await apiInstance.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // const result = await apiInstance.post('/api/auth/login', {
    //   email,
    //   password,
    // });
    console.log('result ', result);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Email
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md relative'>
              <input
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='real@email.com'
              />
              <AtSymbolIcon className='pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
        </div>
        <div className='sm:col-span-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Password
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md relative'>
              <input
                type='password'
                name='password'
                id='password'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='password'
              />
              <KeyIcon className='pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
        </div>
        {error && (
          <div className='sm:col-span-4 w-[300px]'>
            <div className='bg-red-100 text-red-950 rounded-lg py-1.5 pl-2 flex align-middle'>
              <ExclamationCircleIcon className='h-5 w-5 text-red-950 mr-2' />
              {error}
            </div>
          </div>
        )}
        <div className='sm:col-span-4'>
          <LoginButton />
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='mt-4 w-[200px]' aria-disabled={pending}>
      Log in <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
    </Button>
  );
}
