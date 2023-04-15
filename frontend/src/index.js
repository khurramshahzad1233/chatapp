import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic";
import {Provider} from "react-redux"
import store from "./store"
import Chatprovider from './context/Chatprovider';

const options={
  timeout:800,
  positions:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}{...options}>
    <React.StrictMode>
      <Chatprovider>
    <App />
    </Chatprovider>
  </React.StrictMode>
  </AlertProvider>
  </Provider>
  
  
);


