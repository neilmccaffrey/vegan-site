import { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 md:p-16 border shadow-lg rounded flex flex-col items-center">
        <span className="text-2xl font-bold mb-4">Login</span>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="email"
            placeholder="Email"
            className="p-3 w-64 md:w-96 rounded shadow-lg mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            className="p-3 w-64 md:w-96 rounded shadow-lg mb-8"
          />
          <button
            type="submit"
            className="rounded p-2 primary w-40 cursor-pointer hover:opacity-50 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
