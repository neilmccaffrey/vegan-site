import { useState } from 'react';
import Header from '../components/Header';
import RestaurantsList from '../components/RestaurantsList';

const Home = () => {
  const [displayRestaurants, setDisplayRestaurants] = useState(false);
  return (
    <>
      <Header />
      {/* give container width of w-128 to center button relative to list width */}
      <div className="flex flex-col mt-20 ml-10 w-128">
        <span className="self-center mb-2 text-xs">
          Click to show places within 25 miles that are vegan/vegan friendly!
        </span>
        <button
          onClick={() => setDisplayRestaurants(!displayRestaurants)}
          className="cursor-pointer rounded primary shadow-md p-2 w-fit self-center"
        >
          {!displayRestaurants ? 'Show Restaurants' : 'Hide Restaurants'}
        </button>
        {displayRestaurants && <RestaurantsList />}
      </div>
    </>
  );
};

export default Home;
