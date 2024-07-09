import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId="258675188897-gh2utb5ngd1q8vb68obneq44vvcd186c.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </>
)
