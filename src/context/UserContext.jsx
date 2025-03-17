import { createContext, useState, useEffect } from 'react';
import { CognitoUser, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { userPool } from '../cognito';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: null, sub: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token')
  );

  const navigate = useNavigate();
  // Function to set the user from the decoded token
  const setUserFromToken = (idToken) => {
    const decodedToken = jwtDecode(idToken);
    setUser({
      username: decodedToken['cognito:username'],
      sub: decodedToken.sub,
    });
    setIsAuthenticated(true);
  };

  // on page refresh/open check for active session
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          console.error('Session invalid or error:', err);
          logout();
          return;
        }

        // set user and isAuthenticated
        setIsAuthenticated(true);
        setUserFromToken(session.getIdToken().getJwtToken());
      });
    }
  }, []);

  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(
        () => {
          refreshSession(); // Refresh session periodically
        },
        55 * 60 * 1000 // Refresh every 55 minutes
      );

      // Check for expiration immediately when the app loads
      refreshSession();

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [refreshToken, isAuthenticated]);

  const refreshSession = () => {
    if (!isAuthenticated || !refreshToken || !user.username) {
      // If the user is not authenticated or doesn't have a refresh token or username, do nothing
      return;
    }

    // get a new session so user can continue to be active
    const cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: userPool,
    });

    const refreshTokenObj = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    // call refresh session from cognito with refresh token, if it is expired log user out
    cognitoUser.refreshSession(refreshTokenObj, (err, session) => {
      if (err) {
        console.error('Error refreshing session:', err);
        if (err.message.includes('expired')) {
          logout(); // Handle expired refresh token
        }
        return;
      }

      const newRefreshToken = session.getRefreshToken().getToken(); // Should remain the same unless token is expired

      setUser({
        username: session.getIdToken().payload['cognito:username'],
        sub: session.getIdToken().payload.sub,
      });

      // No need to update localStorage for the refresh token unless Cognito issues a new one
      if (newRefreshToken !== refreshToken) {
        localStorage.setItem('refresh_token', newRefreshToken);
        setRefreshToken(newRefreshToken);
      }
    });
  };

  // Log the user out
  const logout = () => {
    localStorage.removeItem('refresh_token'); // Clear stored refresh token first
    setRefreshToken(null); // Ensure state update

    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut(); // Clear Cognito session
    }

    setUser({ username: null, sub: null });
    setIsAuthenticated(false);

    navigate('/login', { state: { expiredSession: true } }); // Redirect after logout
  };

  const manualLogout = () => {
    localStorage.removeItem('refresh_token');
    setRefreshToken(null); // Ensure state update

    const user = userPool.getCurrentUser(); // Get the current Cognito user
    if (user) {
      user.signOut(); // Clear the session
    }
    setUser({ username: null, sub: null });
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, setUserFromToken, logout, manualLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are passed as a valid node
};

export { UserContext, UserProvider };
