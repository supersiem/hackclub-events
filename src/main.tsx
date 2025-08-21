import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css.css'
import List from './list'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <br />
    <br />
    <br />
    <List />
  </StrictMode>
)
