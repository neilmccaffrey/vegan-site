import { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantsList = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

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

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/restaurants',
          {
            params: { latitude, longitude },
          }
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

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
            {restaurant.name}
            {restaurant.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsList;
