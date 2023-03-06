import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FrappeProvider } from 'frappe-react-sdk';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FrappeProvider>
      <App />
    </FrappeProvider>
  </React.StrictMode>,
);
