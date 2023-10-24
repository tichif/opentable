import { ChangeEvent } from 'react';

type Props = {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  isSignin: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Inputs = ({ isSignin, inputs, handleChange }: Props) => {
  return (
    <div>
      {!isSignin && (
        <div className='my-3 flex justify-between tx-sm'>
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='First Name'
            value={inputs.firstName}
            onChange={handleChange}
            name='firstName'
          />
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='Last Name'
            value={inputs.lastName}
            onChange={handleChange}
            name='lastName'
          />
        </div>
      )}
      <div className='my-3 flex justify-between tx-sm'>
        <input
          type='email'
          className='border rounded p-2 py-3 w-full'
          placeholder='Email'
          value={inputs.email}
          onChange={handleChange}
          name='email'
        />
      </div>
      {!isSignin && (
        <div className='my-3 flex justify-between tx-sm'>
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='Phone'
            value={inputs.phone}
            onChange={handleChange}
            name='phone'
          />
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='City'
            value={inputs.city}
            onChange={handleChange}
            name='city'
          />
        </div>
      )}
      <div className='my-3 flex justify-between tx-sm'>
        <input
          type='password'
          className='border rounded p-2 py-3 w-full'
          placeholder='Password'
          value={inputs.password}
          onChange={handleChange}
          name='password'
        />
      </div>
    </div>
  );
};

export default Inputs;
