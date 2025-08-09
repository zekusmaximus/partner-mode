import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Apply motion preference from localStorage on load
if (localStorage.getItem('reduceMotion') === 'true') {
  document.body.classList.add('reduce-motion');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
