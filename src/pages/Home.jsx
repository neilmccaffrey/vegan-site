import { useState } from 'react';
import Header from '../components/Header';
import RestaurantsList from '../components/RestaurantsList';

const Home = () => {
  const [displayRestaurants, setDisplayRestaurants] = useState(false);
  return (
    <>
      <Header />
      {/* give container width of w-128 to center button relative to list width */}
      <div className="flex flex-col mt-20 md:ml-10 md:w-128 md:w-96 mb-20">
        {!displayRestaurants && (
          <span className="self-center mb-2 text-xs">
            Click to show all vegan/vegan friendly places within 25 miles!
          </span>
        )}
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
