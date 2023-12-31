import { PrismaClient } from '@prisma/client';

import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';

const prisma = new PrismaClient();

async function fetchRestaurants() {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurants;
}
export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap '>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
