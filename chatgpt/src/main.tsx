import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FrappeProvider } from 'frappe-react-sdk';
import { ChatIdContext, get_chat_id_from_url } from './chat_id_context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChatIdContext.Provider value={ get_chat_id_from_url() }>
    <React.StrictMode>
      <FrappeProvider>
        {/* <FrappeProvider url="https://erp.technoculture.io"> */ }
        <App />
      </FrappeProvider>
    </React.StrictMode >
  </ChatIdContext.Provider >,
);
