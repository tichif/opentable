import { Cuisine, Location, Price } from '@prisma/client';
import Link from 'next/link';

import PriceComponent from '../../components/Price';

interface Props {
  restaurant: {
    name: string;
    slug: string;
    main_image: string;
    price: Price;
    location: Location;
    cuisine: Cuisine;
  };
}

const Detail = ({ restaurant }: Props) => {
  function convert(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }
  return (
    <div className='border-b flex pb-5'>
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className='w-44 rounded'
      />
      <div className='pl-5'>
        <h2 className='text-3xl'>{restaurant.name}</h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>*****</div>
          <p className='ml-2 text-sm'>Awesome</p>
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <PriceComponent price={restaurant.price} />
            <p className='mr-4'>{convert(restaurant.cuisine.name)}</p>
            <p className='mr-4'>{convert(restaurant.location.name)}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
