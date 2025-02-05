'use client'
import RestaurantProfile from '@/components/restaurant-profile'
import UserProfile from '@/components/user-profile'
import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const AccountSettingPage = () => {

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'User Profile',
      children: <UserProfile />,
    },
    {
      key: '2',
      label: 'Restaurant Profile',
      children: <RestaurantProfile />,
    }
  ]

  return (
    <div>
      <Tabs size='middle' defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default AccountSettingPage