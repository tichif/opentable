import SearchForm from '../components/SearchForm';
import Detail from './components/Detail';
import Sidebar from './components/Sidebar';

const SearchPage = () => {
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
          <Detail />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
