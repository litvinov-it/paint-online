import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './components/app/app';
import { Login } from './components/login/login';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<App />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}