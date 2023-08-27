import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/app/App';
import './index.css';
import { UserProvider } from './providers/useIinfoProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
