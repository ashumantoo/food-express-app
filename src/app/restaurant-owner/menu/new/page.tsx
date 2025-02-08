import FoodMenuMutation from '@/components/food-menu-mutation'
import React from 'react'
import { DoubleRightOutlined } from '@ant-design/icons';
import { message } from 'antd';

const NewMenuPage = () => {

  return (
    <div>
      <h3 className='text-2xl font-bold'>
        <span>Menu</span>
        <DoubleRightOutlined className='h-4 w-4 mx-2' />
        <span>Create Menu</span>
      </h3>
      <FoodMenuMutation />
    </div>
  )
}

export default NewMenuPage