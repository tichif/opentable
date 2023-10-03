import RestaurantNav from '../../components/RestaurantNav';

const RestaurantDetailMenuPage = () => {
  return (
    <>
      {/* NAVBAR */} {/* HEADER */}
      <div className='h-96 overflow-hidden'>
        <div className='bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center'>
          <h1 className='text-7xl text-white captitalize text-shadow text-center'>
            Milestones Grill (Toronto)
          </h1>
        </div>
      </div>
      {/* HEADER */} {/* DESCRIPTION PORTION */}
      <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
        <div className='bg-white w-[100%] rounded p-3 shadow'>
          {/* RESAURANT NAVBAR */}
          <RestaurantNav slug='/ass' />
          {/* RESAURANT NAVBAR */} {/* MENU */}
          <main className='bg-white mt-5'>
            <div>
              <div className='mt-4 pb-1 mb-1'>
                <h1 className='font-bold text-4xl'>Menu</h1>
              </div>
              <div className='flex flex-wrap justify-between'>
                {/* MENU CARD */}
                <div className=' border rounded p-3 w-[49%] mb-3'>
                  <h3 className='font-bold text-lg'>Surf and Turf</h3>
                  <p className='font-light mt-1 text-sm'>
                    A well done steak with lobster and rice
                  </p>
                  <p className='mt-7'>$80.00</p>
                </div>
                {/* MENU CARD */}
              </div>
            </div>
          </main>
          {/* MENU */}
        </div>
      </div>
      {/* DESCRIPTION PORTION */}
    </>
  );
};

export default RestaurantDetailMenuPage;
