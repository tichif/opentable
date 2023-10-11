import { PrismaClient } from '@prisma/client';

import SearchForm from '../components/SearchForm';
import Detail from './components/Detail';
import Sidebar from './components/Sidebar';

const prisma = new PrismaClient();

async function fetchRestaurantsByQuery(city: string) {
  const select = {
    name: true,
    location: true,
    cuisine: true,
    price: true,
    slug: true,
    main_image: true,
  };

  if (!city) {
    return prisma.restaurant.findMany({
      select,
    });
  }
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
    select,
  });
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { city: string };
}) => {
  const restaurants = await fetchRestaurantsByQuery(
    searchParams.city.toLowerCase()
  );
  return (
    <>
      <div className='bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2'>
        <div className='text-left text-lg py-3 m-auto flex justify-center'>
          <SearchForm />
        </div>
      </div>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <Sidebar />
        <div className='w-5/6'>
          {restaurants.length ? (
            restaurants.map((restaurant, i) => (
              <Detail restaurant={restaurant} key={i} />
            ))
          ) : (
            <p>No restaurants based on your research.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
