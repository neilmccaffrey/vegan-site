import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Menu, X } from 'lucide-react';

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
      <div className="flex justify-between items-center w-full">
        <ThemeToggle />

        <nav className="hidden md:flex gap-x-4">
          <Link to="/" className="hover:scale-125">
            Home
          </Link>
          <Link to="/recipes" className="hover:scale-125">
            Recipes
          </Link>
          <Link to="/forums" className="hover:scale-125">
            Forums
          </Link>
          <Link to="allthingsvegan" className="hover:scale-125">
            Vegan Things
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
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden block p-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute top-14 left-0 w-full bg-white shadow-lg p-4 flex flex-col items-start md:hidden modal"
          >
            <Link
              to="/"
              className="py-2 w-full text-left underline"
              onClick={() => setShowMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="py-2 w-full text-left underline"
              onClick={() => setShowMenu(false)}
            >
              Recipes
            </Link>
            <Link
              to="/forums"
              className="py-2 w-full text-left underline"
              onClick={() => setShowMenu(false)}
            >
              Forums
            </Link>
            <Link
              to="allthingsvegan"
              className="py-2 w-full text-left underline"
              onClick={() => setShowMenu(false)}
            >
              Vegan Things
            </Link>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="py-2 w-full text-left underline"
                onClick={() => setShowMenu(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <button className="py-2 w-full text-left">
                  {user.username}
                </button>
                <button
                  onClick={() => {
                    manualLogout();
                    setShowMenu(false);
                  }}
                  className="py-2 w-full text-left hover:bg-gray-200 underline"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
