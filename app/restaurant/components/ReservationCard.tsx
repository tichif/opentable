'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { convertToDisplayTime } from '../../../utils/convertTime';

import { partySize, times } from '../../../data';
import useAvailability from '../../../hooks/useAvailability';

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);

  const { data, error, loading, fetchAvailabilities } = useAvailability();

  function handleChangeDate(date: Date | null) {
    if (date) {
      const day = date.toISOString().split('T')[0];
      setDay(day);
      setSelectedDate(date);
      return;
    }

    setSelectedDate(null);
  }

  function filterTimeByRestaurantOpenWindow() {
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return timesWithinWindow;
  }

  function handleClick() {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize: numOfPeople,
    });
  }

  return (
    <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
      <div className='text-center border-b pb-2 font-bold'>
        <h4 className='mr-7 text-lg'>Make a Reservation</h4>
      </div>
      <div className='my-3 flex flex-col'>
        <label htmlFor=''>Party size</label>
        <select
          name=''
          className='py-3 border-b font-light'
          id=''
          value={numOfPeople}
          onChange={(e) => setNumOfPeople(+e.target.value)}
        >
          {partySize.map((size) => (
            <option value={size.value} key={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className='py-3 border-b font-light w-24 text-reg'
            dateFormat='MMMM d'
            wrapperClassName='w-[48%]'
          />
        </div>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Time</label>
          <select
            name=''
            id=''
            className='py-3 border-b font-light'
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-5'>
        <button
          className='bg-red-600 rounded w-full px-4 text-white font-bold h-16'
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color='inherit' /> : 'Find a Time'}
        </button>
      </div>
      {data && data.length && (
        <div className='mt-4'>
          <p className='text-reg'>Select a Time</p>
          <div className='flex flex-wrap mt-2'>
            {data.map((t) => {
              return t.available ? (
                <Link
                  className='bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3'
                  href={`/reserve/${slug}?date=${day}T${t.time}&partySize=${numOfPeople}`}
                >
                  <p className='text-sm font-bold'>
                    {convertToDisplayTime(t.time)}
                  </p>
                </Link>
              ) : (
                <p className='bg-gray-300 p-2 w-24 mb-3 rounded mr-3'></p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
