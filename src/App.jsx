import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoutes from './utils/PrivateRoutes';
import Room from './pages/room';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './utils/AuthContext';
import Appwrite from './pages/Appwrite';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
            <Route path="/appwrite" element={<Appwrite />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
