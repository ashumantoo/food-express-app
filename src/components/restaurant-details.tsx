'use client'
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { CuisinesEnumValue, MenuCategoriesEnum, MenuCategoriesValue } from '@/utils/const';
import { IRestaurantDetails } from '@/utils/types';
import { GlobalOutlined } from '@ant-design/icons';
import { Image, message, Spin } from 'antd';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MealCard from './meal-card';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [restaurantDetails, setRestaurantDetails] = useState<IRestaurantDetails>();
  const [loading, setLoading] = useState(false);

  const getRestaurantDetails = async (id: string) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurants}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        return jsonResponse.data;
      } else {
        alert(jsonResponse.message);
        throw new Error(jsonResponse.message);
      }
    } catch (error: any) {
      console.log("Error while fetching popular restaurants--->", error);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    if (id && typeof id === 'string') {
      getRestaurantDetails(id).then((data) => {
        setRestaurantDetails(data);
        setLoading(false);
      }).catch((error) => {
        alert(error.message);
        setLoading(false);
        console.log(error);
      });
    }
  }, [id]);

  return (
    <>
      {loading ? <Spin /> : (
        <div className='w-3/5 mx-auto my-6'>
          <div className='bg-gray-100 shadow-md p-4 rounded-2xl'>
            <h3 className='text-2xl font-bold'>{restaurantDetails?.restaurant.name}</h3>
            <p className='text-red-400 font-bold underline tracking-wide cursor-pointer'>{restaurantDetails?.restaurant.cuisines.map((c) => CuisinesEnumValue[c]).join(', ')}</p>
            <p className='font-normal mt-2 opacity-70'><span><GlobalOutlined /></span> {`${restaurantDetails?.restaurant.address.street}, ${restaurantDetails?.restaurant.address.city}`}</p>
          </div>
          <h3 className='mt-12 text-xl font-semibold'>Browse Restaurant's Menus</h3>
          <hr className='mt-2' />
          <div className='mt-2'>
            {restaurantDetails?.menus.map((menu) => (
              <div key={menu._id}>
                <div className='w-full my-4 p-4 flex items-center justify-between gap-4'>
                  <div>
                    <span className={`text-white font-semibold px-1 py-0.5 ${menu.category === MenuCategoriesEnum.VEG ? 'bg-green-700' : 'bg-red-700'}`}>{MenuCategoriesValue[menu.category]}</span>
                    <p className='text-lg font-bold'>{menu.name}</p>
                    <p> <span className='line-through opacity-40 font-medium'>₹{menu.price}</span> <span className='font-medium'>₹{menu.discountedPrice}</span></p>
                    <p className='mt-2 text-base opacity-70'>{menu.description}</p>
                  </div>
                  <div>
                    <div>
                      <Image className='block' src={menu.imageUrl} height={120} width={140} alt={menu.name} />
                    </div>
                    <div className='text-center'>
                      <button className='bg-red-500 w-full text-white rounded-xl py-1 font-bold uppercase mt-1 hover:bg-red-600'>Add</button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default RestaurantDetails