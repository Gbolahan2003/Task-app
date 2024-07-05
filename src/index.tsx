import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { logger } from './utils';
import { Provider } from "react-redux";
import { store, persistor } from "./redux-store";
import { PersistGate } from 'redux-persist/integration/react';
import GlobalProvider from './globalProvider';
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  
  <BrowserRouter>
   <GlobalProvider>
  <App/>
 </GlobalProvider>
  </BrowserRouter>
);

reportWebVitals(logger);
