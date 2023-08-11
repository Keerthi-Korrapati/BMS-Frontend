import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
//import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

/*ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);*/

serviceWorker.unregister();
