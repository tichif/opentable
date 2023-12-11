import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { partySize } from '../../../data';

import ReservationForm from '../components/Form';
import Header from '../components/Header';

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      main_image: true,
    },
  });

  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

const ReservationPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className='border-t h-screen'>
        <div className='py-9 w-3/5 m-auto'>
          <Header
            restaurant={restaurant}
            date={searchParams.date}
            partySize={searchParams.partySize}
          />
          <ReservationForm
            slug={params.slug}
            partySize={+searchParams.partySize}
            date={searchParams.date}
          />
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
