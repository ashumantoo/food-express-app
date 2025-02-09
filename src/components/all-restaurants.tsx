'use client';
import React, { FC, useEffect, useState } from 'react';
import RestaurantCard from './restaurant-card';
import { IRestaurant } from '@/utils/types';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { message, Spin } from 'antd';

interface IProps {
  limit?: number;
}

const AllRestaurants: FC<IProps> = ({ limit }) => {
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
      console.log("Error while fetching popular restaurants--->", error);
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
        <div className='grid grid-cols-4 gap-y-8 mt-4'>
          {popularRestaurants.map((restaurant) => {
            return <RestaurantCard restaurant={restaurant} key={restaurant._id} />
          })}
        </div>
      )}
    </div>
  )
}

export default AllRestaurants