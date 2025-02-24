import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full fixed top-0 p-2 md:p-4">
      <div className="flex justify-between items-center w-full md:space-x-96">
        <ThemeToggle />
        <Link to="/recipes">Recipes</Link>
      </div>
    </header>
  );
};

export default Header;
