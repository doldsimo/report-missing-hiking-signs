import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertProvider } from './context/AlertContext';
import { LocationProvider } from './context/LocationsContext';


ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Call the element loader after the platform has been bootstrapped
// Neede for Native support features
defineCustomElements(window);
// For usage of .env Files
require('dotenv').config()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
