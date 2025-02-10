import { MenuCategoriesEnum, MenuCategoriesValue } from '@/utils/const';
import { IMenu } from '@/utils/types';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';

interface IProps {
  meal: IMenu
}

const MealCard: FC<IProps> = ({ meal }) => {
  const router = useRouter();

  const handleAdd = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      //Add item to cart here
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
      <img src={meal.imageUrl} alt={meal.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{meal.name}</h2>
        <p className="text-gray-500 text-sm mt-1">⏱ {`40-45`} min</p>
        <p className="text-gray-500 text-sm mt-1">Price: <span className='font-bold'>₹{meal.price} </span></p>
        <div className="text-gray-500 text-sm mt-1 flex justify-between items-center">
          <div className='flex items-center'>
            <div className={`w-2 h-2 rounded-full ${meal.category === MenuCategoriesEnum.VEG ? 'bg-green-700' : 'bg-red-700'}`}></div>
            <p className='ml-1'>{MenuCategoriesValue[meal.category]}</p>
          </div>
          <div>
            <button className='bg-red-500 text-white px-5 py-1' onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealCard