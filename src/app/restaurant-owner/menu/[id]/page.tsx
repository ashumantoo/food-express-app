import FoodMenuMutation from '@/components/food-menu-mutation'
import { DoubleRightOutlined } from '@ant-design/icons'
import React from 'react'

const FoodMenuDetails = () => {
  return (
    <div>
      <h3 className='text-2xl font-bold'>
        <span>Menu</span>
        <DoubleRightOutlined className='h-4 w-4 mx-2' />
        <span>Update Menu</span>
      </h3>
      <FoodMenuMutation />
    </div>
  )
}

export default FoodMenuDetails