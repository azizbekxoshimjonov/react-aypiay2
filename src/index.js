import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContexProvider from './Context/Context';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <ContexProvider>
  <BrowserRouter>
  <App /> 
  </BrowserRouter>
 
 </ContexProvider>
 
 
  
   
   
   
   
    

  
   
  </React.StrictMode>
);


