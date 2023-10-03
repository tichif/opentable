'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');

  return (
    <>
      <input
        className='rounded  mr-3 p-2 w-[450px]'
        type='text'
        placeholder='State, city or town'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className='rounded bg-red-600 px-9 py-2 text-white'
        onClick={() => {
          router.push('/search');
        }}
      >
        Let's go
      </button>
    </>
  );
};

export default Form;
