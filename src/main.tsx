import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './components';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <GlobalStyles>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </GlobalStyles>
  </React.StrictMode>,
)
