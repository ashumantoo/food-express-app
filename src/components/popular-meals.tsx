'use client'
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { IMenu } from '@/utils/types';
import { message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import MealCard from './meal-card';

const PopularMeals = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [popularMeals, setPopularMeals] = useState<IMenu[]>([]);
  const [loading, setLoading] = useState(false);

  const getPopularMeals = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.meals}?limit=10`, {
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
    getPopularMeals().then((data) => {
      setPopularMeals(data);
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
        <div className='grid grid-cols-4 gap-x-4 gap-y-8 mt-4'>
          {popularMeals.map((meal) => {
            return <MealCard meal={meal} key={meal._id} />
          })}
        </div>
      )}
    </div>
  )
}

export default PopularMeals