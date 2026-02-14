import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import Router to switch between survery and Admin Dashboard
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap the App in BrowserRouter to enable routing between Survey and Dashboard */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)