import HeroComponent from "../components/hero";

export default function Home() {
  return (
    <div>
      <HeroComponent />
      <div className="h-56 bg-gray-300">
        <h3>Home Page containing the Restaurants list</h3>
      </div>
    </div>
  );
}
