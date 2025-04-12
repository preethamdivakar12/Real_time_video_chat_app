import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the change here
import App from './App';

import { ContextProvider } from './SocketContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ContextProvider>
      <App />
    </ContextProvider>
);