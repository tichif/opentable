import Description from '../components/Description';
import Header from '../components/Header';
import Images from '../components/Images';
import Rating from '../components/Rating';
import ReservationCard from '../components/ReservationCard';
import RestaurantNav from '../components/RestaurantNav';
import Reviews from '../components/Reviews';
import Title from '../components/Title';
import RestaurantLayout from '../layout';

const RestaurantDetailPage = () => {
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNav slug='ass' />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetailPage;
