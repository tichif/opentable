import { Location, Price } from '@prisma/client';
import Link from 'next/link';

const LocationView = ({
  location,
  searchParams,
}: {
  location: Location;
  searchParams: { city?: string; cuisine?: string; price?: Price };
}) => {
  return (
    <Link
      href={{
        pathname: '/search',
        query: {
          ...searchParams,
          city: location.name,
        },
      }}
      className='font-light text-reg capitalize'
    >
      {location.name}
    </Link>
  );
};

export default LocationView;
