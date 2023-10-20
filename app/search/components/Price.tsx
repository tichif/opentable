import { Price } from '@prisma/client';
import Link from 'next/link';

const PriceView = ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: Price };
}) => {
  return (
    <>
      <Link
        href={{
          pathname: '/search',
          query: {
            ...searchParams,
            price: Price.CHEAP,
          },
        }}
        className='border w-full text-reg font-light rounded-l p-2'
      >
        $
      </Link>
      <Link
        href={{
          pathname: '/search',
          query: {
            ...searchParams,
            price: Price.REGULAR,
          },
        }}
        className='border-r border-t border-b w-full text-reg font-light p-2'
      >
        $$
      </Link>
      <Link
        href={{
          pathname: '/search',
          query: {
            ...searchParams,
            price: Price.EXPENSIVE,
          },
        }}
        className='border-r border-t border-b w-full text-reg font-light p-2 rounded-r'
      >
        $$$
      </Link>
    </>
  );
};

export default PriceView;
