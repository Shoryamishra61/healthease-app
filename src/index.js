import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserState from './context/UserState'; // We still need this for user login state

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserState>
      <App />
    </UserState>
  </React.StrictMode>
);