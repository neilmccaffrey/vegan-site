import { useState } from 'react';
import Header from '../components/Header';
import RestaurantsList from '../components/RestaurantsList';

const Home = () => {
  const [displayRestaurants, setDisplayRestaurants] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <title>Friendly Vegan | Vegan Restaurants Near You</title>
      <meta
        name="description"
        content="Discover top vegan and vegan-friendly restaurants within 25 miles."
      />
      <meta
        name="keywords"
        content="vegan, plant-based, restaurants, food, healthy eating"
      />
      {/* <link rel="canonical" href="https://yourdomain.com" /> */}

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
          disabled={loading}
          className={`cursor-pointer rounded primary shadow-md p-2 w-fit self-center ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading
            ? 'Loading...'
            : displayRestaurants
              ? 'Hide Restaurants'
              : 'Show Restaurants'}
        </button>
        {displayRestaurants && (
          <RestaurantsList loading={loading} setLoading={setLoading} />
        )}
      </div>
    </>
  );
};

export default Home;
