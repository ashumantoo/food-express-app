import { CuisinesEnum, CuisinesEnumValue } from '@/utils/const';
import { IRestaurant } from '@/utils/types';
import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {
  restaurant: IRestaurant
}

const RestaurantCard: FC<IProps> = ({ restaurant }) => {
  return (
    <Link href={`/restaurants/${restaurant._id}`} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
      <img src={restaurant.restaurantImage} alt={restaurant.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
        <p className="text-gray-500 text-sm">⏱ {`40-45`} min</p>

        {/* <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} fill={index < rating ? "currentColor" : "none"} stroke="currentColor" />
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">({rating}/5)</span>
        </div> */}

        <p className="text-gray-600 text-sm mt-2">{restaurant.cuisines.map((cuisine: CuisinesEnum) => CuisinesEnumValue[cuisine]).join(", ")}</p>
      </div>
    </Link>
  )
}

export default RestaurantCard