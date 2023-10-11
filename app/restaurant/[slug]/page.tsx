import { PrismaClient } from '@prisma/client';

import Description from '../components/Description';
import Header from '../components/Header';
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
    },
  });
  if (!restaurant) {
    throw new Error();
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
        <Rating />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetailPage;
