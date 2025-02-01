'use client';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { UserRegistrationInitialValue } from '@/utils/const';
import { IUserRegistration } from '@/utils/types';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

const Register: FC = () => {
  const router = useRouter();
  const [values, setValues] = useState<IUserRegistration>(UserRegistrationInitialValue);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const apiResponse = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        router.push("/login");
      } else {
        alert(jsonResponse.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      throw error;
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [event.target.name]: event.target.value
      }
    });
  }

  return (
    <div className='min-h-screen'>
      <div className='h-0.5 bg-red-500'></div>
      <div className='w-2/5 m-auto py-6 my-10 bg-gray-100 shadow-md p-4'>
        <h3 className='text-xl font-bold text-center'>User Registration Form</h3>
        <form onSubmit={handleSubmit}>
          <div className='flex px-6 my-4 gap-6'>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id='firstName'
                type='text'
                name='firstName'
                className='w-full py-2 px-2'
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id='lastName'
                type='text'
                name='lastName'
                className='w-full py-2 px-2'
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='px-6 my-4'>
            <label htmlFor="email">Email</label>
            <input
              id='email'
              type='email'
              name='email'
              className='w-full py-2 px-2'
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className='px-6 my-4'>
            <label htmlFor="mobile">Mobile</label>
            <input
              id='mobile'
              type='text'
              name='mobile'
              className='w-full py-2 px-2'
              value={values.mobile}
              onChange={handleChange}
            />
          </div>
          <div className='px-6 my-4'>
            <label htmlFor="password">Password</label>
            <input
              id='password'
              type='text'
              name='password'
              className='w-full py-2 px-2'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className='px-6 my-4'>
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              className='w-full py-3 px-2 
            bg-white'
              value={values.role}
              onChange={handleChange}
            >
              <option value="USER">User</option>
              <option value="RESTAURANT_OWNER">Restaurant Owner</option>
            </select>
          </div>
          {/* <div className='px-6 my-4'>
            <label htmlFor="street">Address Line 1</label>
            <input id='street' type='text' name='street' className='w-full py-2 px-2' />
          </div>
          <div className='flex px-6 my-4 gap-6'>
            <div>
              <label htmlFor="city">City</label>
              <input id='city' type='text' name='city' className='w-full py-2 px-2' />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input id='state' type='text' name='state' className='w-full py-2 px-2' />
            </div>
          </div>
          <div className='flex px-6 my-4 gap-6'>
            <div>
              <label htmlFor="country">Country</label>
              <input id='country' type='text' name='country' className='w-full py-2 px-2' />
            </div>
            <div>
              <label htmlFor="zipcode">Postal Code</label>
              <input id='zipcode' type='text' name='zipcode' className='w-full py-2 px-2' />
            </div>
          </div> */}
          <div className='px-6'>
            <button type='submit' className='w-full bg-red-500 text-white py-2 mt-4 mb-4 hover:bg-red-600'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register