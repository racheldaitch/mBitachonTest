import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';


import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import  productReducer  from './Redux/productSlice';


// interceptors.create();
const productStore = configureStore({
  reducer:{
    product:productReducer
  }
})
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<Provider store={productStore}>
  <BrowserRouter>
  <Layout />
  </BrowserRouter>
  </Provider>
);
// document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
