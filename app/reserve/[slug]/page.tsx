import ReservationForm from '../components/Form';
import Header from '../components/Header';

const ReservationPage = () => {
  return (
    <>
      <div className='border-t h-screen'>
        <div className='py-9 w-3/5 m-auto'>
          <Header />
          <ReservationForm />
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
