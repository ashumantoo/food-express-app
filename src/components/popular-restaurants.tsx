'use client';
import React, { useEffect, useState } from 'react';
import RestaurantCard from './restaurant-card';
import { IRestaurant } from '@/utils/types';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { message, Spin } from 'antd';

const PopularRestaurants = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [popularRestaurants, setPopularRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const getPopularRestaurants = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurants}`, {
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
      console.log("Error while fetching user--->", error);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    getPopularRestaurants().then((data) => {
      setPopularRestaurants(data);
      setLoading(false);
    }).catch((error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      });
      setLoading(false);
      console.log(error);
    });
  }, []);

  return (
    <div>
      {contextHolder}
      {loading ? <Spin /> : (
        <div className='flex items-start gap-4 mt-4'>
          {popularRestaurants.map((restaurant) => {
            return <RestaurantCard restaurant={restaurant} key={restaurant._id} />
          })}
        </div>
      )}
    </div>
  )
}

export default PopularRestaurants