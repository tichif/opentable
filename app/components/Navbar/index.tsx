'use client';

import Link from 'next/link';
import AuthModal from '../AuthModal';
import { useAuthContext } from '../../context/AuthContext';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { loading, data } = useAuthContext();
  const { signOut } = useAuth();

  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='/' className='font-bold text-gray-700 text-2xl'>
        {' '}
        OpenTable{' '}
      </Link>
      <div>
        {!loading && (
          <div className='flex'>
            {data ? (
              <button
                className='bg-red-400 text-white border p-1 px-4 rounded mr-3'
                onClick={signOut}
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignin />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
