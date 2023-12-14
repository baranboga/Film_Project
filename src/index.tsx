import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import counterReducer from './redux/slice';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer:{
    counter:counterReducer,
  }
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();
