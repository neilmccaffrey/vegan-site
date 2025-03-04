import { createContext, useState, useEffect } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '../cognito';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: null, sub: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token')
  );

  // Function to set the user from the decoded token
  const setUserFromToken = (idToken) => {
    const decodedToken = jwtDecode(idToken);
    setUser({
      username: decodedToken['cognito:username'],
      sub: decodedToken.sub,
    });
    setIsAuthenticated(true);
  };

  // Refresh session and refresh token
  const refreshSession = () => {
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (!storedRefreshToken) {
      console.error('No refresh token available');
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: userPool,
    });

    cognitoUser.refreshSession(storedRefreshToken, (err, session) => {
      if (err) {
        console.error('Error refreshing session:', err);
        return;
      }

      const newRefreshToken = session.getRefreshToken().getToken(); // Get the new refresh token

      // Update user context with new token
      setUser({
        username: session.getIdToken().payload['cognito:username'],
        sub: session.getIdToken().payload.sub,
      });
      setIsAuthenticated(true);

      // Store the new token in localStorage
      localStorage.setItem('refresh_token', newRefreshToken);
      setRefreshToken(newRefreshToken); // Update state with new refresh token
    });
  };

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (storedRefreshToken) {
      const tokenExpiration = jwtDecode(storedRefreshToken).exp * 1000; // Expiration time in milliseconds
      const currentTime = Date.now();

      const timeUntilExpiration = tokenExpiration - currentTime + 1000; // Add 1 second to trigger refresh immediately after expiration

      if (timeUntilExpiration > 0) {
        const timeout = setTimeout(() => {
          refreshSession(); // Refresh session just after the token expires
        }, timeUntilExpiration);

        // Cleanup timeout on unmount
        return () => clearTimeout(timeout);
      } else {
        // If the refresh token is already expired, immediately refresh
        refreshSession();
      }
    }
  }, [refreshToken]); // Re-run if refreshToken state changes

  // Log the user out
  const logout = () => {
    setUser({ username: null, sub: null });
    setIsAuthenticated(false);
    localStorage.removeItem('refresh_token');
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, setUserFromToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are passed as a valid node
};

export { UserContext, UserProvider };
