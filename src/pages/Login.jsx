import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from '../cognito';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: login,
      Password: password,
    });

    const user = new CognitoUser({
      Username: login,
      Pool: userPool,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const idToken = session.getIdToken().getJwtToken(); // ID Token
        const decoded = jwtDecode(idToken);

        console.log('User ID (sub):', decoded.sub);
        console.log('Username:', decoded['cognito:username']);

        // Store token/username in context
      },
      onFailure: (err) => {
        console.error('Login failed:', err.message);
      },
    });
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
            placeholder="Username/Email"
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
          <Link
            to="/signup"
            className="text-xs text-blue-500 mt-5 cursor-pointer underline"
          >
            {`Don't have an account yet? Click here to signup!`}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
