'use client';

import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

import Inputs from './Inputs';
import useAuth from '../../../hooks/useAuth';
import { useAuthContext } from '../../context/AuthContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Auth({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { signIn, signUp } = useAuth();
  const { error, loading, data } = useAuthContext();

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignin) {
      if (inputs.password || inputs.email) {
        setDisabled(false);
        return;
      }
    } else {
      if (
        inputs.firstName ||
        inputs.lastName ||
        inputs.email ||
        inputs.phone ||
        inputs.password ||
        inputs.city
      ) {
        setDisabled(false);
        return;
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (isSignin) {
      signIn({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signUp(inputs, handleClose);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${
          isSignin ? 'bg-blue-400 text-white' : ''
        } border p-1 px-4 rounded mr-3`}
      >
        {isSignin ? 'Sign in' : 'Sign up'}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <div className='px-2 py-24 h-[600px] flex justify-center'>
              <CircularProgress />
            </div>
          ) : (
            <div className='p-2 h-[600px]'>
              {error && (
                <Alert severity='error' className='mb-4'>
                  {error}
                </Alert>
              )}
              <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                <p className='text-sm'>
                  {isSignin ? 'Sign in' : 'Create Account'}
                </p>
              </div>
              <div className='m-auto'>
                <h2 className='text-2xl font-light text-center'>
                  {isSignin
                    ? 'Log into your account'
                    : 'Create your Oppentable account'}
                </h2>
                <Inputs
                  isSignin={isSignin}
                  inputs={inputs}
                  handleChange={handleChange}
                />
                <button
                  className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {isSignin ? 'Sign in' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
