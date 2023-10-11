import RestaurantNav from '../../components/RestaurantNav';
import MenuCard from './components/MenuCard';
import RestaurantLayout from '../../layout';

const RestaurantDetailMenuPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      <RestaurantNav slug={`${params.slug}`} />
      <main className='bg-white mt-5'>
        <div>
          <div className='mt-4 pb-1 mb-1'>
            <h1 className='font-bold text-4xl'>Menu</h1>
          </div>
          <div className='flex flex-wrap justify-between'>
            <MenuCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetailMenuPage;
