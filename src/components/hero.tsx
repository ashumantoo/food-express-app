import Image from 'next/image';
import React from 'react'

const HeroComponent = () => {
  return (
    <div className="h-full relative">
      <img
        src="/hero-img.jpg"
        className="bg-transparent"
        style={{
          width: "100%",
          height: 500,
          objectFit: "cover",
        }}
        alt=""
      />
      {/* inset-0 equal to top:0,bottom:0,left:0; right:0 */}
      <div className="absolute inset-0 bg-black/50"></div> {/* Adds a dark overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-white text-3xl font-bold mb-2 uppercase">Discover Restaurants that</h2>
        <h2 className="text-white text-3xl font-bold mb-4 uppercase">deliver near you</h2>
        <div className="flex justify-center items-center gap-1 w-full">
          <input
            type="text"
            placeholder="Enter your address to search"
            className="w-2/3 px-4 py-2 text-gray-800"
          />
          <button className="px-6 py-2 bg-red-500 text-white hover:bg-red-600">
            Search
          </button>
        </div>
      </div>
    </div>

  )
}

export default HeroComponent;