import { Price, PrismaClient } from '@prisma/client';

import SearchForm from '../components/SearchForm';
import Detail from './components/Detail';
import Sidebar from './components/Sidebar';

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: Price;
}

const prisma = new PrismaClient();

async function fetchRestaurantsByQuery(searchParams: SearchParams) {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine,
      },
    };
    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    name: true,
    location: true,
    cuisine: true,
    price: true,
    slug: true,
    main_image: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
}

async function getLocations() {
  const locations = await prisma.location.findMany({});
  return locations;
}

async function getCuisines() {
  return await prisma.cuisine.findMany({});
}

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantsByQuery(searchParams);
  const cuisines = await getCuisines();
  const locations = await getLocations();
  return (
    <>
      <div className='bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2'>
        <div className='text-left text-lg py-3 m-auto flex justify-center'>
          <SearchForm />
        </div>
      </div>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <Sidebar
          cuisines={cuisines}
          locations={locations}
          searchParams={searchParams}
        />
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
