import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full fixed top-0 p-2 md:p-6">
      <ThemeToggle />
    </header>
  );
};

export default Header;
