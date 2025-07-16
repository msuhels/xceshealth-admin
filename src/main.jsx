import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

import axios from "axios";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ToastProvider } from './contexts/ToastContext';
axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ToastProvider>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
        </ToastProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
