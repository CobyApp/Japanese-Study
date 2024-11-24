import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VocabStudy from './components/VocabStudy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/study/:level/:section" element={<VocabStudy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
