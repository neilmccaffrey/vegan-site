import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { userPool } from '../cognito';
import { UserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);
  const { setUserFromToken } = useContext(UserContext);
  const location = useLocation();
  const expiredSession = location.state?.expiredSession;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsDisabled(true);

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
        const idToken = session.getIdToken().getJwtToken(); // Get the ID token
        setUserFromToken(idToken); // Store the user data in context
        const refreshToken = session.getRefreshToken().getToken(); // Get the refresh token
        localStorage.setItem('refresh_token', refreshToken); // Save in localStorage
        navigate('/');
      },
      onFailure: (err) => {
        setError(err.message);
        setIsDisabled(false);
      },
    });
  };

  const handleChange = () => {
    // Clear error on input change
    if (error) setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 md:p-16 border shadow-lg rounded flex flex-col items-center">
        <span className="text-2xl font-bold mb-4">Login</span>
        {expiredSession && (
          <p className="mt-2">Session has expired, please log in again.</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              handleChange();
            }}
            placeholder="Username/Email"
            className="p-3 w-64 md:w-96 rounded shadow-lg mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange();
            }}
            autoComplete="current-password"
            placeholder="Password"
            className="p-3 w-64 md:w-96 rounded shadow-lg mb-8"
          />
          <button
            type="submit"
            className={`rounded p-2 primary w-40 cursor-pointer hover:opacity-50 shadow-lg ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDisabled}
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
