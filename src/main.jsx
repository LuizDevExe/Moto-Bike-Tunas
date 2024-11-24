import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/Routes';
import './index.css'

import Admin from './pages/Admin/Admin.jsx'
import WhatsappButton from './components/WhatsappButton/WhatsappButton.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
