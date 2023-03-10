import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/App';

import '../src/components/styles/index.scss';
import "../src/components/styles/fonts.scss";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


