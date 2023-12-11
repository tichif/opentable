'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import useReservation from '../../../hooks/useReservation';

const ReservationForm = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: number;
}) => {
  const [inputs, setInputs] = useState({
    booker_first_name: '',
    booker_last_name: '',
    booker_phone: '',
    booker_email: '',
    booker_request: '',
    booker_occasion: '',
  });

  const [disabled, setDisabled] = useState(true);
  const { createReservation, error, loading } = useReservation();
  const [didBook, setDidBook] = useState(false);

  const [day, time] = date.split('T');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (
      inputs.booker_email &&
      inputs.booker_first_name &&
      inputs.booker_last_name &&
      inputs.booker_phone
    ) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [inputs]);

  async function handleClick() {
    await createReservation({
      inputs,
      slug,
      day,
      time,
      partySize,
      setDidBook,
    });
  }

  return (
    <div className='mt-10 flex flex-wrap justify-between w-[660px]'>
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation.</p>
        </div>
      ) : (
        <>
          <input
            type='text'
            className='border rounded p-3 w-80 mb-4'
            placeholder='First name'
            value={inputs.booker_first_name}
            onChange={handleChange}
            name='booker_first_name'
          />
          <input
            type='text'
            className='border rounded p-3 w-80 mb-4'
            placeholder='Last name'
            value={inputs.booker_last_name}
            onChange={handleChange}
            name='booker_last_name'
          />
          <input
            type='text'
            className='border rounded p-3 w-80 mb-4'
            placeholder='Phone number'
            value={inputs.booker_phone}
            onChange={handleChange}
            name='booker_phone'
          />
          <input
            type='text'
            className='border rounded p-3 w-80 mb-4'
            placeholder='Email'
            value={inputs.booker_email}
            onChange={handleChange}
            name='booker_email'
          />
          <input
            type='text'
            className='border rounded p-3 w-80 mb-4'
            placeholder='Occasion (optional)'
            value={inputs.booker_occasion}
            onChange={handleChange}
            name='booker_occasion'
          />
          <input
            type='text'
            className='border rounded p-3 w-80 mb-4'
            placeholder='Requests (optional)'
            value={inputs.booker_request}
            onChange={handleChange}
            name='booker_request'
          />
          <button
            className='bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300'
            disabled={disabled || loading}
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color='inherit' />
            ) : (
              'Complete reservation'
            )}
          </button>
          <p className='mt-4 text-sm'>
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
