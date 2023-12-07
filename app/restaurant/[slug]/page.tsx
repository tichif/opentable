import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

import Description from '../components/Description';
import Images from '../components/Images';
import Rating from '../components/Rating';
import ReservationCard from '../components/ReservationCard';
import RestaurantNav from '../components/RestaurantNav';
import Reviews from '../components/Reviews';
import Title from '../components/Title';
import RestaurantLayout from '../layout';

const prisma = new PrismaClient();

async function fetchRestaurantBySlug(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      id: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
}

const RestaurantDetailPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNav slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={params.slug}
        />
      </div>
    </>
  );
};

export default RestaurantDetailPage;
