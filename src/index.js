import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store/store';
import { BrowserRouter } from 'react-router-dom';


const store = new Store();

export const Context = createContext({
  store,
});

ReactDOM.render(
  <BrowserRouter>
    <Context.Provider value={{ store }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Context.Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

