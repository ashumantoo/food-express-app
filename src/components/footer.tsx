import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto text-center py-8 text-white bg-red-500">
        <p>&copy; <span id="current-year"></span> Food Express. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer