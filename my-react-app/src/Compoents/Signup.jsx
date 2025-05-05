import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ScreenshotImage from "../assets/Screenshot 2025-04-19 180319.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#e0f7fa' }}>
      <div className="w-full max-w-4xl space-y-8 m-6">
        <img
          src={ScreenshotImage}
          alt="Child safety in car"
          className="mx-auto w-full h-auto m-6"
          style={{ borderRadius: '10px' }}
        />
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight" style={{ color: '#006064' }}>
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: '#4f4f4f' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-medium" style={{ color: '#7c4dff' }}>
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="relative block w-full py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-cyan-400 sm:text-sm"
                style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #b2ebf2', marginBottom: 8 }}
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="relative block w-full py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-cyan-400 sm:text-sm"
                style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #b2ebf2', marginBottom: 8 }}
                placeholder="Email address"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="relative block w-full py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-cyan-400 sm:text-sm"
                style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #b2ebf2', marginBottom: 8 }}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                style={{ color: '#26c6da' }}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="relative block w-full py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-cyan-400 sm:text-sm"
                style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #b2ebf2', marginBottom: 8 }}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                style={{ color: '#26c6da' }}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center py-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-cyan-200"
              style={{ backgroundColor: isLoading ? '#b2ebf2' : '#26c6da', borderRadius: 8 }}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 