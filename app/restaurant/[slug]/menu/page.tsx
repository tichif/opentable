import Header from '../../components/Header';
import RestaurantNav from '../../components/RestaurantNav';
import MenuCard from './components/MenuCard';

const RestaurantDetailMenuPage = () => {
  return (
    <>
      <Header />
      <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
        <div className='bg-white w-[100%] rounded p-3 shadow'>
          <RestaurantNav slug='/ass' />
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
      </div>
    </>
  );
};

export default RestaurantDetailMenuPage;
