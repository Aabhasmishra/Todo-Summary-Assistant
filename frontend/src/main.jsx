import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const style = document.createElement('style');
style.textContent = `
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    background: linear-gradient(135deg, #153677, #4e085f);
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
  }
`;
document.head.append(style);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
