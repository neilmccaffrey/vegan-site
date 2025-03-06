import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, isAuthenticated, manualLogout } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 p-2 md:p-4">
      <div className="flex justify-between items-center w-full md:space-x-96">
        <ThemeToggle />
        <div className="flex gap-x-4">
          <Link to="/" className="hover:scale-125">
            Home
          </Link>
          <Link to="/recipes" className="hover:scale-125">
            Recipes
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="hover:scale-125">
              Login
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="hover:underline"
              >
                {user.username}
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 shadow-lg bg-gray-300 rounded p-2">
                  <button
                    onClick={manualLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 whitespace-nowrap hover:underline cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
