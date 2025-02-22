import { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantsList = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

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
      const params = { latitude, longitude, nextPageToken: token || '' };
      const response = await axios.get(
        'http://localhost:5001/api/restaurants',
        { params }
      );
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        ...response.data.restaurants,
      ]);
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
    <div>
      <h2>Nearby Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id}>
            {restaurant.name} {restaurant.rating} {restaurant.price_level}{' '}
            {restaurant.vicinity} {restaurant.website}{' '}
            {restaurant.formatted_phone_number}{' '}
          </li>
        ))}
      </ul>
      {nextPageToken && (
        <button onClick={() => fetchRestaurants(nextPageToken)}>
          Show More
        </button>
      )}
    </div>
  );
};

export default RestaurantsList;
