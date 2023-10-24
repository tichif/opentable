'use client';

import Image from 'next/image';

import ErrorPng from '../../public/icons/error.png';

const NotFound = ({ error }: { error: Error }) => {
  return (
    <div className='h-screen ng-gray-200 flex flex-col justify-center items-center'>
      <Image src={ErrorPng} alt='Error' className='w-56 mb-8' />
      <div className='bg-white p-9 py-14 shadow rounded'>
        <h3 className='text-3xl font-bold'>Well, this is embarrassing.</h3>
        <p className='text-reg font-bold'>We could't find this restaurant.</p>
        <p className='mt-6 text-sm font-light'>Error Code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
