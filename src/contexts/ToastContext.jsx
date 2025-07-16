import  { createContext, useContext, useState, useCallback ,useEffect } from 'react';
import Toast2 from '../components/Toast2';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
  const [type, setType] = useState('success');
  const [message, setMessage] = useState('');

  const showToast = useCallback((type, message) => {
    setType(type);
    setMessage(message);
    setOpen(true);
  }, []);
  
  // ✅ Auto-close toast after 3 seconds 
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);
     
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast2
        open={open}
        setOpen={setOpen}
        type={type}
        className="fixed top-4 right-4 z-50"
      >
        {message}
      </Toast2>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
