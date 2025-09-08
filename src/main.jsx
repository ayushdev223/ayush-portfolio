import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// Preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(preloader);

setTimeout(() => {
  preloader.classList.add('hidden');
}, 2000);

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
