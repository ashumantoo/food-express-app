import Header from "@/components/header";
import HeroComponent from "../components/hero";
import { CuisinesEnum, CuisinesEnumValue } from "@/utils/const";
import { Image } from "antd";
import Link from "next/link";
import PopularRestaurants from "@/components/all-restaurants";
import PopularMeals from "@/components/popular-meals";

export default function Home() {
  const cusineImages = [
    {
      imageUrl: '/cuisins/south-indian-food.jpg',
      cuisineName: CuisinesEnum.SOUTH_INDIAN
    },
    {
      imageUrl: '/cuisins/north-indian-food.jpg',
      cuisineName: CuisinesEnum.NORTH_INDIAN
    },
    {
      imageUrl: '/cuisins/biryani.jpg',
      cuisineName: CuisinesEnum.BIRYANI
    },
    {
      imageUrl: '/cuisins/pizza.jpg',
      cuisineName: CuisinesEnum.PIZZA
    },
    {
      imageUrl: '/cuisins/chinese.jpg',
      cuisineName: CuisinesEnum.CHAINES
    },
    {
      imageUrl: '/cuisins/cake.jpg',
      cuisineName: CuisinesEnum.CAKE
    },
    {
      imageUrl: '/cuisins/sweets.jpg',
      cuisineName: CuisinesEnum.SWEETS
    }
  ]
  return (
    <div>
      <Header />
      <HeroComponent />
      <div className="h-56 text-black">
        <div className="w-3/4 m-auto mt-12">
          <h3 className="text-2xl font-bold">What you wish to eat?</h3>
          <hr className="mt-2" />
          <div className="flex items-center justify-center gap-10 mt-4">
            {cusineImages.map((ci, index) => {
              return (
                <Link key={index} href={`/restaurants?cuisines_type=${ci.cuisineName}`} className="transition-transform duration-300 transform hover:scale-105">
                  <Image
                    src={ci.imageUrl}
                    height={120}
                    width={120}
                    alt="Cuisine Image"
                    className="rounded-full"
                    preview={false}
                  />
                  <p className="text-center">{CuisinesEnumValue[ci.cuisineName]}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="my-12">
        <div className="w-3/4 m-auto">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Popular restaurants</h3>
            <Link href={'/restaurants'} className="bg-red-500 text-white px-4 py-1 hover:scale-105">View All</Link>
          </div>
          <hr className="mt-2" />
          <PopularRestaurants limit={5} />
        </div>
      </div>
      <div className="my-12">
        <div className="w-3/4 m-auto">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Popular meals</h3>
            <Link href={'/restaurants'} className="bg-red-500 text-white px-4 py-1 hover:scale-105">View All</Link>
          </div>
          <hr className="mt-2" />
          <PopularMeals />
        </div>
      </div>
    </div>
  );
}
