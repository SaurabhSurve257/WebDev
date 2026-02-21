import React from 'react';          // ← must import React (even if you don't use it directly)
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
// import { store } from './app/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>              // optional but recommended
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);