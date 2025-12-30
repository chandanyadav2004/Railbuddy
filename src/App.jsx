import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import axios from 'axios';
import VerifyPage from "./pages/VerifyPage";
import AuthModal from "./components/AuthModal";

// 1. Set the Base URL
axios.defaults.baseURL = 'http://localhost:5000';

// 2. ADD THE INTERCEPTOR HERE 
// This "intercepts" every outgoing request to add the security token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
         <Route path="/verify/:token" element={<VerifyPage />} />\
         <Route path="/login" element={<AuthModal />} />
      </Routes>
    </BrowserRouter>
  );
}