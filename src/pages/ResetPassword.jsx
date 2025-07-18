import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { RESET_PASSWORD } from '../api/apiUrl';
import { axiosClient } from '../utils/axiosClient';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
// Get query param helper
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const query = useQuery();
  const token = query.get('token');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage({ type: 'error', text: 'Token is missing from the URL.' });
      return;
    }
    if (!password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    setLoading(true);
    try {
      await axiosClient.post(RESET_PASSWORD, {
        token,
        password,
      });
      showToast('success', 'Password has been reset successfully!');
      navigate('/auth/sign-in'); // redirect after login
    } catch (error) {
      showToast('error', error.response.data.message || 'something went wrong !');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    {/* Logo SVG */}
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset Password 🔐</h1>

              {message && (
                <div className={`mb-4 text-sm px-4 py-2 rounded ${message.type === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password <span className="text-rose-500">*</span></label>
                    <input
                      type="password"
                      className="form-input w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password <span className="text-rose-500">*</span></label>
                    <input
                      type="password"
                      className="form-input w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className={`btn bg-indigo-500 hover:bg-indigo-600 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} alt="Authentication" />
          <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} alt="Decoration" />
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
