import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark'); //default to dark mode

  //set dark/light mode remember user preference
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === '') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', '');
      setTheme('');
    }
  };

  return (
    //theme toggle
    <div className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faSun} className="text-primary text-xl" />
      <label htmlFor="theme-toggle" className="relative">
        <input
          id="theme-toggle"
          type="checkbox"
          className="sr-only"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <div className="block w-11 h-6 bg-gray-100 rounded-full"></div>
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transition-transform transform moveButton translate-x-0`}
        ></div>
        {/* accessibility */}
        <span className="sr-only">Toggle theme</span>
      </label>
      <FontAwesomeIcon icon={faMoon} className="text-primary text-xl" />
    </div>
  );
};

export default ThemeToggle;
