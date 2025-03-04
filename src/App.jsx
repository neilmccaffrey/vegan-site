import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
