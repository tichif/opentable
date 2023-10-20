import { Cuisine, Location, Price, Review } from '@prisma/client';
import Link from 'next/link';

import PriceComponent from '../../components/Price';

import { calculateReviewAvg } from '../../../utils/calculateReviewAvg';
import Stars from '../../components/Stars';

interface Props {
  restaurant: {
    name: string;
    slug: string;
    main_image: string;
    price: Price;
    location: Location;
    cuisine: Cuisine;
    reviews: Review[];
  };
}

const Detail = ({ restaurant }: Props) => {
  function convert(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  function renderRatingText() {
    const rating = calculateReviewAvg(restaurant.reviews);

    if (rating > 4) {
      return 'Awesome';
    }
    if (rating <= 4 && rating > 3) {
      return 'Good';
    }

    if (rating <= 3 && rating > 0) {
      return 'Average';
    }

    return '';
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
          <Stars reviews={restaurant.reviews} />
          <p className='ml-2 text-sm'>{renderRatingText()}</p>
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
