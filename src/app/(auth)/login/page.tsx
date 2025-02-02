'use client'
import Header from '@/components/header';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { RoleTypeEnum, UserLoginInitialValue } from '@/utils/const';
import { IUserLogin } from '@/utils/types';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

function Login() {
  const router = useRouter();
  const [values, setValues] = useState<IUserLogin>(UserLoginInitialValue);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const apiResponse = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        const { user } = jsonResponse;
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role === RoleTypeEnum.USER) {
          router.push("/");
        } else {
          router.push("/restaurant-owner/dashboard");
        }
      } else {
        alert(jsonResponse.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      throw error;
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [event.target.name]: event.target.value
      }
    });
  }

  return (
    <div className='min-h-screen'>
      <Header />
      <div className='h-0.5 bg-red-500'></div>
      <div className='w-2/5 m-auto py-6 my-10 bg-gray-100 shadow-md p-4'>
        <h3 className='text-xl font-bold text-center'>Welcome back, Please Login</h3>
        <form onSubmit={handleSubmit}>
          <div className='px-6 my-4'>
            <label htmlFor="email">Email</label>
            <input id='email' type='email' name='email' className='w-full py-2 px-2' value={values.email} onChange={handleChange} />
          </div>
          <div className='px-6 my-4'>
            <label htmlFor="password">Password</label>
            <input id='password' type='password' name='password' className='w-full py-2 px-2' value={values.password} onChange={handleChange} />
          </div>
          <div className='px-6'>
            <button type='submit' className='w-full bg-red-500 text-white py-2 mt-4 mb-4 hover:bg-red-600'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login