import Header from '@/components/header'
import RestaurantProfile from '@/components/restaurant-profile'
import UserProfile from '@/components/user-profile'
import React from 'react'

const AccountSettingPage = () => {
  return (
    <div>
      <Header />
      <UserProfile />
      <RestaurantProfile />
    </div>
  )
}

export default AccountSettingPage