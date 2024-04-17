import React from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="align-center bg-green-500 bg-opacity-50 text-white p-4 rounded-md">
      {message}
    </div>
  );
};

export default Toast;
