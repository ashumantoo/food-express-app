'use client';
import Header from '@/components/header';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { CreateRestaurantInputInitialValue, cuisinesOptions, RoleTypeEnum, UserRegistrationInitialValue } from '@/utils/const';
import { ICreateRestaurantInput, IUserRegistration } from '@/utils/types';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

const Register: FC = () => {
  const router = useRouter();
  const [values, setValues] = useState<IUserRegistration>(UserRegistrationInitialValue);
  const [createRestaurantValues, setCreateRestaurantValues] =
    useState<ICreateRestaurantInput>(CreateRestaurantInputInitialValue);
  const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);

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
        if (values.role === RoleTypeEnum.RESTAURANT_OWNER) {
          setIsRestaurantOwner(true);
          setCreateRestaurantValues({
            ...createRestaurantValues,
            owner: jsonResponse.data._id
          })
        } else {
          router.push("/login");
        }
      } else {
        alert(jsonResponse.message);
      }
    } catch (error: unknown) {
      console.log(error);
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


  const handleCreateRestaurantSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const apiResponse = await fetch(API_ENDPOINTS.restaurants, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createRestaurantValues),
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        router.push('/restaurant-owner/dashboard')
      } else {
        alert(jsonResponse.message);
      }
    } catch (error: unknown) {
      console.log("Error while creating restaurant--->", error);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateRestaurantValues((prevValues) => {
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
        {!isRestaurantOwner && (
          <>
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
                    required
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
                    required
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
                  required
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
                  required
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="password">Password</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  className='w-full py-2 px-2'
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id='confirmPassword'
                  type='text'
                  name='confirmPassword'
                  className='w-full py-2 px-2'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  className='w-full py-3 px-2 bg-white'
                  value={values.role}
                  onChange={handleChange}
                  required
                >
                  <option value="USER">User</option>
                  <option value="RESTAURANT_OWNER">Restaurant Owner</option>
                </select>
              </div>
              <div className='px-6'>
                <button type='submit' className='w-full bg-red-500 text-white py-2 mt-4 mb-4 hover:bg-red-600'>Submit</button>
              </div>
            </form>
          </>
        )}

        {isRestaurantOwner && (
          <>
            <h3 className='text-xl font-bold text-center'>Please create restaurant</h3>
            <form onSubmit={handleCreateRestaurantSubmit}>
              <div className='px-6 my-4'>
                <label htmlFor="name">Name</label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  className='w-full py-2 px-2'
                  value={createRestaurantValues.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="name">Select cuisines</label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={(values) => {
                    setCreateRestaurantValues({
                      ...createRestaurantValues,
                      cuisines: values
                    });
                  }}
                  options={cuisinesOptions}
                  size='large'
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="email">Email</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  className='w-full py-2 px-2'
                  value={createRestaurantValues.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="mobile">Mobile</label>
                <input
                  id='mobile'
                  type='text'
                  name='mobile'
                  className='w-full py-2 px-2'
                  value={createRestaurantValues.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='px-6 my-4'>
                <label htmlFor="registrationNumber">Registration Number</label>
                <input
                  id='registrationNumber'
                  type='text'
                  name='registrationNumber'
                  className='w-full py-2 px-2'
                  value={createRestaurantValues.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='px-6 my-4'>
                <label htmlFor="street">Street</label>
                <input
                  id='street'
                  type='text'
                  name='street'
                  value={createRestaurantValues.address.street}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateRestaurantValues({
                      ...createRestaurantValues,
                      address: {
                        ...createRestaurantValues.address,
                        street: event.target.value
                      }
                    })
                  }}
                  className='w-full py-2 px-2'
                  required
                />
              </div>
              <div className='flex px-6 my-4 gap-6'>
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    id='city'
                    type='text'
                    name='city'
                    value={createRestaurantValues.address.city}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCreateRestaurantValues({
                        ...createRestaurantValues,
                        address: {
                          ...createRestaurantValues.address,
                          city: event.target.value
                        }
                      })
                    }}
                    className='w-full py-2 px-2'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <input
                    id='state'
                    type='text'
                    name='state'
                    className='w-full py-2 px-2'
                    value={createRestaurantValues.address.state}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCreateRestaurantValues({
                        ...createRestaurantValues,
                        address: {
                          ...createRestaurantValues.address,
                          state: event.target.value
                        }
                      })
                    }}
                    required
                  />
                </div>
              </div>
              <div className='flex px-6 my-4 gap-6'>
                <div>
                  <label htmlFor="country">Country</label>
                  <input
                    id='country'
                    type='text'
                    name='country'
                    className='w-full py-2 px-2'
                    value={createRestaurantValues.address.country}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCreateRestaurantValues({
                        ...createRestaurantValues,
                        address: {
                          ...createRestaurantValues.address,
                          country: event.target.value
                        }
                      })
                    }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipcode">Postal Code</label>
                  <input
                    id='zipcode'
                    type='text'
                    name='zipcode'
                    className='w-full py-2 px-2'
                    value={createRestaurantValues.address.zipcode}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCreateRestaurantValues({
                        ...createRestaurantValues,
                        address: {
                          ...createRestaurantValues.address,
                          zipcode: event.target.value
                        }
                      })
                    }}
                    required
                  />
                </div>
              </div>
              <div className='px-6'>
                <button type='submit' className='w-full bg-red-500 text-white py-2 mt-4 mb-4 hover:bg-red-600'>Submit</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default Register