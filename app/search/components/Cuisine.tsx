import { Cuisine, Price } from '@prisma/client';
import Link from 'next/link';

const CuisineView = ({
  cuisine,
  searchParams,
}: {
  cuisine: Cuisine;
  searchParams: { city?: string; cuisine?: string; price?: Price };
}) => {
  return (
    <Link
      href={{
        pathname: '/search',
        query: {
          ...searchParams,
          cuisine: cuisine.name,
        },
      }}
      className='font-light text-reg capitalize'
    >
      {cuisine.name}
    </Link>
  );
};

export default CuisineView;
