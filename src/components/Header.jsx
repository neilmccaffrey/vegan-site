import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  return (
    <header className="w-full fixed top-0 p-2 md:p-4">
      <div className="flex justify-between items-center w-full md:space-x-96">
        <ThemeToggle />
        <div className="flex gap-x-4">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          {!isAuthenticated ? <Link to="/login">Login</Link> : user.username}
        </div>
      </div>
    </header>
  );
};

export default Header;
