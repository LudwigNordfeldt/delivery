import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client';
import App from './App';
import orderReducer from './reducer';
import RestReducer from './chosenRestaurantReducer'

const store = configureStore({
  reducer: {
    order: orderReducer,
    restaurant: RestReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);