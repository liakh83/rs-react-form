import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './redux/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('rootElement not found');
}

createRoot(rootElement).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
