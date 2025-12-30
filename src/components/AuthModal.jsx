import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/signup';

    try {
      const { data } = await axios.post(endpoint, formData);
      
      if (isLogin) {
        // Save token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onClose();
        navigate('/chat'); // Redirect to chat
      } else {
        alert("Verification email sent! Please check your inbox.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-[440px] bg-[#101622] border border-slate-700 rounded-3xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          {error && <p className="text-red-500 text-xs bg-red-500/10 py-2 rounded-lg mb-2">{error}</p>}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#111722] border border-slate-700 rounded-xl p-3 text-white focus:border-primary outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#111722] border border-slate-700 rounded-xl p-3 text-white focus:border-primary outline-none"
              placeholder="name@railbuddy.ai"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <input 
              required
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-[#111722] border border-slate-700 rounded-xl p-3 text-white focus:border-primary outline-none"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-primary py-3 rounded-xl font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-8">
          {isLogin ? "New here?" : "Already have an account?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold hover:underline">
            {isLogin ? 'Create an account' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}