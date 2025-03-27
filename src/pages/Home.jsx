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
      <div className="flex flex-col md:flex-row mt-20">
        <div className="flex flex-col md:ml-10 md:w-128 md:w-96 mb-20">
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
        <div className="flex w-full mr-1 justify-center">
          <div className="flex flex-col ml-2">
            <p className="text-4xl md:text-6xl text-center">
              🌱 Being Vegan 🌱
            </p>
            <p className="mt-10 font-bold text-xl">🐷 Saving Animal Lives!</p>
            <p className="ml-3">
              • The average vegan saves{' '}
              <span className="font-bold">30 animal lives per month</span> (~365
              per year).
            </p>
            <p className="ml-3">
              • This includes farm animals like chickens, pigs, cows, and fish
              that would otherwise be killed for food.
            </p>
            <p className="mt-5 font-bold text-xl">💧 Water Conservation!</p>
            <p className="ml-3">
              • A vegan diet saves{' '}
              <span className="font-bold">
                219,000 gallons of water per year
              </span>{' '}
              (~600 gallons per day).
            </p>
            <p className="ml-3">
              • Producing 1 pound of beef requires{' '}
              <span className="font-bold">1,800 gallons of water</span>, while
              producing 1 pound of tofu takes only{' '}
              <span className="font-bold">302 gallons.</span>
            </p>
            <p className="mt-5 font-bold text-xl">
              🌳 Reducing Land Use & Deforestation!
            </p>
            <p className="ml-3">
              • Animal agriculture uses{' '}
              <span className="font-bold">77% of global farmland</span> but
              provides only
              <span className="font-bold">
                {' '}
                {`18% of the world's calories.`}
              </span>
            </p>
            <p className="ml-3">
              • Every day, a vegan saves{' '}
              <span className="font-bold">30 sq ft of forest</span> from
              destruction for livestock grazing and feed crops.
            </p>
            <p className="mt-5 font-bold text-xl">
              🌍 Reducing Carbon Footprint!
            </p>
            <p className="ml-3">
              • A vegan diet reduces carbon emissions by{' '}
              <span className="font-bold">
                50% compared to a meat-heavy diet.
              </span>
            </p>
            <p className="ml-3">
              • If the world went vegan, it could cut food-related greenhouse
              gas emissions by <span className="font-bold">up to 70%.</span>
            </p>
            <p className="mt-5 font-bold text-xl">❤️ Health Benefits!</p>
            <p className="ml-3">
              • Studies show that a vegan diet can lower the risk of{' '}
              <span className="font-bold">heart disease by 32%</span> and reduce
              the risk of certain cancers.
            </p>
            <p className="ml-3">
              • Vegans tend to have{' '}
              <span className="font-bold">
                lower cholesterol and blood pressure
              </span>
              compared to meat-eaters.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
