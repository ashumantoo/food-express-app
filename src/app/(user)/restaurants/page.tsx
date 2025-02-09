import AllRestaurants from '@/components/all-restaurants'
import Header from '@/components/header'
import React from 'react'

const AllRestaurantsPage = () => {
  return (
    <div>
      <Header />
      <div className='w-3/4 mx-auto my-6'>
        <AllRestaurants />
      </div>
    </div>
  )
}

export default AllRestaurantsPage