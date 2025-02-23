import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RestaurantsList = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // used to prevent show more button from calling the same fetch multiple times on click
  const handleFetch = async () => {
    if (loading) return;
    setLoading(true);
    await fetchRestaurants(nextPageToken);
    setLoading(false);
  };

  useEffect(() => {
    // Get current location using geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location', error);
      }
    );
  }, []);

  const fetchRestaurants = async (token = null) => {
    try {
      //token empty on first call
      const params = { latitude, longitude, nextPageToken: token || '' };
      const response = await axios.get(
        'http://localhost:5001/api/restaurants',
        { params }
      );
      //set restaurants to prev + new response. (prevRestaurants will be empty on first call)
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        ...response.data.restaurants,
      ]);
      // set token to nextpagetoken
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchRestaurants();
    }
  }, [latitude, longitude]);

  return (
    <>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id}>
            <div className="flex mt-2">
              {/* if photo exists */}
              {restaurant.photos?.[0] ? (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                  alt="Restaurant"
                  className="w-20 md:w-32 aspect-video object-cover rounded mx-2"
                />
              ) : (
                <img
                  src={
                    '/src/assets/images/vegan-friendly-leaves-label-green-color_1017-25452.png'
                  }
                  className="w-20 md:w-32 aspect-video object-cover rounded mx-2"
                />
              )}
              <div className="flex flex-col border-b w-96 self-end text-xs md:text-sm pb-2">
                <div className="flex gap-x-5">
                  <span>{restaurant.name}</span>
                  <span className="flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      size="xs"
                      color={'rgba(255, 221, 51, 0.8)'}
                    />
                    {restaurant.rating}({restaurant.user_ratings_total})
                  </span>
                </div>
                <div className="flex gap-x-5">
                  {restaurant.opening_hours.open_now ? (
                    <span className="text-green-300">Open</span>
                  ) : (
                    <span className="text-red-300">Closed</span>
                  )}
                  {/* open address in google maps */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.vicinity)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline cursor-pointer"
                  >
                    {restaurant.vicinity}
                  </a>
                </div>
                <div className="flex gap-x-8">
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-500"
                  >
                    Visit Website
                  </a>
                  {restaurant.formatted_phone_number && (
                    <div>
                      <span>Call:</span>
                      <a
                        href={`tel:${restaurant.formatted_phone_number}`}
                        className="text-blue-500 underline"
                      >
                        {restaurant.formatted_phone_number}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* width 128 to account for photo (32) + info (96) */}
      <div className="w-72 md:w-128 flex justify-end underline">
        {nextPageToken && (
          <button
            className="cursor-pointer"
            onClick={handleFetch}
            disabled={loading} //disable button while fetching
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        )}
      </div>
    </>
  );
};

export default RestaurantsList;
