import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/reset.css';

const elementoRaiz = document.getElementById('root');

if (!elementoRaiz) {
  throw new Error('No se encontró el elemento raíz para montar el panel.');
}

createRoot(elementoRaiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
