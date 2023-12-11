import React from 'react';

import { convertToDisplayTime, Time } from '../../../utils/convertTime';

type Props = {
  restaurant: {
    name: string;
    main_image: string;
  };
  date: string;
  partySize: string;
};

const Header = ({ restaurant, date, partySize }: Props) => {
  const [day, time] = date.split('T');

  return (
    <div>
      <h3 className='font-bold'>You're almost done!</h3>
      <div className='mt-5 flex'>
        <img src={restaurant.main_image} alt='' className='w-32 h-18 rounded' />
        <div className='ml-4'>
          <h1 className='text-3xl font-bold'>{restaurant.name}</h1>
          <div className='flex mt-3'>
            <p className='mr-6'>
              {new Date(day).toLocaleDateString('en-En', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className='mr-6'>{convertToDisplayTime(time as Time)}</p>
            <p className='mr-6'>
              {parseInt(partySize) === 1
                ? '1 person'
                : `${parseInt(partySize)} people`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
