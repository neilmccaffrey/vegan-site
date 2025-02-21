import Header from '../components/Header';
import RestaurantsList from '../components/RestaurantsList';

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-20 ">
        <RestaurantsList />
      </div>
    </>
  );
};

export default Home;
