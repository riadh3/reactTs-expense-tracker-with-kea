import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/AppScene'
import { initKea } from './initKea'
import CssBaseline from '@material-ui/core/CssBaseline'

initKea()

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <>
      <CssBaseline />
      <App />
    </>
  )
} else {
  console.error(`Could not find element matching "#root"`)
}
