import Link from 'next/link';
import AuthModal from '../AuthModal';

const Navbar = () => {
  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='/' className='font-bold text-gray-700 text-2xl'>
        {' '}
        OpenTable{' '}
      </Link>
      <div>
        <div className='flex'>
          <AuthModal isSignin />
          <AuthModal isSignin={false} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
