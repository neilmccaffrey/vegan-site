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
            <strong className="mt-10 text-xl">🐷 Saving Animal Lives!</strong>
            <p className="ml-3">
              • The average vegan saves{' '}
              <strong>30 animal lives per month</strong> (~365 per year).
            </p>
            <p className="ml-3">
              • This includes farm animals like chickens, pigs, cows, and fish
              that would otherwise be killed for food.
            </p>
            <strong className="mt-5 text-xl">💧 Water Conservation!</strong>
            <p className="ml-3">
              • A vegan diet saves{' '}
              <strong>219,000 gallons of water per year</strong> (~600 gallons
              per day).
            </p>
            <p className="ml-3">
              • Producing 1 pound of beef requires{' '}
              <strong>1,800 gallons of water</strong>, while producing 1 pound
              of tofu takes only <strong>302 gallons.</strong>
            </p>
            <strong className="mt-5 text-xl">
              🌳 Reducing Land Use & Deforestation!
            </strong>
            <p className="ml-3">
              • Animal agriculture uses <strong>77% of global farmland</strong>{' '}
              but provides only
              <strong> {`18% of the world's calories.`}</strong>
            </p>
            <p className="ml-3">
              • Every day, a vegan saves <strong>30 sq ft of forest</strong>{' '}
              from destruction for livestock grazing and feed crops.
            </p>
            <strong className="mt-5 text-xl">
              🌍 Reducing Carbon Footprint!
            </strong>
            <p className="ml-3">
              • A vegan diet reduces carbon emissions by{' '}
              <strong>50% compared to a meat-heavy diet.</strong>
            </p>
            <p className="ml-3">
              • If the world went vegan, it could cut food-related greenhouse
              gas emissions by <strong>up to 70%.</strong>
            </p>
            <strong className="mt-5 text-xl">❤️ Health Benefits!</strong>
            <p className="ml-3">
              • Studies show that a vegan diet can lower the risk of{' '}
              <strong>heart disease by 32%</strong> and reduce the risk of
              certain cancers.
            </p>
            <p className="ml-3">
              • Vegans tend to have{' '}
              <strong>lower cholesterol and blood pressure</strong>
              compared to meat-eaters.
            </p>
            <div className="flex flex-col mt-10 max-w-100">
              <form className="border border-gray-200 p-2">
                <p className="text-sm">
                  See your impact! Enter how long you have been vegan.
                </p>
                <div className="flex gap-x-5 justify-center">
                  <div>
                    <label>Years: </label>
                    <input
                      placeholder="0"
                      type="number"
                      inputMode="numeric"
                      className="border border-gray-200 placeholder-gray-200 rounded p-2 mt-1 w-25"
                    />
                  </div>
                  <div>
                    <label>Months: </label>
                    <input
                      placeholder="0"
                      type="number"
                      inputMode="numeric"
                      className="border border-gray-200 placeholder-gray-200 rounded p-2 mt-1 w-25"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    className="p-2 bg-blue-400 text-white rounded cursor-pointer w-75"
                    disabled={false}
                  >
                    Calculate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
