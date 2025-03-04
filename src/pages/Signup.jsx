import { useState } from 'react';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { userPool } from '../cognito';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create Cognito user attributes for email and username
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email', // Email is optional for sign-in
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'preferred_username', // Use 'preferred_username' for the username attribute
        Value: username,
      }),
    ];

    // Sign-up with Cognito User Pool
    userPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
      } else {
        console.log('Successfully signed up!', data);
      }
    });

    setVerifying(true);
  };

  const handleVerification = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username, // Use username from context
      Pool: userPool,
    });

    user.confirmRegistration(verificationCode, true, (err) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      // Navigate to login page upon successful verification
      navigate('/login');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 md:p-16 border shadow-lg rounded flex flex-col items-center">
        {!verifying ? (
          <>
            <span className="text-2xl font-bold mb-4">Register</span>
            <span className="text-xs">
              Email is ONLY used for password recovery/login.
            </span>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="Email"
                className="p-3 w-64 md:w-96 rounded shadow-lg mb-2"
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="rounded p-2 primary w-40 cursor-pointer hover:opacity-50 shadow-lg"
              >
                Signup
              </button>
              <Link
                to="/login"
                className="text-xs text-blue-500 mt-5 cursor-pointer underline"
              >
                {`Already have an account? Click here to login!`}
              </Link>
            </form>
          </>
        ) : (
          <>
            <span className="text-2xl font-bold mb-4">Verify Email</span>
            <span className="text-xs">
              Enter the verification code sent to your email address
            </span>
            <form
              onSubmit={handleVerification}
              className="w-full flex flex-col items-center"
            >
              <input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Verification Code"
                className="p-3 w-64 md:w-96 rounded shadow-lg mb-2"
              />
              <button
                type="submit"
                className="rounded p-2 primary w-40 cursor-pointer hover:opacity-50 shadow-lg"
              >
                Verify
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
