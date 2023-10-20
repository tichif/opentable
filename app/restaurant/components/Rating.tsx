import { Review } from '@prisma/client';

import { calculateReviewAvg } from '../../../utils/calculateReviewAvg';
import Stars from '../../components/Stars';

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className='flex items-end'>
      <div className='ratings mt-2 flex items-center'>
        <Stars reviews={reviews} />
        <p className='text-reg ml-3'>
          {calculateReviewAvg(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className='text-reg ml-4'>
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </p>
      </div>
    </div>
  );
};

export default Rating;
