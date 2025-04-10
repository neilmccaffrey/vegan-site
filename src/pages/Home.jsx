import { useState } from 'react';
import Header from '../components/Header';
import RestaurantsList from '../components/RestaurantsList';
import { Link } from 'react-router-dom';

const Home = () => {
  const [displayRestaurants, setDisplayRestaurants] = useState(false);
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalDays = months * 30 + years * 365;
    setDays(totalDays);
    setShowStats(true);
  };

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
      <div className="flex flex-col md:flex-row mt-20 mb-20">
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
        <div className="flex w-full justify-center md:ml-2 mr-2">
          <div className="flex flex-col">
            <p className="ml-2 mb-10 text-xs md:text-base">
              “When the suffering of another creature causes you to feel pain,
              do not submit to the initial desire to flee from the suffering
              one, but on the contrary, come closer, as close as you can, and
              try to help.” – Leo Tolstoy
            </p>
            <div className="border border-gray-200 shadow-lg rounded-2xl mb-10 p-6">
              <div className="flex flex-col items-center p-2">
                <p className="text-sm md:text-base">
                  Join the discussion in our Vegan Forums! Whether you’re just
                  starting out, curious about veganism, or looking to connect
                  with like-minded people, there’s a place for you. Ask
                  questions, share experiences, and explore a kinder way of
                  living!
                </p>
                <Link
                  to="/forums"
                  className="cursor-pointer rounded primary shadow-md p-2 w-75 text-center mt-2"
                >
                  Forums
                </Link>
              </div>
              <div className="flex flex-col items-center p-2">
                <p className="text-sm md:text-base">
                  Explore our Recipes Section! Discover delicious vegan dishes
                  or share your own creations with the community. Submit your
                  favorite recipes and inspire others to eat plant-based!
                </p>
                <Link
                  to="/vegan-recipes"
                  className="cursor-pointer rounded primary shadow-md p-2 w-75 text-center mt-2"
                >
                  Recipes
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 shadow-lg rounded-2xl p-6">
              <p className="text-4xl md:text-6xl p-2 text-center font-semibold bg-gradient-to-r from-green-600 to-lime-400 text-transparent bg-clip-text">
                🌱 Being Vegan 🌱
              </p>
              <strong className="block mt-10 text-xl">
                🐷 Saving Animal Lives!
              </strong>
              <p className="ml-3">
                • The average vegan saves{' '}
                <strong>30 animal lives per month</strong> (~365 per year).
              </p>
              <p className="ml-3">
                • This includes animals like chickens, pigs, cows, and
                fish—along with many others—that would otherwise be killed for
                food.
              </p>
              <strong className="block mt-5 text-xl">
                💧 Water Conservation!
              </strong>
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
              <strong className="block mt-5 text-xl">
                🌳 Reducing Land Use & Deforestation!
              </strong>
              <p className="ml-3">
                • Animal agriculture uses{' '}
                <strong>77% of global farmland</strong> but provides only
                <strong> {`18% of the world's calories.`}</strong>
              </p>
              <p className="ml-3">
                • Every day, a vegan saves <strong>30 sq ft of forest</strong>{' '}
                from destruction for livestock grazing and feed crops.
              </p>
              <strong className="block mt-5 text-xl">
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
              <strong className="block mt-5 text-xl">
                ❤️ Health Benefits!
              </strong>
              <p className="ml-3">
                • Studies show that a vegan diet can lower the risk of{' '}
                <strong>heart disease by 32%</strong> and reduce the risk of
                certain cancers.
              </p>
              <p className="ml-3">
                • Vegans tend to have{' '}
                <strong>lower cholesterol and blood pressure </strong>
                compared to meat-eaters.
              </p>
            </div>
            <div className="flex flex-col md:flex-row mt-10 max-w-full">
              <form
                onSubmit={handleSubmit}
                className="border border-gray-200 p-4 min-w-100 md:shadow-lg rounded"
              >
                <p className="text-sm">
                  See your impact! Enter how long you have been vegan.
                </p>
                <div className="flex gap-x-5 justify-center">
                  <div>
                    <label>Years: </label>
                    <input
                      value={years}
                      onChange={(e) =>
                        setYears(e.target.value.replace(/[^0-9]/g, ''))
                      }
                      placeholder="0"
                      type="text"
                      inputMode="numeric"
                      className="border border-gray-200 placeholder-gray-200 rounded p-2 mt-1 w-25"
                    />
                  </div>
                  <div>
                    <label>Months: </label>
                    <input
                      value={months}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, '');
                        if (value > 11) value = '11'; // Limit max to 11
                        setMonths(value);
                      }}
                      placeholder="0"
                      type="text"
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
              {showStats && (
                <div className="w-full border border-gray-200 p-2 border-t-0 md:border-t md:ml-2 md:mt-0 shadow-lg rounded">
                  <div className="flex flex-col text-center">
                    <strong>YOU HAVE SAVED:</strong>
                    <div className="flex ml-2 mt-2 items-center justify-between">
                      <strong className="text-xs">Animal lives:</strong>
                      <strong className="bg-green-400 text-white ml-5 w-50 md:w-75">
                        ~{days.toLocaleString()}
                      </strong>
                    </div>
                    <div className="flex ml-2 mt-2 items-center justify-between">
                      <strong className="text-xs">Gallons of water:</strong>
                      <strong className="bg-green-400 text-white ml-5 w-50 md:w-75">
                        ~{(days * 600).toLocaleString()}
                      </strong>
                    </div>
                    <div className="flex ml-2 mt-2 items-center justify-between">
                      <strong className="text-xs">SQ FT of forest:</strong>
                      <strong className="bg-green-400 text-white ml-5 w-50 md:w-75">
                        ~{(days * 30).toLocaleString()}
                      </strong>
                    </div>
                    <div className="flex ml-2 mt-2 items-center justify-between">
                      <strong className="text-xs">LBS of CO2:</strong>
                      <strong className="bg-green-400 text-white ml-5 w-50 md:w-75">
                        ~{(days * 20).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
