import { PrismaClient, Item } from '@prisma/client';

import RestaurantNav from '../../components/RestaurantNav';
import MenuCard from './components/MenuCard';

const prisma = new PrismaClient();

async function fetchItems(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }
  return restaurant.items;
}

const RestaurantDetailMenuPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const items = await fetchItems(params.slug);
  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      <RestaurantNav slug={`${params.slug}`} />
      <main className='bg-white mt-5'>
        <div>
          <div className='mt-4 pb-1 mb-1'>
            <h1 className='font-bold text-4xl'>Menu</h1>
          </div>
          <div className='flex flex-wrap justify-between'>
            {items.length ? (
              <MenuCard items={items} />
            ) : (
              <p>This restaurant don't have a menu yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetailMenuPage;
