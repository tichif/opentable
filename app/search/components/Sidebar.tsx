import { Cuisine, Location, Price } from '@prisma/client';
import CuisineView from './Cuisine';
import LocationComponent from './Location';
import PriceView from './Price';

const Sidebar = ({
  cuisines,
  locations,
  searchParams,
}: {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: { city?: string; cuisine?: string; price?: Price };
}) => {
  return (
    <div className='w-1/5'>
      <div className='border-b pb-4 flex flex-col'>
        <h1 className='mb-2'>Region</h1>
        {!locations.length ? (
          <p>No locations</p>
        ) : (
          locations.map((location) => (
            <LocationComponent
              location={location}
              key={location.id}
              searchParams={searchParams}
            />
          ))
        )}
      </div>
      <div className='border-b pb-4 mt-3 flex flex-col'>
        <h1 className='mb-2'>Cuisine</h1>
        {!cuisines.length ? (
          <p>No cuisines</p>
        ) : (
          cuisines.map((cuisine) => (
            <CuisineView
              key={cuisine.id}
              cuisine={cuisine}
              searchParams={searchParams}
            />
          ))
        )}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex'>
          <PriceView searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
