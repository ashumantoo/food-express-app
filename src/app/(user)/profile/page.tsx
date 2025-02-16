import Header from '@/components/header'
import UserProfile from '@/components/user-profile'
import React from 'react'

const UserProfilePage = () => {
  return (
    <div>
      <Header />
      <div className='w-3/4 mx-auto mb-8 mt-8 border shadow-lg'>
        <UserProfile />
      </div>
    </div>
  )
}

export default UserProfilePage